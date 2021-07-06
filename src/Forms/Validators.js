export const composeValidators = (...validators) => (value) => {
	return validators.reduce((error, validator) => error || validator(value), undefined);
};

export const Validators = {
	required: (value) => {
		if (value === 0) {
			return undefined;
		} else {
			return value ? undefined : "Debe Escribir un Valor";
		}
	},
	mustBeNumber: (value) => (isNaN(value) ? "Debe escribir un Numero" : undefined),

	mustBeEmail: (value) =>
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
			? undefined
			: "Debe escribir una direccion valida de correo",
	mustBeDecimal: (value) => {
		if (value !== 0 && value !== "0") {
			return value.toString().match(/^\d+(?:\.\d+)?$/) ? undefined : "Debe ser un numero en el formato 1234.56";
		} else {
			return undefined;
		}
	},
	mustBeLowerThan: (value, top) => {
		return value <= top.premium - top.payed ? undefined : "El monto supera la cantidad adeudada por el cliente";
	},
	mustBePayable: (value, values, policy) => {
		console.log(policy);
		let debt = policy.totals.debt;

		let amounts = {
			debt: policy.premium - policy.payed,
			cr: parseFloat(values.change_rate),
			cd: parseFloat(values.company_discount),
			ag: parseFloat(values.agency_discount),
			ad: parseFloat(values.agent_discount),
		};
		if (values.currency === "BOB") {
			let discounts = (amounts.cd + amounts.ag + amounts.ad) / amounts.cr;
			debt = (amounts.debt - discounts) * amounts.cr;
		} else {
			let discounts = amounts.cd + amounts.ag + amounts.ad;
			debt = amounts.debt - discounts;
		}
		return value <= debt ? undefined : "El monto ingresado supera la deuda del cliente";
	},
	isDifferent: (value, allValues) => {
		let response = value !== allValues.from ? undefined : "Las cuentas deben ser distintas";
		return response;
	},
	mustNotBe: (value, arrayOfValues) => {
		return arrayOfValues.includes(value) ? "Valor Incorrecto" : undefined;
	},
};
