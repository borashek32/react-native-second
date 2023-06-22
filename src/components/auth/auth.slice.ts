import {createSlice} from "@reduxjs/toolkit"
import {ArgAuthType, ProfileType} from "./auth.types"
import {db} from "../../common/api/firebase"
import {addDoc, collection} from "firebase/firestore"
import {thunkTryCatch} from "../../common/utils/thunk-try-catch"
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk"
import {auth} from "./auth.api"
import {appActions} from "../../app/app.slice"

const slice = createSlice({
  name: 'auth',
  initialState: {
    profile: null as ProfileType | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleLogIn.fulfilled, (state, action) => {
        state.profile = action.payload.profile
      })
      .addCase(handleLogOut.fulfilled, (state) => {
        state.profile = null
      })
  },
})

const authMe = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/auth-me",
  async (arg, thunkAPI
  ) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch } = thunkAPI
      const res = await auth.currentUser
      if (res) {
        dispatch(appActions.setIsInitialized({ isInitialized: true }))
        return {profile: res}
      }
    })
  })

const handleSignUp = createAppAsyncThunk<void, ArgAuthType>(
  'auth/handle-sign-up',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await auth.createUserWithEmailAndPassword(arg.email, arg.password)
        .then(async (res) => {
          const usersCollectionRef = collection(db, 'users')

          const currentUser = {
            uid: res.user?.uid,
            email: res.user?.email,
            emailVerified: res.user?.emailVerified,
            isAnonymous: res.user?.isAnonymous,
            providerId: res.user?.providerData,
            displayName: res.user?.displayName,
            phoneNumber: res.user?.phoneNumber,
            photoURL: res.user?.photoURL,
            refreshToken: res.user?.refreshToken
          }
          await addDoc(usersCollectionRef, currentUser)
        })
    })
  })

const handleLogIn = createAppAsyncThunk<{ profile: ProfileType }, ArgAuthType>(
  'auth/handle-sign-in',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await auth.signInWithEmailAndPassword(arg.email, arg.password)
      return { profile: res.user } as { profile: ProfileType }
    })
  })

const handleLogOut = createAppAsyncThunk<void>(
  'auth/handle-redirect-path',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await auth.signOut()
    })
  })

export const authThunks = { handleSignUp, handleLogIn, handleLogOut, authMe };
export const authActions = slice.actions
export const authReducer = slice.reducer