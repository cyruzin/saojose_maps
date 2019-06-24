/**
 * @flow
 * @format
 */

import * as React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { common } from '../../util/common'

type Props = {
    style?: Object,
    children?: React.Node,
    onPress: () => void
}

const ButtonCard = (props: Props) => (
    <TouchableHighlight
        onPress={props.onPress}
        style={{ ...props.style, ...styles.card }}
        underlayColor={common.colors.lightGray}>
        {props.children}
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    card: {
        alignContent: 'center',
        backgroundColor: common.colors.green,
        height: 150,
        justifyContent: 'center',
        borderRadius: 5
    }
})

export default ButtonCard