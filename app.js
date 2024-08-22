require("dotenv").config(); // Load environment variables from a .env file into process.env

const express = require("express"); // Import Express framework

const mongoose = require("mongoose"); // Import Mongoose fro MongoDB interaction

const cors = require("cors");

const app = express(); // spining up the express framework server

const port = 3000; // Define the port  number for the server

//CORS (Cross-Origign-Resource SHARING) WHEN THE FRONTEND AND BACKEND RE FOM DIFFERENT ORIGINS(domains, ports or protocols) and the bakened hasn't been configured to accept requests from the frontend origin

app.use(cors());

const taskRouter = require("./routes/taskRouter"); // Import the taskRouter for task-related routes.
const notFound = require("./middlewares/notFound"); // Import a middleware to handle 404 Not Found errors

app.use(express.json()); // This is a middleware to parse incoming JSON requests, from postman allowing access to the req.body

app.use("/api/task", taskRouter); // Mount the taskRouter at /api/taks, all task-related routes starts with /api/task

app.use(notFound); // Use the custom 404middleware for handling

const start = async () => {
  try {
    // Attempt to connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");

    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  } catch (error) {
    // log the error if the database connection fails
    console.log(error);
    console.log("Unable to connect");
  }
};

start();

// Mongoose is an ODM (Object Data Modelling) library for MongoDB and Node.js.

//MongosDB is a NoSQL database that stores data in a flexible , JSON like format.

// manuelokpodu
// 0Fsps6eVYT7NTiDL

// mongodb+srv://manuelokpodu:0Fsps6eVYT7NTiDL@cluster0.027eo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
