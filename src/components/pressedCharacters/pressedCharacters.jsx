import PropTypes from 'prop-types';
import './pressedCharacters.css'

export default function PressedCharacters({characters, randomWord}) {
    return <>
        <aside className='pressedCharsContainer'>
            <h2>Las letras que has ingresado:</h2>
            <ul>
                {
                    characters.map((char, index) => {
                        return <li 
                            key={`list-item-${char}-${index}`}
                            className={randomWord.includes(char) ? 'textSuccess' : 'textWrong'}
                            style={{fontWeight: 'bold'}}>
                                {char}
                            </li>
                    })
                }
            </ul>
        </aside>
    </>
}

PressedCharacters.propTypes = {
    characters: PropTypes.array.isRequired,
    randomWord: PropTypes.string.isRequired
};