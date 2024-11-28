import {DomainTask, GetTasksResponse, UpdateTaskDomainModel} from "./tasksApi.types";
import {BaseResponse} from "common/types";
import {baseApi} from "../../../app/baseApi";

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, { id: string, args: {page: number} }>({
            query: ({id, args}) => {
                const params = {...args, count: PAGE_SIZE}
                return {
                    url: `todo-lists/${id}/tasks`,
                    params
                }
            },
            providesTags: (res, err, {id}) =>
                res ? [
                        ...res.items.map(({id}) => ({type: 'Task', id}) as const),
                        {type: 'Task', id},
                    ]
                    : ['Task']
        }),
        addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { id: string, title: string }>({
            query: ({id, title}) => {
                return {
                    url: `todo-lists/${id}/tasks`,
                    method: 'POST',
                    body: {title}
                }
            },
            invalidatesTags: (result, error, {id}) => [{type: 'Task', id}]
        }),
        updateTask: build.mutation<BaseResponse, { id: string, taskId: string, model: UpdateTaskDomainModel }>({
            query: ({id, taskId, model}) => {
                return {
                    url: `todo-lists/${id}/tasks/${taskId}`,
                    method: 'PUT',
                    body: model
                }
            },
            invalidatesTags: (result, error, {taskId}) => [{type: 'Task', id: taskId}]
        }),
        removeTask: build.mutation<BaseResponse, { id: string, taskId: string }>({
            query: ({id, taskId}) => {
                return {
                    url: `todo-lists/${id}/tasks/${taskId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: (result, error, {taskId}) => [{type: 'Task', id: taskId}]
        })
    })
})

export const {useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useRemoveTaskMutation} = tasksApi
