import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {ChangeEvent} from "react";
import {EditableSpan} from "common/components";
import {DomainTodolist} from "../../../../../model/todolistsSlice";
import {DomainTask, UpdateTaskDomainModel} from "../../../../../api/tasksApi.types";
import {TaskStatus} from "common/enums";
import {useRemoveTaskMutation, useUpdateTaskMutation} from "../../../../../api/tasksApi";

type TaskPropsType = {
    todolist: DomainTodolist
    task: DomainTask
};

export const Task = ({todolist, task}: TaskPropsType) => {
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const onChangeTaskTitleHandler = (title: string) => {
        const model: UpdateTaskDomainModel = {
            status: task.status,
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        updateTask({id: task.todoListId, taskId: task.id, model})
    }
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const model: UpdateTaskDomainModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        updateTask({id: task.todoListId, taskId: task.id, model})
    }
    const deleteTaskHandler = () => {
        removeTask({id: todolist.id, taskId: task.id})
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