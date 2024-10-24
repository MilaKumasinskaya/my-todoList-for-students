import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../app/App";

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
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
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', payload: {title, id: v1()}} as const
}
export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload} as const
}
export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValuesType }) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload} as const
}

type ActionsType =
    AddTodolistAT
    | RemoveTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
