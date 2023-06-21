import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AxiosError, isAxiosError} from "axios"

const appInitialState = {
  error: null as string | null,
  isLoading: false,
  isAppInitialized: false,
  redirectPath: ''
};

const slice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
    setError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isAppInitialized = action.payload.isInitialized
    },
    setRedirectPath: (state, action: PayloadAction<{ redirectPath: string }>) => {
      state.redirectPath = action.payload.redirectPath
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending");
        },
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          if (!action.payload?.showGlobalError) return
          const err = action.payload as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`;
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;