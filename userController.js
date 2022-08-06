import { hashPassword } from "./auth.js"
import User from "./models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const  signup = async(req, res)  => {
    const user = req.body
    try {
        const dbUser = await User.findOne({username: user.username})
        if(dbUser){
            res.status(400).json({message: 'user already exist'})
            
        } else {
            const pwd = user.password
            const hashedPassword = await hashPassword(pwd)            
            await User.create({...user, password: hashedPassword})
            res.status(200).json({message: 'successfully registered'})
        }        
    } catch (error) {
        console.log(`error: ${error.message}`)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const  login = async(req, res)  => {
    const user = req.body
    try {
        let dbUser = await User.findOne({username: user.username})        
        if(dbUser){
            dbUser.loggedIn = true
            if (await bcrypt.compare(user.password, dbUser.password)) {
                const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '30d'})
                res.status(200).json({message: 'successfully logged in', token})                
            } else {
                res.status(400).json({message: 'Invalid Password'})                
            }            
        } else {            
            res.status(400).json({message: 'User does not exist!'})
        }        
    } catch (error) {
        console.log(`error: ${error.message}`)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const clearAll = async(req, res) => {
    try {
        await User.remove()
        res.status(200).json({message: 'successfully deleted all users!!'})
    } catch (error) {        
        console.log(error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}