import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {changeTodolistFilterAC, TodolistType} from "../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";


type FilterTasksButtonsPropsType = {
    todolist: TodolistType
}
export const FilterTasksButtons = ({todolist}: FilterTasksButtonsPropsType) => {
    const {filter, id} = todolist
    const dispatch = useAppDispatch()

    const allFilerTasksHandler = () => {
        dispatch(changeTodolistFilterAC({id, filter: 'all'}))
    }

    const activeFilerTasksHandler = () => {
        dispatch(changeTodolistFilterAC({id, filter: 'active'}))
    }

    const completedFilerTasksHandler = () => {
        dispatch(changeTodolistFilterAC({id, filter: 'completed'}))
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={filter === 'all' ? 'primary' : 'inherit'}
                onClick={allFilerTasksHandler}
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={filter === 'active' ? 'primary' : 'inherit'}
                onClick={activeFilerTasksHandler}
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={filter === 'completed' ? 'primary' : 'inherit'}
                onClick={completedFilerTasksHandler}
            >
                Completed
            </Button>
        </Box>
    );
};