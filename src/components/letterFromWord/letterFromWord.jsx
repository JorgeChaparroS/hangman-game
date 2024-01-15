import PropTypes from 'prop-types';
import './LetterFromWord.css';

export default function LetterFromWord({letterToShow}) {
    return <span className="letterContainer">{letterToShow}</span>
}

LetterFromWord.propTypes = {
    letterToShow: PropTypes.string
};