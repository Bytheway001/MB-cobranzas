import Axios from "axios";
// eslint-disable-next-line no-undef
export const API = process.env.REACT_APP_API_URL;

export const formatDate=(val)=>{
    return val.toLocaleDateString('es-MX', { month: '2-digit', year: 'numeric', day: '2-digit' })
}
export function formatMoney(amount,decimalCount = 2,decimal = ".",thousands = ",",currency='$') {
    try {

        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(
            (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
            currency +
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCount)
                      .slice(2)
                : "")
        );
    } catch (e) {
        console.log(e)
    }
}

export const setupInterceptors = (u)=>{
    Axios.interceptors.request.use(config=>{
        config.headers.u = u;
        return config
    })
}


export const UserIs = (user,level)=>{
    let roles = {staff:128,collector:224,admin:248,master:255}
    let userRole = roles[user.role]
    return userRole >= level
}

export function numerize(number) {
    number = number.toString().replace(',', '.');
    return Number(parseFloat(number.replace(',', '.')).toFixed(2))
}

export const methods = {
    cash_to_agency: 'Efectivo',
    check_to_agency_local: 'Cheque -> agencia (L)',
    check_to_agency_foreign: 'Cheque -> agencia (E)',
    transfer_to_agency_foreign: 'Transf -> agencia (E)',
    transfer_to_agency_local: 'Transf -> agencia (L)',
    claim_to_company: 'Abono',
    tdc_to_collector: 'TDC -> Compañia',
    check_to_foreign_company: 'Cheque -> Compañia',
    transfer_to_company: 'Transf -> Compañia',
    tdc_to_company: 'Portal -> Compañia'
}

export function resolve(path, obj) {
    return path.split('.').reduce((p, c) => p && p[c] || null, obj)
}
export const listOf = (array, property) => {
    return [...new Set(array.map(e => resolve(property, e)))].map(x => ({ value: x, label: x }))
}