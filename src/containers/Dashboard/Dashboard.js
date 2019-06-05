import * as React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Container, Text } from '../../components/UI'

class Dashboard extends React.Component {

    render() {

        return (
            <Container style={styles.container}>
                <Text>Logado</Text>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#545454'
    }
})

export default Dashboard