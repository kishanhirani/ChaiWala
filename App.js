import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppNavigator } from './src/navigator/AppNavigator'
import { Text, View } from 'react-native'
import { RootNavigator } from './src/navigator/RootNavigator'
import { Provider } from 'react-redux'
import store from './src/redux/Store/store'
import { navigationRef } from './src/helper/NavigationHelper'
import Loader from './src/Components/Loader'
import Toast from 'react-native-toast-message'
import { toastConfig } from './src/helper/ToastConfig'

const App = () => {
  return (
    <Provider store={store}>

      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  )
}

export default App
