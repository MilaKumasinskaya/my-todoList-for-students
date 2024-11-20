import {Todolist} from "../api/todolistsApi.types";
import {AppDispatch} from "../../../app/store";
import {_todolistsApi} from "../api/todolistsApi";
import {RequestStatus, setAppStatus} from "../../../app/appSlice";
import {ResultCode} from "common/enums";
import {handleNetworkError, handleServerError} from "common/utils";
import {createSlice} from "@reduxjs/toolkit";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
    entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({
        removeTodolist: create.reducer<{ id: string }>((state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        }),
        addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
            const newTodolist: DomainTodolist = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
            state.unshift(newTodolist)
        }),
        changeTodolistTitle: create.reducer<{ id: string, title: string }>((state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        }),
        changeTodolistFilter: create.reducer<{ id: string, filter: FilterValuesType }>((state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) {
                state[index].filter = action.payload.filter
            }
        }),
        changeTodolistEntityStatus: create.reducer<{ id: string, entityStatus: RequestStatus }>((state, action) => {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        }),
        setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
            action.payload.todolists.forEach(tl => {
                state.push({...tl, filter: 'all', entityStatus: 'idle'})
            })
        }),
        clearTodolists: create.reducer((state, action) => {
            return []
        })
    }),
    selectors: {
        selectTodolists : (state) => state
    }
})

export const {
    removeTodolist,
    addTodolist,
    changeTodolistTitle,
    changeTodolistEntityStatus,
    changeTodolistFilter,
    clearTodolists,
    setTodolists
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
export const {selectTodolists} = todolistsSlice.selectors


export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _todolistsApi.getTodolists()
        .then(res => {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setTodolists({todolists: res.data}))
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(addTodolist({todolist: res.data.data.item}))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id, entityStatus: 'loading'}))
    _todolistsApi.deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(removeTodolist({id}))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err) => {
            dispatch(changeTodolistEntityStatus({id, entityStatus: 'idle'}))
            handleNetworkError(dispatch, err)
        })
}
export const updateTodolistTitleTC = (payload: { id: string, title: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _todolistsApi.updateTodolist(payload)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(changeTodolistTitle(payload))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
