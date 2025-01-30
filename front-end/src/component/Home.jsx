import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";
import "../componentsStyles/Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await axios.post("http://localhost:8000/tasks", {
        title,
        description,
        completed,
      });
      setTasks([...tasks, response.data]);
      setTitle("");
      setDescription("");
      setCompleted(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="hero">
      <div className="form-container">
        <h2>Create a New Task</h2>
        <div className="form-fields">
          <input
            type="text"
            value={title}
            placeholder="Task Title"
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            value={description}
            placeholder="Task Description"
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
          <button id="submit" onClick={addTask}>Add Task</button>
        </div>
      </div>
      <CreateTask tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Home;
