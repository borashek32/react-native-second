import {RootStateType} from "../../app/store"

const selectProfile = (state: RootStateType) => state.auth.profile
const selectUid = (state: RootStateType) => state.auth.profile?.uid
const selectUserName = (state: RootStateType) => state.auth.profile?.displayName
const selectEmail = (state: RootStateType) => state.auth.profile?.email

export {
  selectProfile,
  selectUserName,
  selectUid,
  selectEmail
}