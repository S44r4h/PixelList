import mongoose from "mongoose";
const { Schema } = mongoose;

/* YHDISTÄ TÄHÄN userID ja gameID! */

const userGamesSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
  },
  wishList: [
    {
      game: { type: mongoose.Types.ObjectId, ref: "Game" },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  playedList: [
    {
      game: { type: mongoose.Types.ObjectId, ref: "Game" },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

const UserGameModel = mongoose.model("UserGames", userGamesSchema);

export default UserGameModel;
