import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import {DomainTodolist} from "../../../../model/todolists-reducer";
import {Task} from "./Task/Task";
import {selectTasks} from "../../../../model/tasksSelectors";
import {useAppDispatch, useAppSelector} from "common/hooks";
import {useEffect} from "react";
import {fetchTasksTC} from "../../../../model/tasks-reducer";
import {TaskStatus} from "common/enums";

type TasksPropsType = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: TasksPropsType) => {
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTasksTC(todolist.id))
    }, [])

    let tasksForTodolist = tasks[todolist.id]
    if (todolist.filter === "active") {
        tasksForTodolist = tasks[todolist.id].filter(t => t.status === TaskStatus.New)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks[todolist.id].filter(t => t.status === TaskStatus.Completed)
    }

    return (
        <>
            {tasksForTodolist && tasksForTodolist.length === 0 ?
                <Typography>tasks' list is empty</Typography> :
                <List>
                    {tasksForTodolist && tasksForTodolist.map((t) => {
                        return <Task key={t.id} todolist={todolist} task={t}/>
                    })}
                </List>}
        </>
    );
};