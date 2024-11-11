import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    complete: {
        type: Boolean,
        default: false,
    }
})

const ToDo = mongoose.model("ToDo", ToDoSchema)

export default ToDo
