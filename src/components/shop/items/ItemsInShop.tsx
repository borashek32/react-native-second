import {ProductType} from "../products.types"
import {View} from "react-native"
import React from "react"
import {useSelector} from "react-redux"
import {selectProducts} from "../products.selectors"
import {Item} from "./Item"

export const ItemsInShop = () => {

  const products = useSelector(selectProducts)

  return (
    <View>
      {products.map((pr: ProductType) => <Item item={pr} key={pr.uid} />)}
    </View>
  )
}