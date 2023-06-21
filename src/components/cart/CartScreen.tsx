import {Alert, ScrollView, StyleSheet, Text, View} from "react-native"
import {NavigationProp} from "@react-navigation/native"
import React, {useEffect} from "react";
import {useAppDispatch} from "../../common/hooks/use-app-dispatch"
import {useSelector} from "react-redux"
import {selectProductInCart} from "./cart.selectors"
import {cartThunks} from "./cart.slice"
import {selectEmail, selectUid, selectUserName} from "../auth/auth.selectors"
import {ItemsInCart} from "./items/ItemsInCart"


type CartScreenProps = {
  navigation: NavigationProp<any, 'Profile'>;
}

export const CartScreen = ({navigation}: CartScreenProps) => {

  const dispatch = useAppDispatch()

  const userName = useSelector(selectUserName)
  const email = useSelector(selectEmail)
  const userUid = useSelector(selectUid)

  useEffect(() => {
    userUid && dispatch(cartThunks.handleGetProductsInCart({ userUid }))
      .unwrap()
      .catch((error) => Alert.alert('Error', error.message))
  }, [])

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}> Cart</Text>
          {userName
            ? <Text>{userName}</Text>
            : <Text>{email}</Text>
          }

          <View style={styles.itemsTable}>
            <View style={styles.item}>
              <Text>Product title</Text>
              <Text>Price</Text>
              <Text>Quantity</Text>
            </View>

            <ItemsInCart />
          </View>
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
  itemsTable: {
    marginTop: 50,
    marginBottom: 50
  },
  item: {
    width: 350,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});