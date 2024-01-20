import { useState } from "react"
import LetterFromWord from './components/letterFromWord/letterFromWord'
import { GAME_STATUS, TRIES } from './utils/constants'
import Winner from "./components/winner/winner"
import Loser from "./components/loser/loser"
import Hangman from "./components/hangman/hangman"
import Instructions from "./components/instructions/instructions"
import PressedCharacters from "./components/pressedCharacters/pressedCharacters"
import './App.css'
import { useRandomWord } from './hooks/randomWord';
import { useLettersInWord } from './hooks/lettersInWord';
import { useGameStatus } from './hooks/gameStatus';
import { useKeyboard } from './hooks/keyboard';


function App() {

  const {randomWord, setRandomWord, getRandomWordFromAPI} = useRandomWord();
  const {matchingLetters, setMatchingLetters} = useLettersInWord(randomWord);
  const [triesLeft, setTriesLeft] = useState(TRIES);
  const {gameStatus, setGameStatus} = useGameStatus(matchingLetters, triesLeft);
  const {allCharactersPressed, setAllCharactersPressed} = useKeyboard(randomWord, matchingLetters, setMatchingLetters, setTriesLeft, gameStatus);

  /* Function to restart screen in case of wictory or loose*/
  const restartGame = () => {
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
