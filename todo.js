import Todo from "./models/Todo.js"
import User from "./models/User.js"

// PING route
export const ping = async (req, res) => {
    return res.status(200).json("pong")
}

// 404 route
export const page404 = async (req, res) => {
    return res.status(404).json("Page Not Found")
}


export const homepage = async (req, res) => {
    try {
        const user = req.user
        const todos = await Todo.find({ user: user._id })
        res.status(200).json({ status: "success", todos })
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}
export const addTodo = async (req, res) => {
    try {
        const user = req.user
        const todo = req.body
        const dbTodo = await Todo.findOne({ title: todo.title })
        if (dbTodo) {
            res.status(400).json({ msg: 'todo alrleady present' })
        }
        await Todo.create({ title: todo.title, description: todo.description, user: user._id })
        res.status(200).json({ msg: 'added todo' })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' })
        console.log(`error: ${error.message}`)
    }
}

export const editTodo = async (req, res) => {
    try {
        const todo = req.body
        console.log(todo, '------------')
        const dbTodo = await Todo.findOneAndUpdate({ _id: todo._id }, { title: todo.title, description: todo.description })
        // await dbTodo.save() 
        const todos = await Todo.find()
        res.status(200).json({ msg: 'updated todo', todos })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' })
        console.log(`error: ${error.message}`)
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id
        await Todo.findOneAndDelete({ _id: id })
        const todos = await Todo.find()
        res.status(200).json({ message: "Successfully Deleted Todo", todos: todos })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}