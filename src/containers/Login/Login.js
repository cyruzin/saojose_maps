/**
 * @flow
 * @format
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'
import { checkAuthentication } from '../../redux/ducks/authentication'
import { common } from '../../util/common'
import { Container, TextInput, Button, Text } from '../../components/UI'

type Credentials = {
    login: string,
    password: string
}

type State = {
    login: string,
    password: string,
    opacity: 90
}

type Props = {
    authentication: {
        authorized: boolean,
        token: string,
        error: string
    },
    actions: {
        checkAuthentication: (credentials: Credentials) => any
    }
}

class Login extends React.Component<Props, State> {

    state = {
        login: '',
        password: '',
        opacity: 0
    }

    componentDidMount () {
        this.opacityTime = setTimeout(() => {
            this.setState({ opacity: 100 })
        }, 300)
    }

    componentWillUnmount () {
        if (this.opacityTime) clearTimeout(this.opacityTime)
    }

    checkAuthentication = () => {
        let credentials = {
            login: this.state.login.trim(),
            password: this.state.password.trim()
        }
        this.props.actions.checkAuthentication(credentials)
            .then(() => {
                let userData = jwtDecode(this.props.authentication.token)

                AsyncStorage.setItem(
                    'token',
                    JSON.stringify({
                        ...this.props.authentication,
                        userData
                    })
                )

                Actions.reset('drawerMenu')
            })
    }

    render () {
        const { opacity } = this.state
        const { authorized, error } = this.props.authentication

        return (
            <Container style={styles.container}>
                <View style={{ ...styles.inputBox, opacity: opacity }}>
                    <Text style={styles.title}>São José Mapas</Text>

                    {!!error && <Text style={styles.errorMsg}>{error}</Text>}

                    <TextInput
                        onChangeText={(login) => this.setState({ login })}
                        placeholder='Usuário'
                        placeholderTextColor={common.colors.lightGray}
                        selectionColor={common.colors.green}
                        autoCapitalize='none'
                        style={styles.input} />

                    <TextInput
                        onChangeText={(password) => this.setState({ password })}
                        placeholder='Senha'
                        placeholderTextColor={common.colors.lightGray}
                        selectionColor={common.colors.green}
                        secureTextEntry
                        autoCapitalize='none'
                        style={styles.input} />

                    <Button
                        title='LOGIN'
                        onPress={() => this.checkAuthentication()}
                        style={styles.button} />
                </View>
            </ Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: common.colors.dark
    },
    title: {
        fontSize: 36,
        opacity: 50,
        fontWeight: 'bold',
        color: common.colors.white,
        textAlign: 'center',
        marginBottom: 50
    },
    errorMsg: {
        marginBottom: 20,
        color: common.colors.red,
        textAlign: 'center'
    },
    inputBox: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 20,
        borderColor: common.colors.green,
        color: common.colors.white,
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)