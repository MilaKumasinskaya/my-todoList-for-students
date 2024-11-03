
import {setAppStatusAC} from "../../../app/app-reducer";
import {authApi} from "../api/authApi";
import {ResultCode} from "common/enums";
import {handleNetworkError, handleServerError} from "common/utils";
import {Inputs} from "../ui/Login/Login";
import {AppDispatch} from "../../../app/store";
import {clearTodolistsAC} from "../../todolists/model/todolists-reducer";


type InitialState = typeof initialState

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

export const authReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case 'AUTH/SET_IS_LOGGED_IN': {
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        }
        case 'AUTH/SET_IS_INITIALIZED': {
            return {...state, isInitialized: action.payload.isInitialized}
        }
        default:
            return state
    }
}

const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: 'AUTH/SET_IS_LOGGED_IN', payload: {isLoggedIn}} as const
}
const setIsInitializedAC = (isInitialized: boolean) => {
    return {type: 'AUTH/SET_IS_INITIALIZED', payload: {isInitialized}} as const
}


type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>

export const initializeAppTC  = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.me()
        .then(res=>{
            if(res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err)=> {
            handleNetworkError(dispatch, err)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

export const loginTC = (payload: Inputs) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(payload)
        .then(res=>{
            if(res.data.resultCode === ResultCode.Success) {
                localStorage.setItem('sn-token', res.data.data.token)
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err)=> {
            handleNetworkError(dispatch, err)
        })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then(res=>{
            if(res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(false))
                dispatch(clearTodolistsAC())
                localStorage.removeItem('sn-token')
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err)=> {
            handleNetworkError(dispatch, err)
        })
}
