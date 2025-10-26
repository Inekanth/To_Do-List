const express = require("express");
const router = express.Router();
const pool = require("../db"); // only if you're using MySQL

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.json({ id: result.insertId, title, description, completed: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get the 5 most recent incomplete tasks
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE completed = FALSE ORDER BY created_at DESC LIMIT 5"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Mark task as done
router.put("/:id/done", async (req, res) => {
  try {
    await pool.query("UPDATE tasks SET completed = TRUE WHERE id = ?", [req.params.id]);
    res.json({ message: "Task marked as completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

module.exports = router;
