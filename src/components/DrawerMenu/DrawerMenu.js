import * as React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useDispatch } from 'react-redux'
import { resetAuthentication } from '../../redux/ducks/authentication'
import { routeFix } from '../../util/helpers'
import { common } from '../../util/common'
import { Container, Text } from '../UI'


const DrawerMenu = () => {
    const dispatch = useDispatch()

    return (
        <Container style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => routeFix('dashboard')}
                hitSlop={styles.textHitSlop}>
                <Text style={styles.text}>Home</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => routeFix('geolocation')}
                hitSlop={styles.textHitSlop}>
                <Text style={styles.text}>Geolocalização</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => routeFix('collect')}
                hitSlop={styles.textHitSlop}>
                <Text style={styles.text}>Coleta de Dados</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => dispatch(resetAuthentication())}
                hitSlop={styles.textHitSlop}>
                <Text style={styles.text}>Logout</Text>
            </TouchableWithoutFeedback>
        </Container>
    )
}

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