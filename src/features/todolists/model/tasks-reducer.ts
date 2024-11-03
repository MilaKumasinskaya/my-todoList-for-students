import {AddTodolistAT, ClearTodolistsAT, RemoveTodolistAT} from "./todolists-reducer";
import {tasksApi} from "../api/tasksApi";
import {AppDispatch, RootState} from "../../../app/store";
import {DomainTask, UpdateTaskDomainModel} from "../api/tasksApi.types";
import {ResultCode, TaskStatus} from "common/enums";
import {setAppStatusAC} from "../../../app/app-reducer";
import {handleNetworkError, handleServerError} from "common/utils";

export type TasksStateType = {
    [key: string]: DomainTask[]
}
const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {...state, [action.payload.id]: action.payload.tasks}
        }
        case "ADD-TASK": {
            const newTask = action.payload.task
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]}
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.id]: state[action.payload.id].filter((t) => t.id !== action.payload.taskId)
            }
        }
        case "UPDATE-TASK": {
            const task = action.payload.task
            const tasks = state[task.todoListId].map((t) => t.id === task.id ? {
                ...t,
                status: task.status,
                title: task.title
            } : t)
            return {...state, [task.todoListId]: tasks}

        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.payload.id];
            return copyState;
        }
        case "CLEAR-TODOLISTS": {
            return {}
        }
        default:
            return state
    }
}

export const removeTaskAC = (payload: { id: string, taskId: string }) => {
    return {type: 'REMOVE-TASK', payload} as const
}
export const addTaskAC = (payload: { task: DomainTask }) => {
    return {type: 'ADD-TASK', payload} as const
}
export const updateTaskAC = (payload: { task: DomainTask }) => {
    return {type: 'UPDATE-TASK', payload} as const
}

export const setTasksAC = (payload: { id: string, tasks: DomainTask[] }) => {
    return {type: 'SET-TASKS', payload} as const
}

export const fetchTasksTC = (id: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.getTasks(id)
        .then(res => {

            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTasksAC({id, tasks: res.data.items}))
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
export const removeTaskTC = (payload: { id: string, taskId: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.deleteTask(payload)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(removeTaskAC(payload))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
export const addTaskTC = (payload: { id: string, title: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.createTask(payload)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(addTaskAC({task: res.data.data.item}))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
export const updateTaskTC = (payload: { id: string, taskId: string, status?: TaskStatus, title?: string }) => (dispatch: AppDispatch, getState: () => RootState) => {

    const {id, taskId, status, title} = payload
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[id]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)
    if (task) {
        const model: UpdateTaskDomainModel = {
            status: status === undefined ? task.status : status,
            title: title || task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        dispatch(setAppStatusAC('loading'))
        tasksApi.updateTask({id: task.todoListId, taskId: task.id, model})
            .then((res) => {
                if (res.data.resultCode === ResultCode.Success) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(updateTaskAC({task: res.data.data.item}))
                } else {
                    handleServerError(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleNetworkError(dispatch, err)
            })
    }
}


type ActionsType = RemoveTaskAT
    | AddTaskAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTasksAT
    | UpdateTaskAT
    | ClearTodolistsAT
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type UpdateTaskAT = ReturnType<typeof updateTaskAC>
type SetTasksAT = ReturnType<typeof setTasksAC>