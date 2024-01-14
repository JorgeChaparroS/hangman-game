import PropTypes from 'prop-types';
import './LetterFromWord.css';

export default function LetterFromWord({letterToShow}) {

    const classNames = letterToShow ? 'letterContainer rightLetter' : 'letterContainer';


    return <span className={classNames}>{letterToShow}</span>
}

LetterFromWord.propTypes = {
    letterToShow: PropTypes.string
};