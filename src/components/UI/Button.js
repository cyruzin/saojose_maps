/**
 * @flow
 * @format
 */

import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'

import common from '../../util/common'

import Text from './Text'

type Props = {
  title: string,
  style?: Object,
  disabled?: boolean,
  onPress: () => void
}

const Button = (props: Props) => {
  const {
    onPress, style, title, disabled
  } = props
  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style]}
      underlayColor={common.colors.lightGray}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  )
}

Button.defaultProps = {
  disabled: false,
  style: {}
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    backgroundColor: common.colors.green,
    height: 50
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 15,
    color: common.colors.white,
    fontWeight: 'bold'
  }
})

export default Button
