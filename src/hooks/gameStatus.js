import { useState, useEffect } from "react";
import { GAME_STATUS } from "../utils/constants";

export function useGameStatus(matchingLetters, triesLeft) {
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);

    useEffect(() => {
        const youWon = matchingLetters.every(letter => letter !== null) && matchingLetters.length > 0;
        if (youWon) {
            setGameStatus(GAME_STATUS.WINNER);
        }
    }, [matchingLetters]);

    useEffect(() => {
        if (triesLeft === 0) {
            setGameStatus(GAME_STATUS.LOSER);
        }
    }, [triesLeft]);

    return { gameStatus, setGameStatus };
}