/**
 * @flow
 * @format
 */

import * as React from 'react'
import { TextInput as RNTextInput, StyleSheet } from 'react-native'

type Props = {
    style?: Object,
    value?: string,
    onChangeText: () => void
}

const TextInput = (props: Props) => (
    <RNTextInput
        style={[styles.border, props.style]}
        onChangeText={props.onChangeText}
        value={props.value}
        {...props} />
)

const styles = StyleSheet.create({
    border: {
        borderColor: '#000',
        borderWidth: 1,
    }
})

export default TextInput