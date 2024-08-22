// A controller in backend is like a manager that handles the logic for specific parts of your application. It decides what should happen when a request comes in and coordinates between the request , your data and response.

const Task = require("../models/task");
const validateID = require("../utils/validateID");

// ============FUNCTION TO GET ALL THE TASKS=======================

const getAllTask = async (req, res) => {
  const tasks = await Task.find({}); // Retrive all tasks from the database
  res.status(200).json({ tasks }); // send the retrieve taskks in a JSON response
};

// ===================FUNCTION FOR CREATING A NW TASK===========================

const createTask = async (req, res) => {
  const { title, description, tag } = req.body; // destructure the required fields from the request body

  if (!title) {
    return res.status(400).json({ message: "Please Provide a Title" });
  }
  if (!description) {
    return res.status(400).json({ message: "Please Provide Description" });
  }
  if (!tag) {
    return res.status(400).json({ message: "Please Choose a Tag" });
  }

  const task = await Task.create(req.body); // create a new task with the request data
  res.status(201).json({ message: "Task created Successfully", task }); // send a status code with a message of success!
};

// ================== Function for editing an existing task=================================

const editTask = async (req, res) => {
  const { id } = req.params; // get the task ID from the request parameters

  if (!validateID(id)) {
    return res.status(400).json({ message: `ID: ${id} is not valid` });
  }

  const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body }); // Updates the task with the provided data
  res.status(200).json({ message: "Task Updated Successfully" }); // send the success message if updated successfully.
};

// ======================FUNCTION TO DELETE AN EXISTING TASK==============================

const deleteTask = async (req, res) => {
  const { id } = req.params; // Get the task ID from the requested parameter

  if (!validateID(id)) {
    return res.status(400).json({ message: `ID: ${id} is not valid` });
  }

  const task = await Task.findOneAndDelete({ _id: id }); // Delete the task with the special ID
  res.status(200).json({ message: "Task Successfully Deleted" }); // Send success message if deletion is successful
};

// =========================FUNCTION TO GET EACH TASK================================

const eachTask = async (req, res) => {
  const { id } = req.params; // Get the task ID from the requested parameter

  if (!validateID(id)) {
    return res.status(400).json({ message: `ID: ${id} is not valid` });
  }

  const task = await Task.findOne({ _id: id }); // Find the task with the specified ID
  res.status(200).json({ task }); // Send the found task in JSON response
};

module.exports = { getAllTask, createTask, editTask, deleteTask, eachTask }; // Export the controller functions to be used in the router
