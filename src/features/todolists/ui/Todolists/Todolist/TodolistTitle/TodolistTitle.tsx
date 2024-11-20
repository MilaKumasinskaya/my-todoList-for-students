import {
    DomainTodolist
} from "../../../../model/todolistsSlice";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "common/components";
import {useRemoveTodolistMutation, useUpdateTodolistMutation} from "../../../../api/todolistsApi";

type TodolistTitlePropsType = {
    todolist: DomainTodolist
};

export const TodolistTitle = ({todolist}: TodolistTitlePropsType) => {
    const {id, title, entityStatus} = todolist
    const [updateTodolistTitle] = useUpdateTodolistMutation()
    const [removeTodolist] = useRemoveTodolistMutation()

    const onChangeTodoTitleHandler = (title: string) => {
        updateTodolistTitle({id, title})
    }

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    return (
        <Box sx={{display: 'flex', alignItems: ' center', justifyContent: 'center'}}>
            <h3>
                <EditableSpan value={title} onChange={onChangeTodoTitleHandler} disabled={entityStatus === 'loading'}/>
            </h3>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </Box>
    );
};