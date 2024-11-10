import {authApi} from "../api/authApi";
import {ResultCode} from "common/enums";
import {handleNetworkError, handleServerError} from "common/utils";
import {Inputs} from "../ui/Login/Login";
import {AppDispatch} from "../../../app/store";
import {createSlice} from "@reduxjs/toolkit";
import {setAppStatus} from "../../../app/appSlice";
import {clearTodolists} from "../../todolists/model/todolistsSlice";
import {clearTasks} from "../../todolists/model/tasksSlice";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isInitialized: false
    },
    reducers: (create) => ({
        setIsLoggedIn: create.reducer<{isLoggedIn: boolean}>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
        setIsInitialized: create.reducer<{isInitialized: boolean}>((state, action) => {
            state.isInitialized = action.payload.isInitialized
        })
    }),
    selectors: {
         selectIsLoggedIn : (state) => state.isLoggedIn,
         selectIsInitialized : (state) => state.isInitialized
    }
})



export const {setIsLoggedIn, setIsInitialized} = authSlice.actions
export const authReducer = authSlice.reducer
export const {selectIsInitialized, selectIsLoggedIn} = authSlice.selectors

export const initializeAppTC  = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authApi.me()
        .then(res=>{
            if(res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(setIsLoggedIn({isLoggedIn: true}))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err)=> {
            handleNetworkError(dispatch, err)
        })
        .finally(() => {
            dispatch(setIsInitialized({isInitialized: true}))
        })
}

export const loginTC = (payload: Inputs) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authApi.login(payload)
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
    authApi.logout()
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
