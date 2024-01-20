import { useEffect, useState, useCallback } from "react";
import { getValidCharacter, letterGeneratesError, generateArrayMatchingLetters } from '../logic/utils';
import { GAME_STATUS } from '../utils/constants';

export function useKeyboard(randomWord, matchingLetters, setMatchingLetters, setTriesLeft, gameStatus) {
    const [allCharactersPressed, setAllCharactersPressed] = useState([]);
  
    const handleCharacterFromEvent = useCallback((event) => {
      const newAllCharactersPressed = [...allCharactersPressed];
      const characterPressed = getValidCharacter(event);
      if (characterPressed) {
        if (letterGeneratesError(characterPressed, randomWord, allCharactersPressed)) {
          setTriesLeft((previousTriesLeft) => previousTriesLeft - 1);
        } else {
          const newMatchingLetters = generateArrayMatchingLetters(randomWord, matchingLetters, characterPressed);
          setMatchingLetters(newMatchingLetters);
        }
        newAllCharactersPressed.push(characterPressed);
      }
      setAllCharactersPressed(newAllCharactersPressed);
    }, [allCharactersPressed, randomWord, matchingLetters, setTriesLeft, setMatchingLetters]);
  
    useEffect(() => {
      document.addEventListener('keydown', handleCharacterFromEvent);
  
      if (gameStatus === GAME_STATUS.LOSER || gameStatus === GAME_STATUS.WINNER) {
        document.removeEventListener('keydown', handleCharacterFromEvent);
      }
  
      return () => {
        document.removeEventListener('keydown', handleCharacterFromEvent);
      };
    }, [handleCharacterFromEvent, gameStatus]);
  
    return { allCharactersPressed, setAllCharactersPressed };
  }