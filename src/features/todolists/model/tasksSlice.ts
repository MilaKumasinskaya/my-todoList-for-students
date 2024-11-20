import {_tasksApi} from "../api/tasksApi";
import {AppDispatch, RootState} from "../../../app/store";
import {DomainTask, UpdateTaskDomainModel} from "../api/tasksApi.types";
import {ResultCode, TaskStatus} from "common/enums";
import {handleNetworkError, handleServerError} from "common/utils";
import {setAppStatus} from "../../../app/appSlice";
import {createSlice} from "@reduxjs/toolkit";
import {addTodolist, removeTodolist} from "./todolistsSlice";

export type TasksStateType = {
    [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: (create) => ({
        removeTask: create.reducer<{ id: string, taskId: string }>((state, action) => {
            const tasks = state[action.payload.id]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        }),
        addTask: create.reducer<{ task: DomainTask }>((state, action) => {
            const tasks = state[action.payload.task.todoListId]
                tasks.unshift(action.payload.task)

        }),
        updateTask: create.reducer<{ task: DomainTask }>((state, action) => {
            const tasks = state[action.payload.task.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.task.id)
            if (index !== -1) {
                tasks[index] = {...tasks[index], status: action.payload.task.status, title: action.payload.task.title}
            }
        }),
        setTasks: create.reducer<{ id: string, tasks: DomainTask[] }>((state, action) => {
            state[action.payload.id] = action.payload.tasks
        }),
        clearTasks: create.reducer((state, action) => {
            return {}
        }),

    }),
    extraReducers: (builder => {
        builder
            .addCase(addTodolist, ((state, action) => {
                state[action.payload.todolist.id] = []
            }))
            .addCase(removeTodolist, ((state, action) => {
                delete state[action.payload.id];
            }))
    }),
    selectors: {
        selectTasks : (state) => state
    }
})

export const {addTask, clearTasks, setTasks, removeTask, updateTask} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors




export const fetchTasksTC = (id: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _tasksApi.getTasks(id)
        .then(res => {

            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setTasks({id, tasks: res.data.items}))
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
export const removeTaskTC = (payload: { id: string, taskId: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _tasksApi.deleteTask(payload)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(removeTask(payload))
            } else {
                handleServerError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleNetworkError(dispatch, err)
        })
}
export const addTaskTC = (payload: { id: string, title: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _tasksApi.createTask(payload)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(addTask({task: res.data.data.item}))
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
        dispatch(setAppStatus({status: 'loading'}))
        _tasksApi.updateTask({id: task.todoListId, taskId: task.id, model})
            .then((res) => {
                if (res.data.resultCode === ResultCode.Success) {
                    dispatch(setAppStatus({status: 'succeeded'}))
                    dispatch(updateTask({task: res.data.data.item}))
                } else {
                    handleServerError(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleNetworkError(dispatch, err)
            })
    }
}
