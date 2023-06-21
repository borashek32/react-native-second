import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from "../../common/hooks/use-app-selector"
import {useSelector} from "react-redux"
import {selectCartInfo, selectProductInCart} from "../cart/cart.selectors"
import {selectProfile} from "../auth/auth.selectors"


const Navbar = () => {

  const cartInfo = useAppSelector(selectCartInfo)
  const productsInCart = useAppSelector(selectProductInCart)
  const profile = useSelector(selectProfile)

  return (
    <View style={styles.navbar}>
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => {
          }}
        >
          {profile &&
            <View style={styles.cartWrapper}>
              <View style={styles.cartInfoWrapper}>
                <Text>{productsInCart && cartInfo.productsTotalQuantity} items</Text>
                <Text>USD {productsInCart && cartInfo.productsTotalPrice}</Text>
              </View>
              <Image style={styles.cartImg} source={require('./../../assets/img/cart.jpeg')}/>
            </View>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    position: 'relative',
    zIndex: 1
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    fontSize: 16,
    color: '#666',
    paddingTop: 22
  },
  cartWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: "center",
    position: 'absolute',
    zIndex: 2,
    top: 20,
    left: 280
  },
  cartInfoWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  cartImg: {
    width: 40,
    height: 40,
  }
})

export default Navbar;