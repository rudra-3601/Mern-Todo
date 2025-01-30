import React from "react";
import axios from "axios";
import "../componentsStyles/CreateTask.css";

const CreateTask = ({ tasks, setTasks }) => {
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completedTask = async (id) => {
    try {
      
      const taskToUpdate = tasks.find((task) => task._id === id);
      const updatedTask = { ...taskToUpdate, completed: true };

      
      await axios.put(`http://localhost:8000/tasks/${id}`, updatedTask);

      
      setTasks(tasks.map((task) =>
        task._id === id ? { ...task, completed: true } : task
      ));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="createlist">
      <ul className="taskGroup">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className="taskItem">
              <div className="taskContent">
                <div className="taskTitle">Title: <span>{task.title}</span></div>
                <div className="taskDescription">Description: <span>{task.description}</span></div>
                <div className="taskStatus">
                  Status: <span className={task.completed ? "completed" : "pending"}>
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>
              <div className="taskActions">
                <button className="deleteBtn" onClick={() => deleteTask(task._id)}>Delete</button>
                {!task.completed && (
                  <button className="completedBtn" onClick={() => completedTask(task._id)}>
                    Completed
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          <div id="noTask   ">No tasks available</div>
        )}
      </ul>
    </div>
  );
};

export default CreateTask;
