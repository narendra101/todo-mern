import mongoose from "mongoose";

async function Connect(DB_URI){
    try {
        await mongoose.connect(DB_URI, {useNewUrlParser: true})
        console.log('connected to database')
    } catch (error) {
        console.log(`error connecting to database: ${error.message}`)
    }
}

export default Connect