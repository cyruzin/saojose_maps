/**
 * @flow
 * @format
 */

import * as React from 'react'
import { View, StyleSheet } from 'react-native'

type Props = {
    style?: Object,
    children: React.Node
}

const Container = (props: Props) => {
  const { style, children } = props
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

Container.defaultProps = {
  style: {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Container
