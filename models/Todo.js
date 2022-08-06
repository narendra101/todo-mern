import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        requirued: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    done: Boolean
})

const Todo = mongoose.model('Todo', todoSchema)
export default Todo