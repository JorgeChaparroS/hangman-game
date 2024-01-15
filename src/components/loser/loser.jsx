import PropTypes from 'prop-types';
import './loser.css';

export default function Loser({ randomWord, handleClick }) {
    return (
        <div className='positionOfLoser'>
            <section className='loserContainer'>
                <h2 className='messageTitle'>Has perdido :(</h2>
                <p className='message'>La palabra correcta era <strong>{randomWord}</strong></p>
                <button onClick={handleClick}>Volver a jugar</button>
            </section>
        </div>
    )
}

Loser.propTypes = {
    randomWord: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};