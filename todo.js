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
        const user = await User.find(user)
        const todos = await Todo.find({ user: user._id })
        res.status(200).json({ todos: todos })
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}
export const addTodo = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        const todo = await User.findOne({ title: req.body.title })
        if (todo) {
            res.status(400).json({ msg: 'todo alrleady present' })
        }
        await Todo.create({ title: req.body.title, description: req.body.desc, user: user._id })
        res.status(200).json({ msg: 'added todo' })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' })
        console.log(`error: ${error.message}`)
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const user = await User.find(user)
        await Todo.deleteOne({ title: req.body.title })
        res.status(200).json({ todos: todos })
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}