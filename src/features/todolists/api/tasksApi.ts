import {instance} from "common/instance";
import {DomainTask, GetTasksResponse, UpdateTaskDomainModel} from "./tasksApi.types";
import {BaseResponse} from "common/types";
import {baseApi} from "../../../app/baseApi";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, string>({
            query: (id) => `todo-lists/${id}/tasks`,
            providesTags: ['Task']
        }),
        addTask: build.mutation<BaseResponse<{item: DomainTask}>, { id: string, title: string }>({
            query: ({id, title}) => {
                return {
                    url: `todo-lists/${id}/tasks`,
                    method: 'POST',
                    body: {title}
                }
            },
            invalidatesTags: ['Task']
        }),
        updateTask: build.mutation<BaseResponse, {id: string, taskId: string, model: UpdateTaskDomainModel}>({
            query: ({id, taskId, model}) => {
                return {
                    url: `todo-lists/${id}/tasks/${taskId}`,
                    method: 'PUT',
                    body: model
                }
            },
            invalidatesTags: ['Task']
        }),
        removeTask: build.mutation<BaseResponse, {id: string, taskId: string}>({
            query: ({id, taskId}) => {
                return {
                    url: `todo-lists/${id}/tasks/${taskId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Task']
        })
    })
})

export const {useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useRemoveTaskMutation} = tasksApi


export const _tasksApi = {
    getTasks(id: string){
        return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
    },
    createTask(payload: {id: string, title: string }){
        const {id, title} = payload
        return instance.post<BaseResponse<{item: DomainTask}>>(`todo-lists/${id}/tasks`, {title})
    },
    deleteTask(payload: {id: string, taskId: string}){
        const {id, taskId} = payload
        return instance.delete<BaseResponse>(`todo-lists/${id}/tasks/${taskId}`)
    },
    updateTask(payload: {id: string, taskId: string, model: UpdateTaskDomainModel}){
        const {id, taskId, model} = payload
        return instance.put(`todo-lists/${id}/tasks/${taskId}`, model)
    }
}