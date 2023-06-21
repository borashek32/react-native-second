import {Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {FC} from "react"
import {ProductType} from "../products.types"
import {cartThunks} from "../../cart/cart.slice"
import {useSelector} from "react-redux"
import {selectUid} from "../../auth/auth.selectors"
import {useAppDispatch} from "../../../common/hooks/use-app-dispatch"


type Props = {
  item: ProductType
}

export const Item: FC<Props> = ({ item }) => {

  const dispatch = useAppDispatch()

  const userUid = useSelector(selectUid)

  const addToCart = (item: ProductType) => {
    userUid && dispatch(cartThunks.handleAddToCart({ product: item, userUid }))
      .unwrap()
      .then(() => Alert.alert('Cart', 'Product successfully added to Cart'))
      .catch((error) => Alert.alert('Error', error.message))
  }

  return (
    <View style={styles.itemsWrapper}>
      <Image
        style={styles.img}
        source={{uri: item.img}}
      />
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
        }}
      >
        <Text style={styles.buttonText}>{item.title}</Text>
        <Text style={styles.buttonText}>USD {item.price}</Text>
        <Text style={styles.buttonText}>{item.quantity} items</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button
          onPress={() => addToCart(item)}
          title={'to Cart'}
        />
      </TouchableOpacity>
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