import * as React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { checkAuthentication } from '../../redux/ducks/authentication'
import { Container, TextInput, Button } from '../../components/UI'

class Login extends React.Component {

    state = {
        login: '',
        password: ''
    }

    checkAuthentication = () => {
        let credentials = {
            login: this.state.login,
            password: this.state.password
        }
        this.props.actions.checkAuthentication(credentials)
    }

    render() {
        return (
            <Container>
                <View style={styles.input}>
                    <TextInput onChangeText={(login) => this.setState({ login })} />
                    <TextInput onChangeText={(password) => this.setState({ password })} />
                    <Button title='Login' onPress={() => this.checkAuthentication()} />
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 10
    }
})

const mapStateToProps = state => ({
    authentication: state.authentication
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        checkAuthentication
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)