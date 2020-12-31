import React, { Fragment } from "react";
import { useGlobal } from "../context/global";
const AccountsOptions = ({ except, only }) => {
	const { accounts } = useGlobal();
	let options = accounts;
	if (except) {
		options = accounts.filter((x) => except.findIndex((e) => x.id === e) === -1);
	}
	if (only) {
		options = accounts.filter((x) => only.findIndex((e) => x.id === e) !== -1);
	}
	return (
		<Fragment>
			{options.map((option, index) => (
				<option value={option.id} key={index}>
					{option.name}
				</option>
			))}
		</Fragment>
	);
};

export default AccountsOptions;
