import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {ArgAuthType, ProfileType} from "./auth.types"
import {auth, db} from "../../common/api/firebase"
import {AxiosError, isAxiosError} from "axios"
import {appActions} from "../../app/app.slice"
import {collection, addDoc} from "firebase/firestore"

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
  },
});

const handleSignUp = createAsyncThunk<void, ArgAuthType>(
  'auth/handle-sign-up',
  async (arg, thunkApi) => {
    const {dispatch, rejectWithValue} = thunkApi

    try {
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

    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (isAxiosError(err)) {
        const error = err.response ? err.response.data.error : err.message
        dispatch(appActions.setError({error}))
      } else {
        dispatch(appActions.setError({error: `Native error ${err.message}`}))
      }
      return rejectWithValue(e)
    }
  })

const handleLogIn = createAsyncThunk<{ profile: ProfileType }, ArgAuthType>(
  'auth/handle-sign-in',
  async (arg, thunkApi) => {
    const {dispatch, rejectWithValue} = thunkApi

    try {
      const res = await auth.signInWithEmailAndPassword(arg.email, arg.password)
      return { profile: res.user } as { profile: ProfileType }

    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (isAxiosError(err)) {
        const error = err.response ? err.response.data.error : err.message
        dispatch(appActions.setError({error}))
      } else {
        dispatch(appActions.setError({error: `Native error ${err.message}`}))
      }
      return rejectWithValue(e)
    }
  })

const handleLogOut = createAsyncThunk<void>(
  'auth/handle-redirect-path',
  async (arg, thunkApi) => {
    const {dispatch, rejectWithValue} = thunkApi

    try {
      await auth.signOut()

    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (isAxiosError(err)) {
        const error = err.response ? err.response.data.error : err.message
        dispatch(appActions.setError({error}))
      } else {
        dispatch(appActions.setError({error: `Native error ${err.message}`}))
      }
      return rejectWithValue(e)
    }
  })

export const authThunks = { handleSignUp, handleLogIn, handleLogOut };
export const authActions = slice.actions
export const authReducer = slice.reducer