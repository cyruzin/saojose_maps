import React from 'react'
import { View, StyleSheet } from 'react-native'

const Container = props => (
    <View style={[styles.container, props.style]}>
        {props.children}
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})

export default Container