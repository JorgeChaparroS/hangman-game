import { useEffect, useState } from "react"
import { getRandomWord } from "./api/APIUtils"
import { getValidCharacter, letterGeneratesError, generateArrayMatchingLetters } from './logic/utils'
import LetterFromWord from './components/letterFromWord/letterFromWord'
import { GAME_STATUS, TRIES } from './utils/constants'
import Winner from "./components/winner/winner"
import Loser from "./components/loser/loser"
import Hangman from "./components/hangman/hangman"
import Instructions from "./components/instructions/instructions"
import PressedCharacters from "./components/pressedCharacters/pressedCharacters"
import './App.css'

function App() {

  const [randomWord, setRandomWord] = useState('');
  const [allCharactersPressed, setAllCharactersPressed] = useState([]);
  const [matchingLetters, setMatchingLetters] = useState([]);
  const [triesLeft, setTriesLeft] = useState(TRIES);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);

  const getRandomWordFromAPI = async () => {
    try {
      const randomWordFromAPI = await getRandomWord();
      const word = randomWordFromAPI.toUpperCase();
      setRandomWord(word)
    } catch {
      console.error('Ocurrió un error obteniendo la palabra.')
    }
  }

  /* Function to bring random word */
  useEffect(() => {
    getRandomWordFromAPI();
  }, [])


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
  }, [allCharactersPressed, randomWord, matchingLetters, gameStatus])


  /* Function to initialize array */
  useEffect(() => {
    if (randomWord) {
      const initialMatchingLetters = new Array(randomWord.length).fill(null);
      setMatchingLetters(initialMatchingLetters);
    }
  }, [randomWord]);

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
