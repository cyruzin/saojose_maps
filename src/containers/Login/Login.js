import * as React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { checkAuthentication } from '../../redux/ducks/authentication'
import { Container, TextInput, Button, Text } from '../../components/UI'

class Login extends React.Component {

    state = {
        login: '',
        password: ''
    }

    checkAuthentication = () => {
        let credentials = {
            login: this.state.login.trim(),
            password: this.state.password.trim()
        }
        this.props.actions.checkAuthentication(credentials)
    }

    render() {
        const { authorized, error } = this.props.authentication
        return (
            <Container style={styles.container}>
                {authorized && Actions.dashboard()}
                <View style={styles.inputBox}>
                    <Text style={styles.title}>São José Mapas</Text>
                    {!!error && <Text style={styles.errorMsg}>{error}</Text>}
                    <TextInput
                        onChangeText={(login) => this.setState({ login })}
                        placeholder='Usuário'
                        placeholderTextColor='#DCDCDC'
                        selectionColor='#9ACD32'
                        autoCapitalize='none'
                        style={styles.input} />

                    <TextInput
                        onChangeText={(password) => this.setState({ password })}
                        placeholder='Senha'
                        placeholderTextColor='#DCDCDC'
                        selectionColor='#9ACD32'
                        secureTextEntry
                        autoCapitalize='none'
                        style={styles.input} />

                    <Button
                        title='LOGIN'
                        onPress={() => this.checkAuthentication()}
                        style={styles.button} />
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#545454'
    },
    title: {
        fontSize: 36,
        opacity: 50,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 50
    },
    errorMsg: {
        marginBottom: 20,
        color: '#FF0000',
        textAlign: 'center'
    },
    inputBox: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 20,
        borderColor: '#9ACD32',
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 15,
    },
    button: {
        marginTop: 30,
        borderRadius: 50
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