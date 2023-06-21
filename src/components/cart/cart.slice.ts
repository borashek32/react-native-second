import {createSlice} from "@reduxjs/toolkit"
import {
  addProductToCart, decrementCartItemQuantity,
  getUserCartProducts,
  incrementCartItemQuantity
} from "../../common/api/firebase"
import {ProductInCartType} from "./cart.types"
import {ProductType} from "../shop/products.types"
import {thunkTryCatch} from "../../common/utils/thunk-try-catch"
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk"

const slice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: [] as ProductInCartType[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetProductsInCart.fulfilled, (state, action) => {
        state.productsInCart = action.payload.productsInCart
      })
      .addCase(handleIncrementCartItemQuantity.fulfilled, (state, action) => {
        const index = state.productsInCart.findIndex(product => product && product.uid === action.payload.updatedProductData.uid)
        if (index !== -1) state.productsInCart[index] = action.payload.updatedProductData
      })
  }
})

const handleAddToCart = createAppAsyncThunk<void, { product: ProductType, userUid: string }>(
  'cart/add-to-cart',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await addProductToCart(arg.product, arg.userUid)
    })
  })

const handleGetProductsInCart = createAppAsyncThunk<{ productsInCart: ProductInCartType[] }, { userUid: string }>(
  'cart/handle-get-products-in-cart',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await getUserCartProducts(arg.userUid)
      return { productsInCart: res.productsInCart }
    })
  })

const handleIncrementCartItemQuantity = createAppAsyncThunk<{ updatedProductData: ProductInCartType }, { uid: string}>(
  'cart/handle-increment-cart-item-quantity',
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await incrementCartItemQuantity(arg.uid)
      return { updatedProductData: res }
    })
  })

const handleDecrementCartItemQuantity = createAppAsyncThunk<{ updatedProductData: ProductInCartType }, { uid: string}>(
  'cart/handle-increment-cart-item-quantity',
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await decrementCartItemQuantity(arg.uid)
      return { updatedProductData: res }
    })
  })

export const cartThunks = {
  handleAddToCart,
  handleGetProductsInCart,
  handleIncrementCartItemQuantity,
  handleDecrementCartItemQuantity
}
export const cartReducer = slice.reducer
