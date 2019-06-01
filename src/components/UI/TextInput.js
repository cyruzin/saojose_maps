/**
 * @flow
 * @format
 */

import * as React from 'react'
import { TextInput as RNTextInput } from 'react-native'

type Props = {
    style?: Object,
    value?: string,
    onChangeText: () => void
}

const TextInput = (props: Props) => (
    <RNTextInput
        style={props.style}
        onChangeText={props.onChangeText}
        value={props.value}
        {...props} />
)

export default TextInput