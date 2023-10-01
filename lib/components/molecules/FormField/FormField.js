import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormField - A reusable form field component for handling user inputs.
 *
 * @component
 * @example
 * return (
 *   <FormField label="Name" type="text" placeholder="Enter your name" />
 * )
 *
 * @param {Object} props - The props object.
 * @param {string} props.label - The label for the form field.
 * @param {string} props.type - The type of input (e.g., text, email, password).
 * @param {string} [props.placeholder=''] - The placeholder text for the input field.
 * @param {boolean} [props.required=false] - Whether the field is required.
 */
const FormField = ({ label, type, placeholder, required }) => (
    <div className="FormField">
        <label>{label}</label>
        <input type={type} placeholder={placeholder} required={required} />
    </div>
);

FormField.propTypes = {
    /** The label for the form field. */
    label: PropTypes.string.isRequired,

    /** The type of input (e.g., text, email, password). */
    type: PropTypes.string.isRequired,

    /** The placeholder text for the input field. */
    placeholder: PropTypes.string,

    /** Whether the field is required. */
    required: PropTypes.bool,
};

FormField.defaultProps = {
    /** Default placeholder text for the input field. */
    placeholder: '',

    /** Default required state of the field. */
    required: false,
};

export default FormField;
