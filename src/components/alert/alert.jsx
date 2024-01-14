import './alert.css'
import PropTypes from 'prop-types';

export default function Alert({children}) {

    return (
        <div className="modalContainer">
            <article className='modalContent'>
                {children}
            </article>
        </div>
    );
}

Alert.propTypes = {
    children: PropTypes.node
};