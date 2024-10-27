
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "REMOVE-TASK": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId)}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map((t) => t.id === action.payload.taskId ? {...t, isDone: action.payload.status} : t)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map((t) => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.payload.id];
            return copyState;
        }
        default:
           return state
    }
}

export const removeTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return { type: 'REMOVE-TASK', payload } as const
}
export const addTaskAC = (payload: {todolistId: string, title: string}) => {
    return {type: 'ADD-TASK', payload} as const
}
export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, status: boolean}) => {
    return { type: 'CHANGE-TASK-STATUS', payload } as const
}
export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
    return { type: 'CHANGE-TASK-TITLE', payload } as const
}

type ActionsType = RemoveTaskAT
| AddTaskAT
| ChangeTaskStatusAT
| ChangeTaskTitleAT
| AddTodolistAT
| RemoveTodolistAT
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>