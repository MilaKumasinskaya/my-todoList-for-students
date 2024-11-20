import {createSlice} from "@reduxjs/toolkit";
import {Inputs} from "../features/auth/ui/Login/Login";
import {AppDispatch} from "./store";
import {_authApi} from "../features/auth/api/authApi";
import {ResultCode} from "common/enums";
import {handleNetworkError, handleServerError} from "common/utils";
import {clearTodolists} from "../features/todolists/model/todolistsSlice";
import {clearTasks} from "../features/todolists/model/tasksSlice";

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ThemeMode = 'dark' | 'light'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'dark' as ThemeMode,
        status: 'idle' as RequestStatus,
        error: null as string | null,
        isLoggedIn: false,
    },
    reducers: (create) => ({
        changeTheme: create.reducer<{themeMode: ThemeMode}>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppStatus: create.reducer<{status: RequestStatus}>((state, action) => {
            state.status = action.payload.status
        }),
        setError: create.reducer<{error: string | null}>((state, action) => {
            state.error = action.payload.error
        }),
        setIsLoggedIn: create.reducer<{isLoggedIn: boolean}>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
    }),
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectAppStatus: (state) => state.status,
        selectAppError: (state) => state.error,
        selectIsLoggedIn : (state) => state.isLoggedIn,
    }
})

export const loginTC = (payload: Inputs) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _authApi.login(payload)
        .then(res=>{
            if(res.data.resultCode === ResultCode.Success) {
                localStorage.setItem('sn-token', res.data.data.token)
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(setIsLoggedIn({isLoggedIn: true}))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err)=> {
            handleNetworkError(dispatch, err)
        })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _authApi.logout()
        .then(res=>{
            if(res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(setIsLoggedIn({isLoggedIn: false}))
                dispatch(clearTodolists())
                dispatch(clearTasks())
                localStorage.removeItem('sn-token')
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err)=> {
            handleNetworkError(dispatch, err)
        })
}

export const {changeTheme, setAppStatus, setError, setIsLoggedIn} = appSlice.actions
export const appReducer = appSlice.reducer
export const {selectAppStatus, selectThemeMode, selectAppError, selectIsLoggedIn} = appSlice.selectors