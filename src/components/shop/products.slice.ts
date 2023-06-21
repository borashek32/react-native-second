import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {ProductType} from "./products.types"
import {getAllProducts} from "../../common/api/firebase"
import {thunkTryCatch} from "../../common/utils/thunk-try-catch"
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk"

const slice = createSlice({
  name: 'products',
  initialState: {
    products: [] as ProductType[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetProducts.fulfilled, (state, action) => {
        state.products = action.payload.products
      })
  },
})

const handleGetProducts = createAppAsyncThunk<{ products: ProductType[] }>(
  'products/handle-get-products',
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await getAllProducts()
      return { products: res.products }
    })
  })

export const productsThunks = { handleGetProducts }
export const productsReducer = slice.reducer
