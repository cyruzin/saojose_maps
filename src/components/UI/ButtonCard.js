/**
 * @flow
 * @format
 */

import * as React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { common } from '../../util/common'
import { Container } from '../UI'

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
        <Container>
            {props.children}
        </Container>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    card: {
        alignContent: 'center',
        backgroundColor: common.colors.green,
        height: 170,
        justifyContent: 'center',
        borderRadius: 5
    }
})

export default ButtonCard