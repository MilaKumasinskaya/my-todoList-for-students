import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import {Task} from "./Task/Task";
import {TasksSkeleton} from "../../../skeletons/TasksSkeleton/TasksSkeleton";
import {TasksPagination} from "../TasksPagination/TasksPagination";
import {DomainTodolist} from "../../../../api/todolistsApi";
import {useTasks} from "../../../../lib/hooks/useTasks";

type TasksPropsType = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: TasksPropsType) => {
    const { tasks, isLoading, totalCount, page, setPage } = useTasks(todolist)

    if (isLoading) {
        return <TasksSkeleton />
    }

    return (
        <>
            {tasks?.length === 0 ?
                <Typography>tasks' list is empty</Typography> :
                <>
                    <List>
                        {tasks?.map((t) => {
                            return <Task key={t.id} todolist={todolist} task={t}/>
                        })}
                    </List>
                    <TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />
                </>
            }
        </>
    );
};