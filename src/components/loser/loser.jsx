import PropTypes from 'prop-types';
import './loser.css';

export default function Loser({randomWord, handleClick}) {
    return <section className='loserContainer'>
        <h3 className='messageTitle'>Has perdido :(</h3>
        <p className='message'>La palabra correcta era <strong>{randomWord}</strong></p>
        <button onClick={handleClick}>Volver a jugar</button>
    </section>
}

Loser.propTypes = {
    randomWord: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};