import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'

/**
 * Go to a new scene without duplication.
 * This is a workaround.
 *
 * @function routeFix
 *
 * @param {string} sceneKey - Scene key
 * @param {Object} props - Props
 */
export const routeFix = (sceneKey, props = {}) => {
  if (Actions.currentScene === sceneKey) {
    return
  }
  Actions.push(sceneKey, props)
}

/**
 * Close the application if it is in the root scene.
 * This is a workaround.
 *
 * @function onBackPress
 * @returns {bool}
 *
 */
export const onBackPress = () => {
  if (Actions.state.index === 0) {
    return false
  }
  Actions.pop()
  return true
}

export const loadState = () => {
  AsyncStorage.getItem('token').then((value) => {
    if (value !== null) {
      const data = JSON.parse(value)
      if (data.userData.expires < new Date().getTime() / 1000) {
        clearState()
        return false
      }
      if (data.authorized) {
        Actions.reset('drawerMenu')
      }
    }
    return false
  })
}

export const clearState = () => AsyncStorage.removeItem('token')
