import { useEffect, useState } from 'react';

export function useLettersInWord(randomWord) {
    
    const [matchingLetters, setMatchingLetters] = useState([]);

    useEffect(() => {
        if (randomWord) {
            const initialMatchingLetters = new Array(randomWord.length).fill(null);
            setMatchingLetters(initialMatchingLetters);
        }
    }, [randomWord]);

    return {matchingLetters, setMatchingLetters};
}