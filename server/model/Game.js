
import mongoose from "mongoose";
const {Schema, model} = mongoose;

const gameSchema = new Schema({
  title: { type: String, required: true },
  platform: { type: Array },
  genre: { type: Array },
  // muuta yleistä peliin liittyvää
});

const gamesModel = mongoose.model("Game", gameSchema);

export default gamesModel;
