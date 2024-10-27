import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType } from "../../../../../model/tasks-reducer"
import { ChangeEvent } from "react"
import { TodolistType } from "../../../../../model/todolists-reducer"
import { EditableSpan } from "common/components/EditableSpan"
import {useAppDispatch} from "common/hooks";

type TaskPropsType = {
  todolist: TodolistType
  task: TaskType
}
export const Task = ({ todolist, task }: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const onChangeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId: todolist.id, title, taskId: task.id }))
  }
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const taskStatus = e.currentTarget.checked
    dispatch(changeTaskStatusAC({ todolistId: todolist.id, taskId: task.id, status: taskStatus }))
  }
  const deleteTaskHandler = () => {
    dispatch(removeTaskAC({ todolistId: todolist.id, taskId: task.id }))
  }

  return (
    <ListItem
      sx={{
        p: 0,
        justifyContent: "space-between",
        opacity: task.isDone ? 0.5 : 1,
      }}
      disableGutters
      disablePadding
    >
      <Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler} />
      <EditableSpan value={task.title} onChange={onChangeTaskTitleHandler} isDone={task.isDone} />
      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
