import { instance } from "common/instance/instance"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { ChangeEvent } from "react"
import { TaskStatus } from "common/enums/enums"
import { BaseResponse } from "common/types"

export const tasksApi = {
  getTasks(id: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
  },
  createTask(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${id}/tasks`, { title })
  },
  deleteTask(payload: { id: string; taskId: string }) {
    const { id, taskId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${id}/tasks/${taskId}`)
  },
  updateTask(payload: {id: string, taskId: string, model: UpdateTaskModel}) {
    const { id, taskId, model} = payload

    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${id}/tasks/${taskId}`, model)
  }
}