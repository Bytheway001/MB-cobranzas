import React from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    col:{
        flexDirection:'column'
    }
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