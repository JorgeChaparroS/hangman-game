import { useEffect, useState } from "react"
import { getValidCharacter, letterGeneratesError, generateArrayMatchingLetters } from './logic/utils'
import LetterFromWord from './components/letterFromWord/letterFromWord'
import { GAME_STATUS, TRIES } from './utils/constants'
import Winner from "./components/winner/winner"
import Loser from "./components/loser/loser"
import Hangman from "./components/hangman/hangman"
import Instructions from "./components/instructions/instructions"
import PressedCharacters from "./components/pressedCharacters/pressedCharacters"
import './App.css'
import {useRandomWord} from './hooks/randomWord';
import {useLettersInWord} from './hooks/lettersInWord';


function App() {

  const {randomWord, setRandomWord, getRandomWordFromAPI} = useRandomWord();
  const {matchingLetters, setMatchingLetters} = useLettersInWord(randomWord);
  const [allCharactersPressed, setAllCharactersPressed] = useState([]);
  const [triesLeft, setTriesLeft] = useState(TRIES);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);

  /* Function to check keyboard events*/
  useEffect(() => {

    const handleCharacterFromEvent = (event) => {
      const newallCharactersPressed = [...allCharactersPressed];
      const characterPressed = getValidCharacter(event);
      if (characterPressed) {
        if (letterGeneratesError(characterPressed, randomWord, allCharactersPressed)) {
          setTriesLeft((previousTriesLeft) => previousTriesLeft - 1);
        } else {
          const newMatchingLetters = generateArrayMatchingLetters(randomWord, matchingLetters, characterPressed);
          setMatchingLetters(newMatchingLetters);
        }
        newallCharactersPressed.push(characterPressed);
      }
      setAllCharactersPressed(newallCharactersPressed);
    }

    document.addEventListener('keydown', handleCharacterFromEvent);

    if (gameStatus === GAME_STATUS.LOSER || gameStatus === GAME_STATUS.WINNER) {
      document.removeEventListener('keydown', handleCharacterFromEvent);
    }

    return () => {
      document.removeEventListener('keydown', handleCharacterFromEvent);
    }
  }, [allCharactersPressed, randomWord, matchingLetters, setMatchingLetters, gameStatus])

  /* Function to check when there is a winner */
  useEffect(() => {
    const youWon = matchingLetters.every(letter => letter !== null) && matchingLetters.length > 0;
    if (youWon) {
      setGameStatus(GAME_STATUS.WINNER);
    }
  }, [matchingLetters]);

  /* Function to check when there is a loser */
  useEffect(() => {
    if (triesLeft === 0) {
      setGameStatus(GAME_STATUS.LOSER);
    }
  }, [triesLeft]);

  /* Function to restart screen in case of wictory or loose*/
  function restartGame() {
    setRandomWord('');
    setAllCharactersPressed([]);
    setMatchingLetters([]);
    setTriesLeft(TRIES);
    setGameStatus(GAME_STATUS.PLAYING);
    getRandomWordFromAPI();
  }

  return (
    <>
      <main className="gameContainer">
        <h1>El Ahorcado</h1>
        <div className="board">
          <section style={{width: '35%'}}>
            <Instructions></Instructions>
          </section>
          
          <section className="hangmanSection">
            <Hangman triesLeft={triesLeft}></Hangman>
            {
              randomWord && <section className="lettersContainer">
                {
                  matchingLetters.map((letter, index) => {
                    return <LetterFromWord key={`letter-${index}`} letterToShow={letter}/>
                  })
                }
              </section>
            }
          </section>

          <section style={{width: '35%'}}>
            <PressedCharacters characters={allCharactersPressed} randomWord={randomWord}></PressedCharacters>
          </section>
        </div>
        { gameStatus === GAME_STATUS.WINNER && <Winner randomWord={randomWord} handleClick={restartGame}></Winner> }
        { gameStatus === GAME_STATUS.LOSER && <Loser randomWord={randomWord} handleClick={restartGame}></Loser> }
      </main>
    </>
    
  )
}

export default App
