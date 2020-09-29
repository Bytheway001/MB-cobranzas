import React,{useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { Document, Page, Text, View,  PDFViewer, Image } from '@react-pdf/renderer';
import { Fila,Columna, Field } from './components/Components';
import Barras from '../assets/Barras2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';  
const styles={
    page: {
        flexDirection: 'column',
        padding: 50,
    },
    row: {
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    h1: {
        textAlign: 'center',
        backgroundColor: '#0747A6',
        width: '100%',
        color: 'white',
        padding: 10

    },
    content: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '100%',
        backgroundColor: '#A1A1A1'
    },
    col: {
        marginBottom: 10
    },
    smText: {
        fontSize: 12
    },
}


export const IncomeReceipt = ({ user, data, modal }) => {
    const [show, setShow] = useState(false)
    const jsx = (
        <PDFViewer width='100%' height={800}>
            <Document>
                <Page size='A4' style={styles.page}>
                    <Fila style={{ height: 120 }}>
                        <Columna style={{ flex: 3 }}>
                            <Image src={Barras} style={{ width: '15%', backgroundColor: 'white' }} />
                        </Columna>
                        <Columna style={{ flex: 1, paddingHorizontal: 10, alignItems: 'flex-end' }}>
                            <View style={{ width: 80 }}>
                                <Image src={'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=expense' + data.id + user} allowDangerousPaths />
                            </View>
                        </Columna>
                    </Fila>
                    <Fila style={{ marginTop: 40, borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                        <Columna style={{ backgroundColor: '#0747A6', width: '100%', textAlign: 'center', padding: 10 }}>
                            <Text style={{ color: 'white' }}>Comprobante de Ingreso</Text>
                        </Columna>
                    </Fila>
                    <Fila style={{ marginTop: 20, padding: 15, borderColor: '#A1A1A1', borderWidth: 5, borderStyle: 'solid' }}>
                        <Field label='# Ingreso' text={data.id} />
                        <Field label='Fecha:' text={data.date} />

                        <Field label='Monto:' text={data.amount + ' ' + data.currency} />
                        <Field label='Operador:' text={user} />
                        <Field label='Factura:' text='S/N' />
                    </Fila>
                    <Fila >
                        <Field style={{ width: '100%' }} label='Descripcion:' text={data.description} />
                    </Fila>
                    <Fila style={{ marginTop: 70 }}>
                        <Columna style={{ flex: 1, paddingHorizontal: 10 }}>
                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid',marginBottom:50 }}>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>Firma Operador</Text>
                            </View>
                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid' }}>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>Aclaracion</Text>
                            </View>
                        </Columna>
                        <Columna style={{ flex: 1, paddingHorizontal: 10 }}>

                        </Columna>
                        <Columna style={{ flex: 1, paddingHorizontal: 10 }}>
                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid',marginBottom:50 }}>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>Firma Operador</Text>
                            </View>
                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid' }}>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>Aclaracion</Text>
                            </View>
                        </Columna>
                    </Fila>
                </Page>
            </Document>
        </PDFViewer>
    )
    if (modal) {
        return (
            <>

                <FontAwesomeIcon icon={faSave} size='lg' style={{cursor:'pointer'}} onClick={() => setShow(true)} />
                <Modal size='xl' show={show} onHide={() => setShow(false)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {jsx}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                        <Button form='client_form' type='submit' variant="primary">Actualizar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    else {
        return jsx
    }

}