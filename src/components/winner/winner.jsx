import Alert from './../alert/alert'
import PropTypes from 'prop-types';
import './winner.css';
import confetti from 'canvas-confetti';

export default function Winner({randomWord, handleClick}) {

    confetti();

    return (
        <Alert>
            <div className='winner'>
                <h3 className='titleWinner'>¡GANASTE!</h3>
                <p className='messageWinner'>Efectivamente la palabra correcta era <strong>{randomWord}</strong></p>
                <button onClick={handleClick}>Volver a jugar</button>
            </div>
        </Alert>
    );
}

Winner.propTypes = {
    randomWord: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};