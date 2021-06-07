/* eslint-disable no-undef */
import { formatMoney } from "../utils/utils";
test("Formats Money", () => {
	expect(formatMoney(5000, 2, ",", ".", "$")).toEqual("$5.000,00");
});
