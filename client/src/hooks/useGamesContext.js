import { GameContext } from "../context/GameContext";
import { useContext } from "react";

export const  UseGamesContext = () => {
    const context = useContext(GameContext)

    if(!context) {
        throw Error('useGamesContext must be used inside a GamesContextProvider')
    }


    return context
}