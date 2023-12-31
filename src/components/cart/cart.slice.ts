import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {CartInfoType, ProductInCartType} from "./cart.types"
import {ProductType} from "../shop/products.types"
import {thunkTryCatch} from "../../common/utils/thunk-try-catch"
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk"
import {
  addProductToCart,
  decrementCartItemQuantity,
  getUserCartProducts,
  incrementCartItemQuantity,
  removeCartItem
} from "./cart.api"

const slice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: [] as ProductInCartType[],
    cartInfo: {
      productsTotalQuantity: 0,
      productsTotalPrice: 0
    } as CartInfoType
  },
  reducers: {
    setCartInfo: (state, action: PayloadAction<{ quantity: number, price: number }>) => {
      state.cartInfo.productsTotalQuantity += action.payload.quantity
      state.cartInfo.productsTotalPrice += action.payload.price
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetProductsInCart.fulfilled, (state, action) => {
        state.productsInCart = action.payload.productsInCart
        state.cartInfo = action.payload.cartInfo
      })
      .addCase(handleIncrementCartItemQuantity.fulfilled, (state, action) => {
        const index = state.productsInCart.findIndex(product => product && product.uid === action.payload.updatedProductData.uid)
        if (index !== -1) state.productsInCart[index] = action.payload.updatedProductData
      })
      .addCase(handleRemoveCartItem.fulfilled, (state, action) => {
        state.productsInCart = action.payload.productsInCart
      })
  }
})

const handleAddToCart = createAppAsyncThunk<
  void, { product: ProductType, userUid: string }
  >(
  'cart/add-to-cart',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI
      await addProductToCart(arg.product, arg.userUid)
      dispatch(cartActions.setCartInfo({ quantity: 1, price: arg.product.price }))
    })
  })

const handleGetProductsInCart = createAppAsyncThunk<
  { productsInCart: ProductInCartType[], cartInfo: CartInfoType }, { userUid: string }
  >(
  'cart/handle-get-products-in-cart',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await getUserCartProducts(arg.userUid)
      return { productsInCart: res.productsInCart, cartInfo: res.cartInfo }
    })
  })

const handleIncrementCartItemQuantity = createAppAsyncThunk<
  { updatedProductData: ProductInCartType }, { uid: string}
  >(
  'cart/handle-increment-cart-item-quantity',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI
      const res = await incrementCartItemQuantity(arg.uid)
      if (res) {
        // dispatch(cartActions.setCartInfo({ quantity: res.quantity, price: res.price }))
        dispatch(cartThunks.handleGetProductsInCart({ userUid: res.userUid }))
      }
      return { updatedProductData: res }
    })
  })

const handleDecrementCartItemQuantity = createAppAsyncThunk<
  { updatedProductData: ProductInCartType }, { uid: string}
  >(
  'cart/handle-decrement-cart-item-quantity',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI
      const res = await decrementCartItemQuantity(arg.uid)
      if (res && res.quantity === 0) {
        // dispatch(cartActions.setCartInfo({ quantity: res.quantity, price: -res.priceForOneItem }))
        dispatch(cartThunks.handleRemoveCartItem({ uid: res.uid, userUid: res.userUid }))
      }
      return { updatedProductData: res }
    })
  })

const handleRemoveCartItem = createAppAsyncThunk<
  { productsInCart: ProductInCartType[] }, { uid: string, userUid: string}
  >(
  'cart/handle-remove-cart-item',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI
      const res = await removeCartItem(arg.uid, arg.userUid)
      dispatch(cartThunks.handleGetProductsInCart({ userUid: arg.userUid }))
      return { productsInCart: res.productsInCart }
    })
  })

export const cartThunks = {
  handleAddToCart,
  handleGetProductsInCart,
  handleIncrementCartItemQuantity,
  handleDecrementCartItemQuantity,
  handleRemoveCartItem
}
export const cartReducer = slice.reducer
export const cartActions = slice.actions
