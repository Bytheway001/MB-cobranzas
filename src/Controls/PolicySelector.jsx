import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

export const PolicySelector = ({ onChange, options }) => {
	const getSelected = () => {
		let opt = options.filter((x) => x.selected);
		return opt;
	};
	return (
		<Typeahead
			id="policy_selector"
			labelKey={(option) => `${option.policy_number} - ${option.plan.name}`}
			size="sm"
			selected={getSelected()}
			options={options}
			onChange={onChange}
			clearButton={true}
		/>
	);
};
