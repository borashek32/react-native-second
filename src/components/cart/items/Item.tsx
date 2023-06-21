import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {FC} from "react"
import {ProductInCartType} from "../cart.types"
import {useAppDispatch} from "../../../common/hooks/use-app-dispatch"
import {cartThunks} from "../cart.slice"

type Props = {
  item: ProductInCartType
}

export const Item: FC<Props> = ({ item}) => {

  const dispatch = useAppDispatch()

  const decrementItemsInCart = () => {
    dispatch(cartThunks.handleDecrementCartItemQuantity({ uid: item.uid }))
  }

  const incrementItemsInCart = () => {
    dispatch(cartThunks.handleIncrementCartItemQuantity({ uid: item.uid }))
  }

  return (
    <View style={styles.itemsWrapper}>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Text style={styles.buttonText}>{item.title}</Text>

        <Text style={styles.buttonText}>USD {item.price}</Text>

        <View style={styles.quantityWrapper}>
          <View style={styles.quantityButtons}>
            <Button title={'-'} onPress={decrementItemsInCart}/>
          </View>

          <View>
            <Text style={styles.buttonText}>{item.quantity}</Text>
          </View>

          <View style={styles.quantityButtons}>
            <Button title={'+'} onPress={incrementItemsInCart}/>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.separator}/>
    </View>
  )
}

const styles = StyleSheet.create({
  itemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  item: {
    width: 350,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  img: {
    marginLeft: 16,
    width: 250,
    height: 250
  },
  buttonText: {
    fontSize: 20
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 20,
    marginBottom: 20
  },
  quantityWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  quantityButtons: {

  }
});