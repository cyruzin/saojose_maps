/**
 * @flow
 * @format
 */

import * as React from 'react'
import { Button as RNButton, StyleSheet } from 'react-native'

type Props = {
    title: string,
    onPress: () => void
}

const Button = (props: Props) => <RNButton title={props.title} onPress={props.onPress} {...props} />

export default Button