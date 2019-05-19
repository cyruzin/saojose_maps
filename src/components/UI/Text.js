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
    <RNText style={[props.style]}>
        {props.children}
    </RNText>
)

// const styles = StyleSheet.create({
//     text: {
//         fontFamily: 'OpenSansCondensed-Light'
//     }
// })

export default Text