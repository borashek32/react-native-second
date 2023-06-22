import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from "../../common/hooks/use-app-selector"
import {useSelector} from "react-redux"
import {selectCartInfo, selectProductInCart} from "../cart/cart.selectors"
import {selectProfile} from "../auth/auth.selectors"
import {authThunks} from "../auth/auth.slice"
import {useAppDispatch} from "../../common/hooks/use-app-dispatch"
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from "../HomeScreen"
import {AuthScreen} from "../auth/AuthScreen"
import {createNativeStackNavigator} from "@react-navigation/native-stack"


const Stack = createNativeStackNavigator();

const Navbar = () => {

  const cartInfo = useAppSelector(selectCartInfo)
  const profile = useSelector(selectProfile)

  return (
    <View style={styles.navbar}>
      {profile &&
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => {
            }}
          >
            <View style={styles.cartWrapperEmpty}>
              <View style={styles.cartInfoWrapper}>
                {cartInfo.productsTotalQuantity
                  ? <Text>{cartInfo.productsTotalQuantity} items</Text>
                  : ''
                }
                {cartInfo.productsTotalPrice
                  ? <Text>USD {cartInfo.productsTotalPrice}</Text>
                  : ''
                }
              </View>
              <Image style={styles.cartImg} source={require('./../../assets/img/cart.jpeg')}/>
            </View>
          </TouchableOpacity>
        </View>
      }
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
  cartWrapperEmpty: {
    display: 'flex',
    flexDirection: 'row',
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