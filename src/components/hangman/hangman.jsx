import PropTypes from 'prop-types';
import "./hangman.css"

export default function Hangman({triesLeft}) {
    return (
        <div className='imagesContainer'>
            <img src="src/assets/images/hangman-1.png"  className="hangmanImage" alt="hangman in try 1" style={{display: triesLeft === 8 ? 'block' : 'none'}}/>
            <img src="src/assets/images/hangman-2.png"  className="hangmanImage" alt="hangman in try 2" style={{display: triesLeft === 7 ? 'block' : 'none'}}/>
            <img src="src/assets/images/hangman-3.png"  className="hangmanImage" alt="hangman in try 3" style={{display: triesLeft === 6 ? 'block' : 'none'}}/>
            <img src="src/assets/images/hangman-4.png"  className="hangmanImage" alt="hangman in try 4" style={{display: triesLeft === 5 ? 'block' : 'none'}}/>
            <img src="src/assets/images/hangman-5.png"  className="hangmanImage" alt="hangman in try 5" style={{display: triesLeft === 4 ? 'block' : 'none'}}/>
            <img src="src/assets/images/hangman-6.png"  className="hangmanImage" alt="hangman in try 6" style={{display: triesLeft === 3 ? 'block' : 'none'}}/>
            <img src="src/assets/images/hangman-7.png"  className="hangmanImage" alt="hangman in try 7" style={{display: triesLeft === 2 ? 'block' : 'none'}}/>
            <img src="src/assets/images/hangman-8.png"  className="hangmanImage" alt="hangman in try 8" style={{display: triesLeft === 1 ? 'block' : 'none'}}/>
            <img src="src/assets/images/hangman-9.png"  className="hangmanImage" alt="hangman in try 9" style={{display: triesLeft === 0 ? 'block' : 'none'}}/>
        </div>
    )
}

Hangman.propTypes = {
    triesLeft: PropTypes.number.isRequired
};