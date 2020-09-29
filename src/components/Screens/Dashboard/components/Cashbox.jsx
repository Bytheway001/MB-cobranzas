
import React,{useState,Fragment} from 'react';
import {Table,Button} from 'react-bootstrap';
import { Extracto } from '../../Reports/components/Extracto';
import Axios from 'axios';
import { API, formatMoney } from '../../../../utils/utils';
import { CurrencyChangeModal } from './CurrencyChangeModal';

export const CashBox = ({ usd, bob, id }) => {
    const [modalData, setModalData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const fillModal = (e, id) => {
        Axios.get(API + '/movements/' + id).then(res => {
            setModalData(res.data.data)
            setModalShow(true)
        })
    }
    return (
        <Fragment>
            <Extracto show={modalShow} setShow={setModalShow} data={modalData} />
            <Table variant='bordered' size='sm'>
                <thead><tr><th className='bg-info text-white' colSpan={2}>Mi Caja</th></tr></thead>
                <tbody>
                    <tr><th>USD</th><th>BOB</th></tr>
                    <tr><th>{formatMoney(usd, 2, '.', ',', '')}</th><th>{formatMoney(bob, 2, '.', ',', '')}</th></tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th><Button onClick={(e) => fillModal(e, id)} block size='sm'>Ver Movimientos</Button></th>
                        <th><CurrencyChangeModal /></th>
                    </tr>


                </tfoot>
            </Table>
        </Fragment>


    )
}