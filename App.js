/**
 * @flow 
 * @format
 */

import React, { Component } from 'react'
import { Text, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import store from './src/redux'
import { common } from './src/util/common'
import Router from './src/components/Router/Router'
import { Container } from './src/components/UI'

type Props = {}

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <StatusBar backgroundColor={common.colors.dark} />
          <Router />
        </Container>
      </Provider >
    )
  }
}
