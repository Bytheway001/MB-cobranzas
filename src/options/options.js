import React, { Fragment } from 'react';
export const PaymentMethodOptions = () => {
    const options = [
        {
            group: 'Pagos a la aseguradora',
            options: [
                { value: 'tdc_to_company', label: 'Pago Directo en su portal de cliente con Tarjeta de Credito' },
                { value: 'transfer_to_company', label: 'Pago con transferencia Bancaria a la Aseguradora' },
                { value: 'check_to_foreign_company', label: 'Pago con cheque extranjero a la Aseguradora' },
                { value: 'tdc_to_collector', label: 'Pago con Tarjeta de Credito para que cobradora pague la poliza' },
                { value: 'claim_to_company', label: 'Pago con abono de reclamo' }
            ],
        },
        {
            group: 'Pagos a la agencia',
            options:
                [
                    { value: 'transfer_to_agency_local', label: 'Pago con transferencia bancaria a cuenta local de agencia' },
                    { value: 'transfer_to_agency_foreign', label: 'Pago con transferencia bancaria a cuenta extranjera a la agencia' },
                    { value: 'check_to_agency_local', label: 'Pago con cheque local a la agencia' },
                    { value: 'check_to_agency_foreign', label: "Pago con cheque extranjero a a la agencia" },
                    { value: 'cash_to_agency', label: 'Pago en efectivo a la agencia' }
                ]
        }
    ]

    let result = options.map((group, key) => {
        return (

            <optgroup key={key} label={group.group}>
                {
                    group.options.map((option, index) => (
                        <option value={option.value}>{option.label}</option>
                    ))
                }
            </optgroup>
        )
    })
    return result


}

export const CurrencyOptions = () => {
    return (
        <Fragment>
            <option value='USD'>USD</option>
            <option value='BOB'>BOB</option>
        </Fragment>
    )
}


export const OfficeOptions = () => (
    <Fragment>
        <option value="sc">Santa Cruz</option>
        <option value='lp'>La Paz</option>
        <option value='cb'>Cochabamba</option>
    </Fragment>
)

export const PaymentTypeOptions = () => (
    <Fragment>
        <option value="complete">Completo</option>
        <option value='partial'>Parcial</option>

    </Fragment>
)

export const CategoryOptions = () => (
    <Fragment>

        <option value='misc'>Diversos</option>
        <option value='cleaning'>Gastos de Limpieza</option>
        <option value='cattering'>Servicio de Te</option>
        <option value='supplies'>Insumos</option>
        <option value='viaticals'>Viaticos y Pasajes</option>
        <option value='salaries'>Sueldos y Salarios</option>
        <option value='consulting'>Consultores</option>
        <option value='transport'>Movilidad</option>
    </Fragment>
)

export const MethodsArray = {
    tdc_to_company: 'Pago Directo en su portal de cliente con Tarjeta de Credito',
    transfer_to_company: 'Pago con transferencia Bancaria a la Aseguradora',
    check_to_foreign_company: 'Pago con cheque extranjero a la Aseguradora',
    tdc_to_collector: 'Pago con Tarjeta de Credito para que cobradora pague la poliza',
    claim_to_company: 'Pago con abono de reclamo',
    transfer_to_agency_local: 'Pago con transferencia bancaria a cuenta local de agencia',
    transfer_to_agency_foreign: 'Pago con transferencia bancaria a cuenta extranjera a la agencia',
    check_to_agency_local: 'Pago con cheque local a la agencia',
    check_to_agency_foreign: "Pago con cheque extranjero a a la agencia",
    cash_to_agency: 'Pago en efectivo a la agencia',
}
