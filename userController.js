import User from "./models/User.js";


export const  signup = async(req, res)  => {
    const user = req.body
    try {
        const dbUser = await User.findOne({username: user.username})
        if(dbUser){
            res.status(400).json({message: 'user already exist'})
            
        } else {
            await User.create(user)
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
        let dbUser = await User.findOne(user)
        if(dbUser){
            dbUser.loggedIn = true
            await dbUser.save()
            res.status(200).json({message: 'successfully logged in'})
            
        } else {            
            res.status(400).json({message: 'invalid credentials'})
        }        
    } catch (error) {
        console.log(`error: ${error.message}`)
        res.status(500).json({message: 'Internal Server Error'})
    }
}