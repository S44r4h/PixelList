import { createContext, useReducer } from "react";
import { gamesReducer } from "../reducers/gamesReducer";

export const GameContext = createContext()


export const GameContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(gamesReducer, {
        games: null
    })

    

    return (
        //This is component
        <GameContext.Provider value={{...state, dispatch}}> 
            {children} {/* This is component under GameContext.Provider wraps */}
        </GameContext.Provider> 
    )
}