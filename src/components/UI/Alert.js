/**
 * @flow
 * @format
 */

import * as React from 'react'
import { StyleSheet } from 'react-native'
import { common } from '../../util/common'
import Container from '../UI/Container'

type Props = {
    msg: string,
    color: string
}

const Alert = (props: Props) => {
    const { msg, color } = props

    return (
        <Container style={{ ...styles.container, backgroundColor: color }}>
            <Text style={styles.text}>{msg}</Text>
        </Container >
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 5,
        borderRadius: 5,
        padding: 10
    },
    text: {
        color: common.colors.white
    }
})

export default Alert