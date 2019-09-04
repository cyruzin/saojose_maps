/**
 * @flow
 * @format
 */

import React from 'react'
import {
  Image,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'

import common from '../../util/common'
import { BASE_URL } from '../../util/constants'

import type { Props } from '../../types/Collect/CollectImage'

import { Container, Text } from '../../components/UI'

export default function CollectImage(props: Props) {
  const { img1, img2, img3 } = props
  return (
    <Container style={styles.container}>
      <ScrollView>
        <View style={styles.imageBox}>
          {img1 && <Image style={styles.image} source={{ uri: `${BASE_URL}/${img1}` }} />}

          {img2 && <Image style={styles.image} source={{ uri: `${BASE_URL}/${img2}` }} />}

          {img3 && <Image style={styles.image} source={{ uri: `${BASE_URL}/${img3}` }} />}

          {!img1 && !img2 && !img3 && <Text style={styles.noResults}>Não existem imagens para esta coleta</Text>}
        </View>
      </ScrollView>
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
    width: 400,
    height: 400,
    marginTop: 5,
    marginBottom: 20
  },
  noResults: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: common.colors.white
  }
})
