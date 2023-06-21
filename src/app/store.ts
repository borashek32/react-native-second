import {configureStore} from "@reduxjs/toolkit"
import {appReducer} from "./app.slice"
import {authReducer} from "../components/auth/auth.slice"
import {productsReducer} from "../components/shop/products.slice"
import {cartReducer} from "../components/cart/cart.slice"
import {setupListeners} from "@reduxjs/toolkit/query"

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

setupListeners(store.dispatch)

export type AppDispatchType = typeof store.dispatch
export type RootStateType = ReturnType<typeof store.getState>