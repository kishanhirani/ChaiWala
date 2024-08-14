import { ActivityIndicator, FlatList, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { addTea, addUpdateTea, fetchTeas, updateTea } from '../../redux/Actions/teaActions'
import Loader from '../../Components/Loader'
import moment from 'moment'
import TextInput from '../../Components/TextInput'
import Button from '../../Components/Button'
import CheckBox from '@react-native-community/checkbox'
import Utils from '../../helper/utils'
const Home = () => {

  const { teas, page, totalPage, isLoading, addLoading, updateLoading } = useSelector((state) => state.tea)
  const dispatch = useDispatch()
  const flatlistRef = useRef(null)
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [count, setCount] = useState('')
  const [editCount, setEditCount] = useState('')
  const [selectedItem, setSelectedItem] = useState({})
  const [countError, setCountError] = useState('')
  const countRef = useRef(null)
  console.log('teas', teas)
  const [slot, setSlot] = useState(1)
  const [mode, setMode] = useState(0)
  const [edit, setEdit] = useState(false)
  const formattedDate = teas?.length > 0 && moment(teas[0].createdAt).format('D/M/YYYY');

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

  const handleOnRequestClose = () => {
    setModalVisible(false)
  }
  const handleOnRequestCloseEdit = () => {
    setUpdateModalVisible(false)
  }

  const renderItem = ({ item, index }) => {
    const date = moment.utc(item.createdAt)
    const formatedDate = moment(date).format('ddd DD MMM, YYYY')
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.dateText}>{formatedDate}</Text>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.teaButton}
            onPress={() => {
              setSelectedItem(item._id)
              setUpdateModalVisible(true)
              setEditCount(item.count_1)
              setSlot(1)
              setEdit(true)
            }}>
            <Text style={styles.itemTeaText}>Morning: {item.count_1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item._id)
              setUpdateModalVisible(true)
              setSlot(2)
              setEditCount(item.count_2)
              setEdit(true)
            }}
            style={styles.teaButton}
          >
            <Text style={styles.itemTeaText}>Afternoon: {item.count_2}</Text>
          </TouchableOpacity>
        </View>


      </View>
    )
  }

  const handleAddTea = () => {
    let isValid = true
    if (Utils.isValueStringNull(count)) {
      setCountError("Count is required.")
      isValid = false
    }
    if (isValid) {
      let body = {
        count: +count,
        slot: slot,
      }
      console.log('body', body)
      dispatch(addTea(body, (isSuccess) => {
        if (isSuccess) {
          setModalVisible(false)
          setCount('')
          setSlot(1)
          fetchTeaData(1)
        }
      }))
    }
  }
  const handleUpdateTea = (item) => {
    let isValid = true
    if (Utils.isValueStringNull(editCount)) {
      setCountError("Count is required.")
      isValid = false
    }
    if (isValid) {
      let body = {
        id: selectedItem,
        mode: mode.toString(),
        count: +editCount,
        slot: slot,
      }
      console.log('body', selectedItem)
      dispatch(updateTea(body, (isSuccess) => {
        if (isSuccess) {
          setUpdateModalVisible(false)
          setEditCount('')
          setSlot(1)
          fetchTeaData(1)
        }
      }))
    }
  }
  return (
    <View style={styles.container}>
      <Loader visible={(page === 1 && teas.length === 0 ? isLoading : false)} />
      <StatusBar backgroundColor={Colors.dark_liver} barStyle={'light-content'} />

      <View style={styles.header}>
        <Icon onPress={() => handleLogout()} name='logout' size={30} color={Colors.wheat} />
        <Text style={{ color: Colors.wheat, fontSize: TextFontSize.size_22, fontFamily: AppFonts.bold }}>Home</Text>
        {formattedDate != new Date().toLocaleDateString()
          ? <Icon1 onPress={() => setModalVisible(true)} name='add-circle-outline' size={30} color={Colors.wheat} />
          : <Icon1 onPress={() => setModalVisible(true)} name='add-circle-outline' size={30} color={Colors.dark_liver} />
        }
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
      <Modal
        visible={modalVisible}
        onRequestClose={() => handleOnRequestClose()}
        transparent={true}
      >
        <TouchableOpacity onPress={() => handleOnRequestClose()} activeOpacity={1} style={styles.modalContainer}>
          <StatusBar barStyle={'light-content'} backgroundColor={"#00000040"} />
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.preventDefault()} style={styles.modalContentContainer}>
            <Loader visible={addLoading} />

            <Text style={styles.modalHeader}>Add Tea</Text>

            <TextInput
              onChangeText={(text) => {
                setCount(text)
                setCountError("")
              }}
              maxLength={2}
              value={count}
              placeholder={"Count"}
              keyboardType={'numeric'}
              autoCapitalize='none'
              error={countError}
            />
            <View style={styles.slotView}>
              <Text style={styles.slotHeading}>Select Slot</Text>
              <View style={styles.checkboxView}>
                <View style={styles.checkboxcomponent}>
                  <Text style={styles.checkboxText}>Morning</Text>
                  <CheckBox
                    disabled={false}
                    value={slot === 1}
                    onValueChange={() => setSlot(1)}
                    tintColors={{ false: Colors.black, true: Colors.dark_liver }}
                  />
                </View>
                <View style={styles.checkboxcomponent}>
                  <Text style={styles.checkboxText}>Afternoon</Text>
                  <CheckBox
                    disabled={false}
                    value={slot === 2}
                    onValueChange={() => setSlot(2)}
                    tintColors={{ false: Colors.black, true: Colors.dark_liver }}
                  />
                </View>

              </View>
            </View>

            <View style={{ flex: 0.8 }}></View>
            <Button title={'Add'} onPress={() => handleAddTea()} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={updateModalVisible}
        onRequestClose={() => handleOnRequestCloseEdit()}
        transparent={true}
      >
        <TouchableOpacity onPress={() => handleOnRequestCloseEdit()} activeOpacity={1} style={styles.modalContainer}>
          <StatusBar barStyle={'light-content'} backgroundColor={"#00000040"} />
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.preventDefault()} style={styles.modalContentContainer}>
            <Loader visible={updateLoading} />

            <Text style={styles.modalHeader}>Update Tea</Text>

            <TextInput
              onChangeText={(text) => {
                setEditCount(text)
                setCountError("")
              }}
              maxLength={2}
              value={editCount.toString()}
              placeholder={"Count"}
              keyboardType={'numeric'}
              autoCapitalize='none'
              error={countError}
            />
            <View style={styles.slotView}>
              <Text style={styles.slotHeading}>Select Slot</Text>
              <View style={[styles.checkboxView, { justifyContent: "flex-start", paddingLeft: ScaleSize.spacing_15 }]}>
                {
                  slot === 1 &&
                  <View style={styles.checkboxcomponent}>
                    <Text style={styles.checkboxText}>Morning</Text>
                    <CheckBox
                      disabled={false}
                      value={slot === 1}
                      onValueChange={() => setSlot(1)}
                      tintColors={{ false: Colors.black, true: Colors.dark_liver }}
                    />
                  </View>
                }
                {
                  slot === 2 &&

                  <View style={styles.checkboxcomponent}>
                    <Text style={styles.checkboxText}>Afternoon</Text>
                    <CheckBox
                      disabled={false}
                      value={slot === 2}
                      onValueChange={() => setSlot(2)}
                      tintColors={{ false: Colors.black, true: Colors.dark_liver }}
                    />
                  </View>

                }
              </View>
            </View>
            <View style={styles.slotView}>

              <Text style={styles.slotHeading}>Select Mode</Text>
              <View style={styles.checkboxView}>
                <View style={styles.checkboxcomponent}>

                  <Text style={styles.checkboxText}>Update</Text>
                  <CheckBox
                    disabled={false}
                    value={mode === 0}
                    onValueChange={(newValue) => setMode(0)}
                    tintColors={{ false: Colors.black, true: Colors.dark_liver }}
                  />
                </View>
                <View style={styles.checkboxcomponent}>
                  <Text style={styles.checkboxText}>Add</Text>
                  <CheckBox
                    disabled={false}
                    value={mode === 1}
                    onValueChange={(newValue) => setMode(1)}
                    tintColors={{ false: Colors.black, true: Colors.dark_liver }}
                  />
                </View>

              </View>
            </View>

            <Button title={'Update'} onPress={() => handleUpdateTea()} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    width: '85%',
    alignSelf: 'center',
    marginBottom: ScaleSize.spacing_20,
    borderBottomWidth: 1,
    borderStyle: 'dashed'
  },
  dateText: {
    color: Colors.dark_liver,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.size_20,
    marginBottom: ScaleSize.spacing_10
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContentContainer: {
    width: "80%",
    height: 400,
    borderRadius: ScaleSize.spacing_20,
    backgroundColor: Colors.wheat,
    paddingHorizontal: ScaleSize.spacing_30
  },
  modalHeader: {
    color: Colors.dark_liver,
    alignSelf: "center",
    paddingVertical: ScaleSize.spacing_15,
    fontSize: TextFontSize.size_22,
    fontFamily: AppFonts.semi_bold,
    marginBottom: ScaleSize.spacing_10
  },
  buttonView: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-around",
    paddingVertical: ScaleSize.spacing_10
  },
  teaButton: {
    backgroundColor: Colors.dark_liver,
    paddingHorizontal: ScaleSize.spacing_25,
    paddingVertical: ScaleSize.spacing_10,
    borderRadius: ScaleSize.spacing_10,
  },
  checkboxView: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
  },
  checkboxcomponent: {
    flexDirection: "row",
    justifyContent: "center",
    gap: ScaleSize.spacing_5,
    alignItems: "center",
  },
  checkboxText: {
    fontSize: TextFontSize.size_16,
    color: Colors.dark_liver,
    fontFamily: AppFonts.medium,
    bottom: 2,
  },
  slotHeading: {
    color: Colors.dark_liver,
    fontSize: TextFontSize.size_18,
    fontFamily: AppFonts.semi_bold,
    marginBottom: ScaleSize.spacing_5
  },
  slotView: {
    marginBottom: ScaleSize.spacing_15
  }

})