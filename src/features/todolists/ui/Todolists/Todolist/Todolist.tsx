import {DomainTodolist} from "../../../model/todolistsSlice";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import { addTaskTC} from "../../../model/tasksSlice";
import {AddItemForm} from "common/components";
import {useAppDispatch} from "common/hooks";



type TodolistPropsType = {
    todolist: DomainTodolist
};

export const Todolist = ({todolist}: TodolistPropsType) => {
        const dispatch = useAppDispatch()

        const addTaskHandler = (title: string) => {
            dispatch(addTaskTC({id: todolist.id, title}))
        }

        return (
            <>
                <TodolistTitle todolist={todolist}/>
                <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
                <Tasks todolist={todolist}/>
                <FilterTasksButtons todolist={todolist}/>
            </>
        );
    }
;