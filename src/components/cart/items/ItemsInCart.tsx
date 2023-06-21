import {ProductInCartType} from "../cart.types"
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React from "react"
import {useAppDispatch} from "../../../common/hooks/use-app-dispatch"
import {useSelector} from "react-redux"
import {selectProductInCart} from "../cart.selectors"
import {Item} from "./Item"


export const ItemsInCart = () => {

  const itemsInCart = useSelector(selectProductInCart)

  return (
    <>
      <View style={styles.separator} />

      {itemsInCart.map((pr: ProductInCartType) => <Item key={pr.uid} item={pr} />)}
    </>
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 20,
    marginBottom: 20
  }
});