import mongoose from "mongoose";
const {Schema, model} = mongoose;


/* YHDISTÄ TÄHÄN userID ja gameID! */

const RegisterSchema = new Schema({
   userId: {

   },
   gameId: {

   },
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