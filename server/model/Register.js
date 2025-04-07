import mongoose from "mongoose";
const {Schema, model} = mongoose;

const RegisterSchema = new Schema({
   name:  {
        type:String,
        required: true,
        unique: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required: true,
    },
})

const RegisterModel = mongoose.model("UsersTest", RegisterSchema)

export default RegisterModel