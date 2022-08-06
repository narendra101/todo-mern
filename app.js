import express from "express";
import Connect from "./db.js";
import { addTodo, deleteTodo, editTodo, homepage, page404, ping } from "./todo.js";
import { clearAll, login, signup } from "./userController.js";
import cors from 'cors'
import { authenticate } from "./auth.js";


const app = express()

// CONFIGURATION
app.use(express.json())
app.use(cors())


// ROUTES
app.get('/ping', ping)
app.post('/signup', signup)
app.post('/login', login)
app.get('/todo', authenticate, homepage)
app.post('/todo/add', authenticate, addTodo)
app.put('/todo/edit', authenticate, editTodo)
app.get('/todo/clear-all', clearAll)
app.delete('/todo/delete/:id',authenticate, deleteTodo)
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