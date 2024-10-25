import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import {TodolistType} from "../../../../model/todolists-reducer";
import {Task} from "./Task/Task";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {selectTasks} from "../../../../model/tasksSelectors";

type TasksPropsType = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: TasksPropsType) => {
    const tasks = useAppSelector(selectTasks)

    let tasksForTodolist = tasks[todolist.id]
    if (todolist.filter === "active") {
        tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks[todolist.id].filter(t => t.isDone)
    }

    return (
        <>
            {tasksForTodolist.length === 0 ?
                <Typography>tasks' list is empty</Typography> :
                <List>
                    {tasksForTodolist.map((t) => {
                        return <Task key={t.id} todolist={todolist} task={t}/>
                    })}
                </List>}
        </>
    );
};