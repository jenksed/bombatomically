import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button - A reusable button component.
 *
 * @component
 * @example
 * return (
 *   <Button onClick={handleClick} className="primary" type="button">
 *     Click Me
 *   </Button>
 * )
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {function} [props.onClick=null] - The callback to be called when the button is clicked.
 * @param {string} [props.className=''] - Additional class names to add to the button for styling.
 * @param {('button'|'submit'|'reset')} [props.type='button'] - The type attribute of the button.
 * @param {boolean} [props.disabled=false] - Whether the button should be disabled.
 */
const Button = ({ children, onClick, className, type, disabled }) => (
    <button 
        type={type} 
        className={`Button ${className}`} 
        onClick={onClick} 
        disabled={disabled}
    >
        {children}
    </button>
);

Button.propTypes = {
    /** The content to be displayed inside the button. */
    children: PropTypes.node.isRequired,

    /** The callback to be called when the button is clicked. */
    onClick: PropTypes.func,

    /** Additional class names to add to the button for styling. */
    className: PropTypes.string,

    /** The type attribute of the button. */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),

    /** Whether the button should be disabled. */
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    /** Default callback for the onClick event. */
    onClick: null,

    /** Default additional class names for styling. */
    className: '',

    /** Default type attribute of the button. */
    type: 'button',

    /** Default disabled state of the button. */
    disabled: false,
};

export default Button;
