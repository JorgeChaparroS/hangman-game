import { useEffect, useState } from "react";
import { getRandomWord } from './../api/APIUtils';

export function useRandomWord() {
    const [randomWord, setRandomWord] = useState('');

    const getRandomWordFromAPI = async () => {
        try {
            const randomWordFromAPI = await getRandomWord();
            const word = randomWordFromAPI.toUpperCase();
            setRandomWord(word)
        } catch {
            console.error('Ocurrió un error obteniendo la palabra.')
        }
    }
    
    useEffect(() => {
        getRandomWordFromAPI();
    }, [])

    return { randomWord, setRandomWord, getRandomWordFromAPI };
}