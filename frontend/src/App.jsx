import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "http://localhost:1999/api/tasks";

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  // Mark as done
  const markDone = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/done`, { method: "PUT" });
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-50"> 
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-10 flex gap-12">
        
        
        <div className="w-1/3 border-r pr-10"> /* Adjusted layout for clean separation */
           <h2 className="text-2xl font-bold mb-6 text-indigo-600">
           Add a Task</h2>
           
            <form onSubmit={addTask} className="flex flex-col space-y-5"> /* Increased space-y */
              
               <div>
                <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
                  
                 </label>
                 <input
                  type="text"
                  id="task-title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
                 />
               </div>
               
               <div>
                <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">
                  
                </label>
                 <textarea
                  id="task-description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
                 />
               </div>
               
                <button
                 type="submit"
                 className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition duration-200">
                  Add Task
                </button>
            </form>
        </div>



        {/* Right side: Task list */}
        <div className="flex-1 pl-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Recent Tasks (Top 5)</h2>
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No tasks found</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className=" border-2 border-l-4 border-gray-300 rounded-lg p-4 flex justify-between items-start shadow-sm hover:shadow-md transition duration-150 bg-gray-300"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{task.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                  </div>
                  <button
                    onClick={() => markDone(task._id)}
                    className="flex-shrink-0 bg-gray-400 hover:bg-gray-200 text-black px-4 py-2 rounded-full text-sm font-medium transition shadow"
                  >
                    Done
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;