import {StyleSheet, Text, View} from "react-native"
import {auth} from "../firebase"


export const ProfileScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Information:</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>Password: </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: 50
  }
})