/**
 * @flow
 * @format
 */

import * as React from 'react'
import { Text as RNText } from 'react-native'

type Props = {
    style?: Object,
    children: React.Node
}

const Text = (props: Props) => {
  const { style, children } = props
  return (
    <RNText style={style} {...props}>
      {children}
    </RNText>
  )
}

Text.defaultProps = {
  style: {}
}

export default Text
