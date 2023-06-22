import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {useAppDispatch} from "../hooks/use-app-dispatch"
import {useSelector} from "react-redux"
import {selectProfile} from "../../components/auth/auth.selectors"
import {useEffect} from "react"
import {authThunks} from "../../components/auth/auth.slice"
import Nav from "../../components/nav/Nav"
import {NavigationContainer} from "@react-navigation/native"
import {HomeScreen} from "../../components/HomeScreen"
import {AuthScreen} from "../../components/auth/AuthScreen"
import {ProfileScreen} from "../../components/profile/ProfileScreen"
import {ShopScreen} from "../../components/shop/ShopScreen"
import {CartScreen} from "../../components/cart/CartScreen"
import * as React from "react"


// https://reactnavigation.org/docs/typescript/

export type RootStackParamList = {
  Home: undefined
  Profile: undefined
  Shop: undefined
  Cart: undefined
  Login: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Navigation = () => {

  const dispatch = useAppDispatch()
  const profile = useSelector(selectProfile)

  useEffect(() => {
    dispatch(authThunks.authMe())
  }, [])

  return (
    <NavigationContainer>
      <Nav/>
      <Stack.Navigator initialRouteName={'Login'}>
        {profile ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My App' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Shop" component={ShopScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}