import React from 'react';
import PropTypes from 'prop-types';
import './Label.scss';

const Label = ({
	title, name, type, value, messageError, onChange, onBlur, onFocus, placeholder
}) => (
	<label
		className={`partners-form-label label-${name} ${messageError !== '' ? 'error' : ''}`}
		htmlFor={`label-${name}`}
	>
		{title}
		<input
			className={`partner-${name} without_number`}
			type={type}
			name={name}
			placeholder={placeholder}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			value={value}
			id={`label-${name}`}
			autoComplete={name === 'emailRepeated' ? 'off' : 'on'}
		/>
		{messageError !== '' &&
			<span className="partner-form-warning label-warning">{messageError}</span>
		}
	</label>
);

export default Label;

Label.propTypes = {
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	messageError: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
	onFocus: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired
};
