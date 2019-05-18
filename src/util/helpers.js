import { Actions } from 'react-native-router-flux'

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