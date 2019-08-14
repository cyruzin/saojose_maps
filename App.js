import React, { PureComponent } from 'react'
import { StatusBar, Alert } from 'react-native'
import { Provider } from 'react-redux'
import { setJSExceptionHandler } from 'react-native-exception-handler'
import store from './src/redux'
import common from './src/util/common'
import Router from './src/components/Router/Router'
import { Container } from './src/components/UI'

setJSExceptionHandler((error, isFatal) => {
  Alert.alert('Error', error)
})

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <StatusBar backgroundColor={common.colors.dark} />
          <Router />
        </Container>
      </Provider>
    )
  }
}
