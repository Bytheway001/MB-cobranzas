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
                    { value: 'check_to_agency_foreign', label: "Pago con cheque local a a la agencia" },
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

export const AccountsOptions = () => {
    return (
        <Fragment>

            <option value="2">Cuenta Bisa (USD)</option>
            <option value='4'>Cuenta Bisa (BOB)</option>
            <option value='3'>Bank of America (USD)</option>
            <option value='1'>Caja</option>
            <option value='5'>Cheques en transito</option>
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