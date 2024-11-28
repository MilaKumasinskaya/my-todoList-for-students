import {Todolist} from "./todolistsApi.types";
import {BaseResponse} from "common/types";
import {baseApi} from "../../../app/baseApi";
import {RequestStatus} from "../../../app/appSlice";
export type FilterValuesType = 'all' | 'completed' | 'active'
export type DomainTodolist = Todolist & {
    filter: FilterValuesType,
    entityStatus: RequestStatus
}


export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTodolists: build.query<DomainTodolist[], void>({
            query: () => 'todo-lists',
            transformResponse(todolists: Todolist[]): DomainTodolist[] {
                return todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
            },
            providesTags: ['Todolist']
        }),
        addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
            query: (title) => {
                return {
                    url: 'todo-lists',
                    method: 'POST',
                    body: {title}
                }
            },
            invalidatesTags: ['Todolist']
        }),
        updateTodolist: build.mutation<BaseResponse, { id: string, title: string }>({
            query: ({id, title}) => {
                return {
                    url: `todo-lists/${id}`,
                    method: 'PUT',
                    body: {title}
                }
            },
            invalidatesTags: ['Todolist']
        }),
        removeTodolist: build.mutation<BaseResponse, string>({
            query: (id) => {
                return {
                    url: `todo-lists/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Todolist']
        }),
    }),
})

export const {
    useGetTodolistsQuery,
    useAddTodolistMutation,
    useUpdateTodolistMutation,
    useRemoveTodolistMutation
} = todolistsApi
