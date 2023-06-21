import {RootStateType} from "./store"

const selectIsLoading = (state: RootStateType) => state.app.isLoading
const selectIsInitialized = (state: RootStateType) => state.app.isAppInitialized

export {
  selectIsInitialized,
  selectIsLoading
}