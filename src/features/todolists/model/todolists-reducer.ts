import {Todolist} from "../api/todolistsApi.types";
import {AppDispatch} from "../../../app/store";
import {todolistsApi} from "../api/todolistsApi";
import {RequestStatus, setAppStatusAC, setErrorAC} from "../../../app/app-reducer";
import {ResultCode} from "common/enums";
import {handleNetworkError, handleServerError} from "common/utils";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
    entityStatus: RequestStatus
}
const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        case 'ADD-TODOLIST': {
            const newTodolist: DomainTodolist = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
            return [newTodolist, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id !== action.payload.id)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map((tl) => tl.id === action.payload.id ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl)
        }
        case "CLEAR-TODOLISTS": {
            return []
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const
}
export const addTodolistAC = (todolist: Todolist) => {
    return {type: 'ADD-TODOLIST', payload: {todolist}} as const
}
export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload} as const
}
export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValuesType }) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload} as const
}
export const setTodolistsAC = (todolists: Todolist[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const changeTodolistEntityStatusAC = (payload: { id: string, entityStatus: RequestStatus }) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload} as const
}
export const clearTodolistsAC = () => {
    return {type: 'CLEAR-TODOLISTS'} as const
}


export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistsAC(res.data))
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'loading'}))
    todolistsApi.deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(removeTodolistAC(id))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err) => {
            dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'idle'}))
            handleNetworkError(dispatch, err)
        })
}
export const updateTodolistTitleTC = (payload: { id: string, title: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodolist(payload)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistTitleAC(payload))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}

type ActionsType =
    AddTodolistAT
    | RemoveTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistsAT
    | ChangeTodolistEntityStatusAT
    | ClearTodolistsAT

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ClearTodolistsAT = ReturnType<typeof clearTodolistsAC>
