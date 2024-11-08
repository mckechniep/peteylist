//import necessary modules
import express from "express";
import cors from "cors";

//import other files
import connectdb from "./mongodb.js";
// import todoRoute from "./routes/todoRoute.js";

const app = express();

//use middleware
app.use(express.json());
app.use(cors());

//connect to db
connectdb();

//define routes
// app.use("/api", todoRoute);


//start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
})






