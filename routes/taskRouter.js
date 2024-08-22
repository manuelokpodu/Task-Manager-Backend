const express = require("express"); // Import Express Framework
const {
  getAllTask,
  createTask,
  editTask,
  deleteTask,
  eachTask,
} = require("../controller/taskController");

const router = express.Router(); // Create a new router Instance

router.get("/", getAllTask); // Route to get all tasks, handled by the getAllTask Function

router.post("/create", createTask); // Route to create a new task, handle by createTask function

router.patch("/:id", editTask); // Route to edit a specific task by its ID, handled by editTask Fuction in controller

router.delete("/:id", deleteTask); // Route to delete a specific task by its ID, handled by deleteTask Function in controller

router.get("/:id", eachTask) // Route to get a specific task by its ID, handled by eachTask Function in controller

module.exports = router; // Export the router to be used in the main server file app.jsh
