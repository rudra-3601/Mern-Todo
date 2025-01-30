import Task from "../models/tasks.js";


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const task = new Task({ title, description, completed });
  try {
    const newTask = await task.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.send({ message: "Task deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true } // Return the updated document
    );
    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).send(error);
  }
};
