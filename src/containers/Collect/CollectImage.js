/**
 * @flow
 * @format
 */

import React from 'react'
import {
  Image,
  StyleSheet
} from 'react-native'

import common from '../../util/common'

import type { Props } from '../../types/Collect/CollectImage'

import { Container, Text } from '../../components/UI'

export default function CollectImage(props: Props) {
  const { img1, img2, img3 } = props
  return (
    <Container style={styles.container}>
      {img1 && <Image style={styles.image} source={{ uri: img1 }} />}

      {img2 && <Image style={styles.image} source={{ uri: img2 }} />}

      {img3 && <Image style={styles.image} source={{ uri: img3 }} />}

      {!img1 && !img2 && !img3 && <Text>Não existe imagens para esta coleta</Text>}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: common.colors.dark
  },
  imageBox: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200
  },
  noResults: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: common.colors.white
  }
})
