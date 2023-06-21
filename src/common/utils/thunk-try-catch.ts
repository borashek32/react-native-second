import {AxiosError, isAxiosError} from "axios"
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk"
import {AppDispatchType, RootStateType} from "../../app/store"
import {appActions} from "../../app/app.slice"

/**
 Wrapper function for Redux Toolkit's createAsyncThunk.
 Handles errors and dispatches actions accordingly.
 @param {BaseThunkAPI<RootStateType, any, AppDispatchType, unknown>} thunkAPI - The Thunk API object provided by Redux Toolkit.
 @param {Function} logic - The asynchronous logic function to be executed.
 @param {boolean} [showGlobalError=false] - Flag indicating whether to show a global error message.
 @returns {Promise<any>} - A promise representing the result of the logic function or a rejected value with error information.
 */

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootStateType, any, AppDispatchType, unknown>,
  logic: Function,
  showGlobalError: boolean = false
) => {

  const { dispatch, rejectWithValue } = thunkAPI

  try {
    return await logic()

  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (isAxiosError(err)) {
      const error = err.response ? err.response.data.error : err.message
      dispatch(appActions.setError({ error }))
    } else {
      dispatch(appActions.setError({ error: `Native error ${err.message}` }))
    }

    return rejectWithValue({ e, showGlobalError })
  }
}