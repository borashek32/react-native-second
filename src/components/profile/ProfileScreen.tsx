import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useAppSelector} from "../../common/hooks/use-app-selector"
import {selectProfile} from "../auth/auth.selectors"


export const ProfileScreen = () => {

  const profile = useAppSelector(selectProfile)

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>User Information:</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Email: {profile?.email}</Text>

          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../../assets/img/edit.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Password: </Text>

          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../../assets/img/edit.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Phone: {profile?.phoneNumber}</Text>

          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../../assets/img/edit.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Name: {profile?.displayName}</Text>

          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../../assets/img/edit.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Avatar address: {profile?.photoURL}</Text>

          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../../assets/img/edit.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 50,
    display: 'flex',
    alignItems: 'center'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 30
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: 20,
    paddingLeft: 20
  },
  text: {
    fontSize: 20
  }
})