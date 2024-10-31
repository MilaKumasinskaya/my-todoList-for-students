import {
    changeTodolistTitleAC,
    DomainTodolist,
    removeTodolistTC, updateTodolistTitleTC
} from "../../../../model/todolists-reducer";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "common/hooks";
import {EditableSpan} from "common/components";


type TodolistTitlePropsType = {
    todolist: DomainTodolist
};

export const TodolistTitle = ({todolist}: TodolistTitlePropsType) => {
    const {id, title, entityStatus} = todolist
    const dispatch = useAppDispatch()

    const onChangeTodoTitleHandler = (title: string) => {
        dispatch(updateTodolistTitleTC({id, title}))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(id))

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