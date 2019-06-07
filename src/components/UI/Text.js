/**
 * @flow
 * @format
 */

import * as React from 'react'
import { Text as RNText, StyleSheet } from 'react-native'

type Props = {
    style?: Object,
    children: React.Node
}

const Text = (props: Props) => (
    <RNText style={props.style} {...props}>
        {props.children}
    </RNText>
)

export default Text