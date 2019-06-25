/**
 * @flow
 * @format
 */

import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import common from '../../util/common'

type Props = {
    icon: string,
    style?: Object,
    onPress: () => void
}

const FloatButton = (props: Props) => {
  const { onPress, style, icon } = props
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, style]}
      underlayColor={common.colors.lightGray}
    >
      <Icon
                // $FlowFixMe
        name={icon}
        size={20}
        color={common.colors.white}
        style={styles.icon}
      />
    </TouchableHighlight>
  )
}

FloatButton.defaultProps = {
  style: {}
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 3,
    bottom: 30,
    right: 30,
    backgroundColor: common.colors.green,
    width: 50,
    height: 50,
    borderRadius: 50
  },
  icon: {
    textAlign: 'center'
  }
})

export default FloatButton
