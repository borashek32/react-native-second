import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {NavigationProp} from "@react-navigation/native"
import React from "react";
import {auth} from "../firebase"


type HomeScreenProps = {
  navigation: NavigationProp<any, 'Profile'>;
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => navigation.reset({ index: 0, routes: [{ name: "Login" }] }))
      .catch((error) => {
        console.log("Ошибка при выходе:", error);
      });
  }

  const Item = ({ navigation }: { navigation: NavigationProp<any, 'Profile'> }) => (
    <View style={styles.itemsWrapper}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('Shop');
        }}
      >
        <Text style={styles.buttonText}>Go to Shop</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={handleLogOut}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Item navigation={navigation} />
    </View>
  );
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
});