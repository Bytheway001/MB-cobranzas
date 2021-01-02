import React from "react";
import { FormControl } from "react-bootstrap";
export const FinalFormInput = ({ fieldProps, feedback, ...props }) => {
	const { input, meta } = fieldProps;
	return (
		<>
			<FormControl isValid={!meta.error && meta.touched} isInvalid={meta.error && meta.touched} size="sm" {...input} {...props} />
			{meta.touched && meta.error && feedback !== false && <span className="error-feedback">{meta.error}</span>}
		</>
	);
};

export const FinalFormSelect = ({ options, fieldProps, feedback, ...props }) => {
	const { input, meta } = fieldProps;
	return (
		<>
			<FormControl
				as="select"
				size="sm"
				{...input}
				isInvalid={meta.error && meta.touched}
				isValid={!meta.error && meta.touched}
				{...props}
			>
				<option value="">Seleccione...</option>
				{options}
			</FormControl>
			{meta.touched && meta.error && feedback !== false && <span className="error-feedback">{meta.error}</span>}
		</>
	);
};
