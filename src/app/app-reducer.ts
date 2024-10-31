export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ThemeMode = 'dark' | 'light'
type InitialState = typeof initialState
const initialState = {
    themeMode: 'light' as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as string | null
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type){
        case 'CHANGE-THEME': {
            return {...state, themeMode: action.payload.themeMode}
        }
        case "SET-STATUS": {
            return {...state, status: action.payload.status}
        }
        case "SET-ERROR": {
            return {...state, error: action.payload.error}
        }
        default:
            return state
    }
}
export const changeThemeAC = (themeMode: ThemeMode) => {
    return {type: 'CHANGE-THEME', payload: {themeMode}} as const
}
export const setAppStatusAC = (status: RequestStatus) => {
    return {type: 'SET-STATUS', payload: {status}} as const
}
export const setErrorAC = (error: string | null) => {
    return {type: 'SET-ERROR', payload: {error}} as const
}
export type ChangeThemeAT = ReturnType<typeof changeThemeAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetErrorAT = ReturnType<typeof setErrorAC>
type ActionsType = ChangeThemeAT | SetAppStatusAT | SetErrorAT
