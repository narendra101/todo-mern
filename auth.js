import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (pwd) => {
const salt = process.env.SALT | 10
    const hashedPassword = await bcrypt.hash(pwd, salt)
    return hashedPassword
}

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(400).json({ message: "token missing" })
        } else {            
            const user = await jwt.verify(token, process.env.SECRET_KEY)                            
            if (user) {
                req.user = user
                next()
            } else {
                return res.status(400).json({ message: "Unuthorized User" })                
            }
        }
    } catch (error) {
        console.log('::AUTHERROR', error.message)
        res.status(400).json({error: error.message})
    }
}