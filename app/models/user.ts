import { Schema, model, models } from "mongoose"
import { hash } from "bcryptjs"

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [4, "Name should be atleast 4 characters"],
        maxLength: [30, "Name, should be less than 30 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
        minLength: [6, "Password should be atleast 6 characters long"]
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    this.password = await hash(this.password, 10)
})

const User = models.User || model("User", UserSchema)

export default User