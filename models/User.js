import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    loggedIn: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("User", userSchema)

