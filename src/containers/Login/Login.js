/**
 * @flow
 * @format
 */

import React from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AsyncStorage from '@react-native-community/async-storage'
import { Actions } from 'react-native-router-flux'
import jwtDecode from 'jwt-decode'

import { checkAuthentication } from '../../redux/ducks/authentication'
import common from '../../util/common'

import type { State, Props } from '../../types/Login'

import {
  Container,
  TextInput,
  Button,
  Text
} from '../../components/UI'

import Logo from '../../assets/icon.png'

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      login: '',
      password: '',
      opacity: 0,
    }
  }

  componentDidMount(): void {
    // $FlowFixMe
    this.opacityTime = setTimeout(() => {
      this.setState({ opacity: 100 })
    }, 300)
  }

  componentDidUpdate(): void {
    const { authentication } = this.props
    if (authentication.authorized) {
      const userData = jwtDecode(authentication.token)

      AsyncStorage.setItem(
        'token',
        JSON.stringify({
          ...authentication,
          userData,
        })
      )
      Actions.reset('drawerMenu')
    }
  }

  componentWillUnmount(): void {
    // $FlowFixMe
    if (this.opacityTime) {
      clearTimeout(this.opacityTime)
    }
  }

  checkAuthentication = (): void => {
    const { login, password } = this.state
    const { actions } = this.props
    const credentials = {
      login: login.trim(),
      password: password.trim(),
    }
    actions.checkAuthentication(credentials)
  };

  render() {
    const { authentication } = this.props
    const { opacity } = this.state
    const { fetch, error } = authentication

    return (
      <Container style={styles.container}>
        <View style={{ ...styles.inputBox, opacity }}>
          <View style={styles.imageBox}>
            <Image style={styles.image} source={Logo} />
            <Text style={styles.title}>SÃO JOSÉ MAPAS</Text>
          </View>

          {!!error && <Text style={styles.errorMsg}>{error}</Text>}

          <TextInput
            onChangeText={(login) => this.setState({ login })}
            placeholder="Usuário"
            placeholderTextColor={common.colors.lightGray}
            selectionColor={common.colors.green}
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            onChangeText={(password) => this.setState({ password })}
            placeholder="Senha"
            placeholderTextColor={common.colors.lightGray}
            selectionColor={common.colors.green}
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
          />

          <Button
            title={!fetch ? 'LOGIN' : 'CARREGANDO...'}
            onPress={() => this.checkAuthentication()}
            style={styles.button}
          />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: common.colors.dark,
  },
  title: {
    fontSize: 26,
    opacity: 50,
    color: common.colors.white,
    textAlign: 'center',
    marginTop: 15,
  },
  errorMsg: {
    marginBottom: 20,
    color: common.colors.red,
    textAlign: 'center',
  },
  inputBox: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    marginBottom: 20,
    borderColor: common.colors.green,
    color: common.colors.white,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 15
  },
  button: {
    marginTop: 30,
    borderRadius: 50,
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  image: {
    width: 100,
    height: 100,
  },
})

const mapStateToProps = (state) => ({
  authentication: state.authentication,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      checkAuthentication,
    },
    dispatch
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
