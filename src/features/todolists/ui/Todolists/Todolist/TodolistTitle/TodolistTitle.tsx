import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "common/components";
import {
    DomainTodolist,
    todolistsApi,
    useRemoveTodolistMutation,
    useUpdateTodolistMutation
} from "../../../../api/todolistsApi";
import {useAppDispatch} from "common/hooks";
import {RequestStatus} from "../../../../../../app/appSlice";

type TodolistTitlePropsType = {
    todolist: DomainTodolist
};

export const TodolistTitle = ({todolist}: TodolistTitlePropsType) => {
    const {id, title, entityStatus} = todolist
    const [updateTodolistTitle] = useUpdateTodolistMutation()
    const [removeTodolist] = useRemoveTodolistMutation()
    const dispatch = useAppDispatch()

    const onChangeTodoTitleHandler = (title: string) => {
        updateTodolistTitle({id, title})
    }
const updateQueryData = (status: RequestStatus) => {
    dispatch(todolistsApi.util.updateQueryData(
        'getTodolists',
        undefined,
        state => {
            const index = state.findIndex(tl => tl.id === id)
            if (index !== -1) {
                state[index].entityStatus = status
            }
        }))
}
    const removeTodolistHandler = () => {
        updateQueryData('loading')
        removeTodolist(id)
            .unwrap()
            .catch(()=>{
                updateQueryData('idle')
            })
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