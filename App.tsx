import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from "./src/components/HomeScreen"
import {LoginScreen} from "./src/components/auth/LoginScreen"
import {ProfileScreen} from "./src/components/profile/ProfileScreen"
import {ShopScreen} from "./src/components/shop/ShopScreen"
import {Provider} from "react-redux"
import {store} from "./src/app/store"
import {CartScreen} from "./src/components/cart/CartScreen"


const Stack = createNativeStackNavigator();

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
          <Stack.Screen name="Shop" component={ShopScreen}/>
          <Stack.Screen name="Cart" component={CartScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;