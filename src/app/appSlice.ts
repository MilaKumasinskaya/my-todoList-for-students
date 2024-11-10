import {createSlice} from "@reduxjs/toolkit";

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ThemeMode = 'dark' | 'light'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'dark' as ThemeMode,
        status: 'idle' as RequestStatus,
        error: null as string | null
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
        })
    }),
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectAppStatus: (state) => state.status,
        selectAppError: (state) => state.error,
    }
})

export const {changeTheme, setAppStatus, setError} = appSlice.actions
export const appReducer = appSlice.reducer
export const {selectAppStatus, selectThemeMode, selectAppError} = appSlice.selectors