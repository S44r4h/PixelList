

export const gamesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_GAMES': /* Set ALL games */
            return {
                games: action.payload
            }
        case 'CREATE_GAME':
            return { /* Adding new game to array*/
                games: [...state.games, action.payload]
            }
        case 'DELETE_GAME':
            return {
                games: state.games.filter((g) => g._id !== action.payload._id)
            }
        case 'UPDATE_GAME':
            return {
                games: state.games.map((g) =>  g._id === action.payload._id ? action.payload : g)
            }

            default:
                return state
    }
}