import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../resource/Colors'

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.primary} />

      {/* <Header title={"Home"} onPress={() => console.log("open drawer")} /> */}



      <Text style={{ alignSelf: "center", color: 'black', fontSize: 22, fontWeight: '700' }}>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  }
})