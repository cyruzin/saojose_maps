import * as React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { resetAuthentication } from '../../redux/ducks/authentication'
import { routeFix, clearState } from '../../util/helpers'
import common from '../../util/common'
import { Container, Text } from '../UI'

const DrawerMenu = () => {
  const dispatch = useDispatch()

  return (
    <Container style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Actions.replace('dashboard')}
        hitSlop={styles.textHitSlop}
      >
        <View style={styles.textContainer}>
          <Icon
            style={styles.icon}
            name="home"
            size={20}
            color={common.colors.white}
          />
          <Text style={styles.text}>Home</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => routeFix('collectList')}
        hitSlop={styles.textHitSlop}
      >
        <View style={styles.textContainer}>
          <Icon
            style={styles.icon}
            name="list"
            size={20}
            color={common.colors.white}
          />
          <Text style={styles.text}>Listar Coletas</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* <TouchableWithoutFeedback
        onPress={() => routeFix('collect')}
        hitSlop={styles.textHitSlop}
      >
        <View style={styles.textContainer}>
          <Icon
            style={styles.icon}
            name="map-pin"
            size={20}
            color={common.colors.white}
          />
          <Text style={styles.text}>Coleta de Dados</Text>
        </View>
      </TouchableWithoutFeedback> */}

      <TouchableWithoutFeedback
        onPress={() => {
          clearState()
          dispatch(resetAuthentication())
          Actions.reset('login')
        }}
        hitSlop={styles.textHitSlop}
      >
        <View style={styles.textContainer}>
          <Icon
            style={styles.icon}
            name="sign-out"
            size={20}
            color={common.colors.white}
          />
          <Text style={styles.text}>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: common.colors.dark
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    color: common.colors.white,
    marginLeft: 10,
    marginBottom: 30
  },
  textHitSlop: {
    top: 20,
    left: 20,
    bottom: 20,
    right: 20
  }
})

export default DrawerMenu
