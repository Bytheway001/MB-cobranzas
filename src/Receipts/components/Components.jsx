import React from 'react';
import { StyleSheet, View,Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    col:{
        flexDirection:'column'
    },
    field: {
        width: '25%',
        marginVertical: 7,
        padding:3,
       

    },
    fieldLabel: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 10,
        marginBottom: 5,
        color: 'gray'
    },
    fieldText: {
        fontSize: 12,
        
        fontStyle: 'italic'
    },
    
})
export const Fila =({children,style})=>(
    <View style={{...styles.row,...style}}>
        {children}
    </View>
)

export const Columna = ({children,style})=>(
    <View style={{...styles.col,...style}}>
        {children}
    </View>
)


export const Field = ({ label, text, style }) => {
    return (
        <View style={{ ...styles.field, ...style }}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <Text style={styles.fieldText}>{text}</Text>
        </View>
    )
}