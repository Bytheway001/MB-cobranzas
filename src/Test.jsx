import React from 'react';
import { IncomeReceipt } from './Receipts/Income';

export const Test = ()=>{
    const IncomeData= JSON.parse('{"errors":false,"data":{"id":"28","account_id":9,"category_id":93,"user_id":21,"date":"10/11/2020","description":"1231","currency":"USD","amount":123,"created_at":"26/11/2020","account":{"id":9,"name":"Cheques en Transito","usd":134,"bob":0,"type":"Checks","saldo_inicial":null,"fecha_saldo_inicial":"12/11/2020","last_balance_usd":36991.34,"last_balance_bob":134121.93,"last_balance_date":"12/11/2020"},"category":{"id":93,"name":"Rembolsos (Otras)","parent_id":90,"type":"Ingreso"}}}');
    return(
        <div>
            <IncomeReceipt user="Rafael" data={IncomeData.data}/>
        </div>
    )
}