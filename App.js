import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppNavigator } from './src/navigator/AppNavigator'
import { Text, View } from 'react-native'
import { RootNavigator } from './src/navigator/RootNavigator'
import { Provider } from 'react-redux'
import store from './src/redux/Store/store'

const App = () => {
  return (
    <Provider store={store}>

      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App
