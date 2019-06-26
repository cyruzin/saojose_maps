/**
 * @flow
 * @format
 */

import * as React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import common from '../../util/common'

type Props = {
    style?: Object,
    children?: React.Node,
    onPress: () => void
}

const ButtonCard = (props: Props) => {
  const { onPress, style, children } = props
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.card, style]}
      underlayColor={common.colors.lightGray}
    >
      {children}
    </TouchableHighlight>
  )
}

ButtonCard.defaultProps = {
  style: {},
  children: <></>
}

const styles = StyleSheet.create({
  card: {
    alignContent: 'center',
    backgroundColor: common.colors.green,
    height: 150,
    justifyContent: 'center',
    borderRadius: 5
  }
})

export default ButtonCard
