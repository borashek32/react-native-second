import {createSlice, PayloadAction} from "@reduxjs/toolkit"

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
  extraReducers: (builder) => {}
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;