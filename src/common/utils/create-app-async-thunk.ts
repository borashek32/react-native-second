import { AppDispatchType, RootStateType } from "../../app/store"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootStateType
  dispatch: AppDispatchType
  rejectValue: unknown
}>();