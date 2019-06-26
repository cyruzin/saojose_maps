/**
 * @flow
 * @format
 */

import React from 'react'
import { TextInput as RNTextInput } from 'react-native'

type Props = {
    style?: Object,
    value: string,
    onChangeText: () => void
}

const TextInput = (props: Props) => {
  const { style, onChangeText, value } = props
  return (
    <RNTextInput
      style={style}
      onChangeText={onChangeText}
      value={value}
      {...props}
    />
  )
}

TextInput.defaultProps = {
  style: {}
}

export default TextInput
