import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useAppDispatch} from "common/hooks";
import {DomainTodolist, FilterValuesType, todolistsApi} from "../../../../api/todolistsApi";



type FilterTasksButtonsPropsType = {
    todolist: DomainTodolist
}
export const FilterTasksButtons = ({todolist}: FilterTasksButtonsPropsType) => {
    const {filter, id} = todolist
    const dispatch = useAppDispatch()

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(
            todolistsApi.util.updateQueryData(
                'getTodolists',
                undefined,
                state => {
                    const index = state.findIndex(tl => tl.id === id)
                    if (index !== -1) {
                        state[index].filter = filter
                    }
                }
            )
        )
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={filter === 'all' ? 'primary' : 'inherit'}
                onClick={()=> changeFilterTasksHandler('all')}
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={filter === 'active' ? 'primary' : 'inherit'}
                onClick={()=> changeFilterTasksHandler('active')}
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={filter === 'completed' ? 'primary' : 'inherit'}
                onClick={()=> changeFilterTasksHandler('completed')}
            >
                Completed
            </Button>
        </Box>
    );
};