import React from "react";

import ReactDatePicker from "react-datepicker";

export const DatePicker = ({ onChange, value, ...props }) => {
	let real_value = value ? new Date(value) : null;
	return (
		<ReactDatePicker
			autoComplete="off"
			className="form-control form-control-sm"
			onChange={onChange}
			dateFormat="dd-MM-yyyy"
			selected={real_value}
			{...props}
		/>
	);
};
