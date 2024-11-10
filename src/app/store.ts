import {UnknownAction} from "redux";
import {tasksReducer, tasksSlice} from "../features/todolists/model/tasksSlice";
import {todolistsReducer, todolistsSlice} from "../features/todolists/model/todolistsSlice";
import {appReducer, appSlice} from "./appSlice";
import {ThunkDispatch} from "redux-thunk";
import {authReducer, authSlice} from "../features/auth/model/authSlice";
import {configureStore} from "@reduxjs/toolkit";

// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({reducer: {
        [tasksSlice.name]: tasksReducer,
        [todolistsSlice.name]: todolistsReducer,
        [appSlice.name]: appReducer,
        [authSlice.name]: authReducer
    }})

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>



