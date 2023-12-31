import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import React from "react"
import {useAppDispatch} from "../common/hooks/use-app-dispatch"
import {authThunks} from "./auth/auth.slice"
import {useAppSelector} from "../common/hooks/use-app-selector"
import {selectEmail, selectUserName} from "./auth/auth.selectors"
import {RootStackParamList} from "../common/navigation/Navigation"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"


export const HomeScreen = () => {

  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const email = useAppSelector(selectEmail)
  const userName = useAppSelector(selectUserName)

  const handleLogOut = () => {
    dispatch(authThunks.handleLogOut())
      .then(() => navigation.navigate('Login'))
      .catch((error) => {
        Alert.alert("Error ", error)
      })}

  return (
    <View style={styles.container}>
      {userName
        ? <Text style={styles.title}>Welcome, {userName}</Text>
        : <Text style={styles.title}>Welcome</Text>
      }
      <Text>Email: {email}</Text>

      <View style={styles.itemsWrapper}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>{'Home'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>{'Profile'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Shop')}>
          <Text style={styles.buttonText}>{'Shop'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.buttonText}>{'Cart'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleLogOut}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: 50
  },
  title: {
    fontSize: 30
  },
  itemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    width: 250,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 20,
  }
})