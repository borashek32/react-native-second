import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {useAppDispatch} from "../../common/hooks/use-app-dispatch"
import {useSelector} from "react-redux"
import {selectProfile} from "../auth/auth.selectors"
import {useEffect} from "react"
import {authThunks} from "../auth/auth.slice"
import Nav from "../nav/Nav"
import {NavigationContainer} from "@react-navigation/native"
import {HomeScreen} from "../HomeScreen"
import {AuthScreen} from "../auth/AuthScreen"
import {ProfileScreen} from "../profile/ProfileScreen"
import {ShopScreen} from "../shop/ShopScreen"
import {CartScreen} from "../cart/CartScreen"
import * as React from "react"


const Stack = createNativeStackNavigator();

export const Layout = () => {

  const dispatch = useAppDispatch()
  const profile = useSelector(selectProfile)

  useEffect(() => {
    dispatch(authThunks.authMe())
  }, [])

  return (
    <>
      <Nav/>
      <NavigationContainer>
        <Stack.Navigator>
          {profile ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Shop" component={ShopScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={AuthScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}