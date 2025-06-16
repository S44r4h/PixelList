export const gamesReducer = (state, action) => {
  switch (action.type) {
    case "SET_GAMES" /* Set ALL games */:
      return {
        games: action.payload,
      };
    case "CREATE_GAME":
      return {
        /* Adding new game to array*/ games: [...state.games, action.payload],
      };
    case "DELETE_GAME":
      return {
        games: state.games.filter((g) => g._id !== action.payload._id),
      };
    case "UPDATE_GAME":
      return {
        games: state.games.map((g) =>
          g._id === action.payload._id ? action.payload : g
        ),
      };
    case `DELETE_FROM_wishList`:
      return {
        games: {
          ...state.games,
          wishList: state.games.wishList.filter(
            (game) => game._id !== action.payload
          ),
        },
      };
    case `DELETE_FROM_playedList`: {
      return {
        games: {
          ...state.games,
          playedList: state.games.playedList.filter(
            (game) => game._id !== action.payload
          ),
        },
      };
    }

    default:
      return state;
  }
};
