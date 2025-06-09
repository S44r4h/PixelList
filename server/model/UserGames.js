import mongoose from "mongoose";
const { Schema, model } = mongoose;

/* YHDISTÄ TÄHÄN userID ja gameID! */

const userGamesSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
  },
  wishList: {
    type: [mongoose.Types.ObjectId],
  },
});

const UserGameModel = mongoose.model("UserGames", userGamesSchema);

export default UserGameModel;
