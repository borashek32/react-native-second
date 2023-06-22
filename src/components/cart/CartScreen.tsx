import {Alert, ScrollView, StyleSheet, Text, View} from "react-native"
import {NavigationProp} from "@react-navigation/native"
import React, {useEffect} from "react";
import {useAppDispatch} from "../../common/hooks/use-app-dispatch"
import {useSelector} from "react-redux"
import {cartThunks} from "./cart.slice"
import {selectEmail, selectUid, selectUserName} from "../auth/auth.selectors"
import {ItemsInCart} from "./items/ItemsInCart"
import {selectCartInfo} from "./cart.selectors"


export const CartScreen = () => {

  const dispatch = useAppDispatch()

  const userName = useSelector(selectUserName)
  const email = useSelector(selectEmail)
  const userUid = useSelector(selectUid)
  const cartInfo = useSelector(selectCartInfo)

  useEffect(() => {
    userUid && dispatch(cartThunks.handleGetProductsInCart({userUid}))
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
          <ItemsInCart/>
        </View>

        <View style={styles.cartInfoWrapper}>
          <Text style={styles.cartInfo}>Total quantity: {cartInfo.productsTotalQuantity} items</Text>
          <Text style={styles.cartInfo}>Total price: USD {cartInfo.productsTotalPrice}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    paddingTop: 50
  },
  title: {
    fontSize: 30
  },
  cartInfoWrapper: {
    marginTop: 50,
    marginRight: 40,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-end'
  },
  cartInfo: {
    fontSize: 18
  }
});