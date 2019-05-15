/**
 * @flow 
 * @format
 */

import * as React from 'react'
import { View, StyleSheet } from 'react-native'

type Props = {
    style?: Object,
    children: React.Node
}

const Container = (props: Props) => (
    <View style={[styles.container, props.style]}>
        {props.children}
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Container