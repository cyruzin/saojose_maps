import React, { Component } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import store from './src/redux'
import { Container } from './src/components/UI'

// @flow
type Props = {}

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Text>Welcome to React Native!</Text>
          <Text>To get started, edit App.js</Text>
        </Container>
      </Provider>
    )
  }
}
