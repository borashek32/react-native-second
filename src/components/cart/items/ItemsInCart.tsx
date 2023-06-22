import {ScrollView, SectionList, StyleSheet, Text, View} from "react-native"
import React from "react"
import {useSelector} from "react-redux"
import {selectProductInCart} from "../cart.selectors"
import {Item} from "./Item"
import {EmptyComponent} from "../../../common/components/EmptyComponent"

const CartHeader = () => {
  return (
    <View style={styles.itemsTable}>
      <View style={styles.item}>
        <Text>Product title</Text>
        <Text>Price, USD</Text>
        <Text>Quantity</Text>
        <Text>Rm</Text>
      </View>
    </View>
  )
}

export const ItemsInCart = () => {

  const itemsInCart = useSelector(selectProductInCart)

  const sections = [
    { title: "Items", data: itemsInCart },
  ]

  return (
    <ScrollView style={styles.container} horizontal={true}>
      <SectionList
        sections={sections}
        renderItem={({ item }) => <Item key={item.uid} item={item} />}
        renderSectionHeader={() => <CartHeader />}
        keyExtractor={(item) => item.uid}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <EmptyComponent textForLoadingData={'There are no products in the cart'} />
        )}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsTable: {
    marginTop: 50,
    marginBottom: 50,
  },
  item: {
    width: 350,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 20,
    marginBottom: 20,
  },
})
