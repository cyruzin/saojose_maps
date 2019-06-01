/**
 * @flow
 * @format
 */

import * as React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { Text } from '../UI'

type Props = {
    title: string,
    style?: Object,
    onPress: () => void
}

const Button = (props: Props) => (
    <TouchableHighlight onPress={props.onPress} style={[styles.button, props.style]} underlayColor='#DCDCDC'>
        <Text style={styles.text}>{props.title}</Text>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    button: {
        alignContent: 'center',
        backgroundColor: '#9ACD32',
        height: 50
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 15,
        color: '#fff',
        fontWeight: 'bold'
    }
})

export default Button