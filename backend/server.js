//import necessary modules
import express from "express";
import cors from "cors";

//import other files
import connectdb from "./mongodb.js";
import toDoRoutes from "./routes/toDoRoutes.js";

const app = express();

//use middleware
app.use(express.json());
app.use(cors());

//connect to db
connectdb();

//define routes
app.use("/api", toDoRoutes);


//start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
})






