import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import Typography from "@mui/material/Typography"
import { TodolistType } from "../../../model/todolists-reducer"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskAC } from "../../../model/tasks-reducer"
import {useAppDispatch} from "common/hooks";


type TodolistPropsType = {
  todolist: TodolistType
}

export const Todolist = ({ todolist }: TodolistPropsType) => {
  const dispatch = useAppDispatch()

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC({ todolistId: todolist.id, title }))
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
      <Typography>{todolist.data}</Typography>
    </>
  )
}
