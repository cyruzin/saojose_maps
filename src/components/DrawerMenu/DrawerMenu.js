import * as React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { routeFix } from '../../util/helpers'
import { common } from '../../util/common'
import { Container, Text } from '../UI'

const DrawerMenu = () => (
    <Container style={styles.container}>
        <TouchableWithoutFeedback
            onPress={() => routeFix('dashboard')}
            hitSlop={styles.textHitSlop}>
            <Text style={styles.text}>Home</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
            onPress={() => console.log('Geolocalização')}
            hitSlop={styles.textHitSlop}>
            <Text style={styles.text}>Geolocalização</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
            onPress={() => routeFix('coleta')}
            hitSlop={styles.textHitSlop}>
            <Text style={styles.text}>Coleta de Dados</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
            onPress={() => console.log('Logout')}
            hitSlop={styles.textHitSlop}>
            <Text style={styles.text}>Logout</Text>
        </TouchableWithoutFeedback>
    </Container>
)

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: common.colors.dark
    },
    text: {
        fontSize: 18,
        color: common.colors.white,
        marginBottom: 30
    },
    textHitSlop: {
        top: 20,
        left: 20,
        bottom: 20,
        right: 20
    }
})

export default DrawerMenu