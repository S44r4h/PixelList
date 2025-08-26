import mongoose from "mongoose";
const { Schema } = mongoose;

const RegisterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // hides from all queries
  },
  role: {
    type: String,
    required: true,
  },
});

const RegisterModel = mongoose.model("User", RegisterSchema);

export default RegisterModel;
