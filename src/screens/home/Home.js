import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../../resource/Colors'
import SBar from '../../Components/SBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { TextFontSize } from '../../resource/TextFontsize'
import { AppFonts } from '../../resource/AppFonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { reset } from '../../helper/NavigationHelper'
import { ScaleSize } from '../../resource/ScaleSize'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTeas } from '../../redux/Actions/teaActions'
import Loader from '../../Components/Loader'
const Home = () => {

  const { teas, page, totalPage, isLoading } = useSelector((state) => state.tea)
  const dispatch = useDispatch()
  const flatlistRef = useRef(null)
  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    fetchTeaData(page)
  }, [])


  const fetchTeaData = (page) => {
    let body = {
      page: page
    }
    dispatch(fetchTeas(body))
  }

  const onEndReached = () => {
    console.log(' out',)
    if (teas.length > 0 && page < totalPage) {
      console.log(' in',)
      fetchTeaData(page + 1);
    }
    // setTimeout(() => {
    //   flatlistRef.current.scrollToEnd({ animated: true });
    // }, 300);
  }

  const onRefresh = () => {
    fetchTeaData(1)
  }


  const handleLogout = async () => {
    await AsyncStorage.clear()
    reset('authNavigator', {
      state: {
        routes: [
          {
            name: "Login",
            params: {},
          },
        ],
      },
    })
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={{ color: 'white' }}>{item._id}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Loader visible={(page === 1 && teas.length === 0 ? isLoading : false)} />
      <StatusBar backgroundColor={Colors.dark_liver} barStyle={'light-content'} />

      <View style={styles.header}>
        <Icon onPress={() => handleLogout()} name='logout' size={30} color={Colors.wheat} />
        <Text style={{ color: Colors.wheat, fontSize: TextFontSize.size_22, fontFamily: AppFonts.bold }}>Home</Text>
        <Icon1 onPress={() => handleLogout()} name='add-circle-outline' size={30} color={Colors.wheat} />
      </View>

      <FlatList
        data={teas}
        ref={flatlistRef}
        renderItem={renderItem}
        style={{ marginTop: ScaleSize.spacing_30 }}
        onEndReached={() => onEndReached()}
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
        ListFooterComponent={page && (page < totalPage) && teas.length > 0 &&
          (
            <ActivityIndicator
              style={{ marginBottom: ScaleSize.spacing_30 }}
              size={"large"}
              color={Colors.dark_liver}
            />
          )}
      />


    </View >
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.wheat,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ScaleSize.spacing_25,
    backgroundColor: Colors.dark_liver,
    paddingVertical: ScaleSize.spacing_15
  },
  itemContainer: {
    backgroundColor: Colors.dark_liver,
    width: '85%',
    height: ScaleSize.spacing_80,
    alignSelf: 'center',
    marginBottom: ScaleSize.spacing_25,
    justifyContent: 'center',
    alignItems: "center"
  }
})