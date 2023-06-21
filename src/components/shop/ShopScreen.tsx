import {Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {NavigationProp} from "@react-navigation/native"
import React, {useEffect} from "react";
import {useAppDispatch} from "../../common/hooks/use-app-dispatch"
import {productsThunks} from "./products.slice"
import {useSelector} from "react-redux"
import {selectProducts} from "./products.selectors"
import {ProductType} from "./products.types"
import {cartThunks} from "../cart/cart.slice"
import {selectUid} from "../auth/auth.selectors"
import {ItemsInShop} from "./items/ItemsInShop"


type ShopScreenProps = {
  navigation: NavigationProp<any, 'Profile'>;
}

export const ShopScreen = ({navigation}: ShopScreenProps) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(productsThunks.handleGetProducts())
      .unwrap()
      .catch((error) => Alert.alert('Error', error.message))
  }, [])

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Shop</Text>

          <ItemsInShop />
        </View>
      </ScrollView>
    </>
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
    justifyContent: 'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    width: 250,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  img: {
    marginLeft: 16,
    width: 250,
    height: 250
  },
  buttonText: {
    fontSize: 20,
  }
});