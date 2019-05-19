import * as React from 'react'
import { StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Container, TextInput, Button } from '../../components/UI'

class Login extends React.Component {

    render() {
        return (
            <Container>
                <TextInput />
                <TextInput />
                <Button title='Login' onPress={() => null} />
            </Container>
        )
    }
}

export default Login