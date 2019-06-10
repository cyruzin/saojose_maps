/**
 * @flow
 * @format
 */

import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { common } from '../../util/common'
import { Text } from '../UI'

type Props = {
    title: string,
    style?: Object,
    onPress: () => void
}

const Button = (props: Props) => (
    <TouchableHighlight
        onPress={props.onPress}
        style={[styles.button, props.style]}
        underlayColor={common.colors.lightGray}>
        <Text style={styles.text}>{props.title}</Text>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    button: {
        alignContent: 'center',
        backgroundColor: common.colors.green,
        height: 50
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 15,
        color: common.colors.white,
        fontWeight: 'bold'
    }
})

export default Button