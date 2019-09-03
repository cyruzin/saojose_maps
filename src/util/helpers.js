// @flow

import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'


// Go to a new scene without duplication.
// This is a workaround.
export function routeFix(sceneKey: string, props: Object = {}): void {
  if (Actions.currentScene === sceneKey) {
    return
  }
  Actions.push(sceneKey, props)
}

// Close the application if it is in the root scene.
// This is a workaround.
export function onBackPress(): boolean {
  if (Actions.state.index === 0 && Actions.currentScene === 'collectForm') {
    Actions.replace('dashboard')
    return true
  }

  if (Actions.state.index === 0 && Actions.currentScene === 'collectList') {
    Actions.replace('dashboard')
    return true
  }

  if (Actions.state.index === 0) {
    return false
  }

  Actions.pop()
  return true
}

// Check if the JTW Token has expired and redirects
// to the login screen.
export function checkTokenExpiration(): void {
  AsyncStorage.getItem('token').then((value) => {
    if (value !== null) {
      const data = JSON.parse(value)
      if (data.userData.expires < new Date().getTime() / 1000) {
        clearState()
        Actions.reset('login')
      }
    }
  })
}

// Check if the JTW Token has expired and redirects
// to the main menu screen.
export function loadState(): boolean | void {
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

// Remove the token from the storage.
export function clearState(): void {
  AsyncStorage.removeItem('token')
}
