import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import {DomainTodolist} from "../../../../model/todolistsSlice";
import {Task} from "./Task/Task";
import {TaskStatus} from "common/enums";
import {useGetTasksQuery} from "../../../../api/tasksApi";

type TasksPropsType = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: TasksPropsType) => {
    const {data} = useGetTasksQuery(todolist.id)

    let tasksForTodolist = data?.items
    if (todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist?.filter(t => t.status === TaskStatus.New)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist?.filter(t => t.status === TaskStatus.Completed)
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