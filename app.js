import express from "express";
import Connect from "./db.js";
import { addTodo, deleteTodo, homepage, page404, ping } from "./todo.js";
import { login, signup } from "./userController.js";
import cors from 'cors'


const app = express()

// CONFIGURATION
app.use(express.json())
app.use(cors())


// ROUTES
app.get('/ping', ping)
app.post('/signup', signup)
app.post('/login', login)
app.get('/todo', homepage)
app.post('/todo', addTodo)
app.post('/todo/delete', deleteTodo)
app.use('/*', page404)

// START
async function initiateApplication(DB_URI, PORT) {
    try {
        await Connect(DB_URI)
        await app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`))
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}
export default initiateApplication