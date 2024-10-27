import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from "../../../../model/todolists-reducer";
import Box from "@mui/material/Box";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type TodolistTitlePropsType = {
    todolist: TodolistType
};

export const TodolistTitle = ({todolist}: TodolistTitlePropsType) => {
    const dispatch = useAppDispatch()

    const onChangeTodoTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id: todolist.id, title}))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todolist.id))

    }

    return (
        <Box sx={{display: 'flex', alignItems: ' center', justifyContent: 'center'}}>
            <h3>
                <EditableSpan value={todolist.title} onChange={onChangeTodoTitleHandler}/>
            </h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </Box>
    );
};