import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {changeTodolistFilter, DomainTodolist} from "../../../../model/todolistsSlice";
import {useAppDispatch} from "common/hooks";



type FilterTasksButtonsPropsType = {
    todolist: DomainTodolist
}
export const FilterTasksButtons = ({todolist}: FilterTasksButtonsPropsType) => {
    const {filter, id} = todolist
    const dispatch = useAppDispatch()

    const allFilerTasksHandler = () => {
        dispatch(changeTodolistFilter({id, filter: 'all'}))
    }

    const activeFilerTasksHandler = () => {
        dispatch(changeTodolistFilter({id, filter: 'active'}))
    }

    const completedFilerTasksHandler = () => {
        dispatch(changeTodolistFilter({id, filter: 'completed'}))
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