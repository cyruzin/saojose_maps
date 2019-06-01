/**
 * @flow 
 * @format
 */

import React, { Component } from 'react'
import { Text, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import store from './src/redux'
import Router from './src/components/Router/Router'
import { Container } from './src/components/UI'

type Props = {}

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <StatusBar backgroundColor='#545454' />
          <Router />
        </Container>
      </Provider >
    )
  }
}
