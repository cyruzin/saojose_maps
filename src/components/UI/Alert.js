/**
 * @flow
 * @format
 */

import * as React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'

import common from '../../util/common'

import Container from './Container'
import Text from './Text'

type Props = {
  msg: string,
  color: string,
  onPress?: () => any
}

const Alert = (props: Props) => {
  const { msg, color, onPress } = props
  return (
    <Container style={{ ...styles.container, backgroundColor: color }}>
      <TouchableHighlight onPress={onPress}>
        <Text style={styles.text}>{msg}</Text>
      </TouchableHighlight>
    </Container>
  )
}

Alert.defaultProps = {
  onPress: () => false
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 5,
    padding: 10,
    zIndex: 3
  },
  text: {
    color: common.colors.white
  }
})

export default Alert
