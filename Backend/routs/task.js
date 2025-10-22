const express = require("express");
const Task = require("../models/task");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ completed: false })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.put("/:id/done", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { completed: true });
    res.json({ message: "Task marked as completed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

module.exports = router;
