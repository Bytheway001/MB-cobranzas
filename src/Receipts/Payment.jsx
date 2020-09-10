import React from 'react';

import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

import Barras from '../assets/Barras2.png';
import { Fila, Columna } from './components/Components';

const styles = StyleSheet.create({
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
    field: {
        width: '25%',
        marginVertical: 7

    },
    fieldLabel: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 11,
        marginBottom: 5,
        color: 'gray'
    },
    fieldText: {
        fontSize: 14,
        textIndent: 5,
        fontStyle: 'italic'
    }
})
export const PaymentReceipt = () => {
    return (
        <ModalReceipt />




    )
}

export const ModalReceipt = ({ data, user }) => {

    let testData = {
        id: 1,
        date: '01-01-2020',
        amount: 5000,
        currency: 'USD',

    }

    let testUser = 'Rafael Castillo'
    return (
        <>

            <PDFViewer width='100%' height={800}>
                <Receipt data={testData} user={testUser} />
            </PDFViewer>
        </>
    )
}


export const IncomeReceipt = ({ user, data }) => {
    return (
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
                    <Fila>
                        <Field label='Descripcion:' text={data.description} />
                    </Fila>
                    <Fila style={{ marginTop: 70 }}>
                        <Columna style={{ flex: 1, paddingHorizontal: 10 }}>
                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid' }}>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>Firma Operador</Text>
                            </View>
                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid' }}>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>Firma Operador</Text>
                            </View>
                        </Columna>
                        <Columna style={{ flex: 1, paddingHorizontal: 10 }}>

                        </Columna>
                        <Columna style={{ flex: 1, paddingHorizontal: 10 }}>
                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid' }}>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>Recibido Conforme</Text>
                            </View>
                        </Columna>
                    </Fila>
                </Page>
            </Document>
        </PDFViewer>
    )
}

const Receipt = ({ data, user }) => {

    return (
        <Document>
            <Page size='A4' orientation='portrait' style={styles.page}>
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
                        <Text style={{ color: 'white' }}>Comprobante de Egreso</Text>
                    </Columna>
                </Fila>
                <Fila style={{ marginTop: 20, padding: 15, borderColor: '#A1A1A1', borderWidth: 5, borderStyle: 'solid' }}>
                    <Field label='# Gasto' text={data.id} />
                    <Field label='Fecha:' text={data.date} />
                    <Field label='Oficina:' text={data.office} />
                    <Field label='Monto:' text={data.amount + ' ' + data.currency} />
                    <Field label='Operador:' text={user} />
                    <Field label='Factura:' text='S/N' />
                    <Field label='Categoria:' text={data.category} />
                </Fila>
                <Fila>
                    <Field label='Descripcion:' text={data.description} />
                </Fila>
                <Fila style={{ marginTop: 70 }}>
                    <Columna style={{ flex: 1, paddingHorizontal: 10 }}>
                        <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid' }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>Firma Operador</Text>
                        </View>
                        <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid',marginTop:30 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>Aclaracion de Firma</Text>
                        </View>
                    </Columna>
                    <Columna style={{ flex: 1, paddingHorizontal: 10 }}>

                    </Columna>
                    <Columna style={{ flex: 1, paddingHorizontal: 10 }}>
                        <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid' }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>Recibido Conforme</Text>
                        </View>
                        <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderTopStyle: 'solid',marginTop:30 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>Aclaracion de Firma</Text>
                        </View>
                    </Columna>


                </Fila>
            </Page>
        </Document>
    )
}

const Field = ({ label, text }) => {
    return (
        <View style={styles.field}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <Text style={styles.fieldText}>{text}</Text>
        </View>
    )
}