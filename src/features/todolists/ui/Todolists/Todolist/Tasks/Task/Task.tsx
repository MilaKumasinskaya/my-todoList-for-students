import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {
    removeTaskTC, updateTaskTC
} from "../../../../../model/tasks-reducer";
import {ChangeEvent} from "react";

import {useAppDispatch} from "common/hooks";
import {EditableSpan} from "common/components";
import {DomainTodolist} from "../../../../../model/todolists-reducer";
import {DomainTask} from "../../../../../api/tasksApi.types";
import {TaskStatus} from "common/enums";

type TaskPropsType = {
    todolist: DomainTodolist
    task: DomainTask
};
export const Task = ({todolist, task}: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const onChangeTaskTitleHandler = (title: string) => {
        dispatch(updateTaskTC({id: task.todoListId, taskId: task.id, title}))
    }
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        dispatch(updateTaskTC({id: task.todoListId, taskId: task.id, status}))
    }
    const deleteTaskHandler = () => {
        dispatch(removeTaskTC({id: todolist.id, taskId: task.id}))
    }

    return (
        <ListItem sx={{
            p: 0,
            justifyContent: 'space-between',
            opacity: task.status === TaskStatus.Completed ? 0.5 : 1,
        }}
                  disableGutters
                  disablePadding>
            <Checkbox checked={task.status === TaskStatus.Completed} onChange={onChangeTaskStatusHandler} disabled={todolist.entityStatus === 'loading'}/>
            <EditableSpan value={task.title} onChange={onChangeTaskTitleHandler} isDone={task.status === TaskStatus.Completed} disabled={todolist.entityStatus === 'loading'}/>
            <IconButton onClick={deleteTaskHandler} disabled={todolist.entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>

    );
};