import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

export const ClientSelector = ({ options, onChange, onSearch, isLoading, selected, ...props }) => {
	const getSelected = () => {
		if (selected) {
			return [selected];
		} else {
			return [];
		}
	};
	return (
		<AsyncTypeahead
			size="sm"
			selected={getSelected()}
			onChange={onChange}
			isLoading={isLoading}
			id="client-selector"
			filterBy={["h_id", "first_name"]}
			options={options}
			labelKey={(option) => `${option.h_id} - ${option.first_name}`}
			onSearch={onSearch}
			clearButton={true}
			emptyLabel="Sin Resultados!"
			searchText="Buscando..."
			promptText="Buscar por Nombre o ID Hubspot"
			{...props}
		/>
	);
};
