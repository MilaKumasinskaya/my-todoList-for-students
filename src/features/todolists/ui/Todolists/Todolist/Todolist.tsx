import {DomainTodolist} from "../../../model/todolistsSlice";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {AddItemForm} from "common/components";
import {useAddTaskMutation} from "../../../api/tasksApi";

type TodolistPropsType = {
    todolist: DomainTodolist
};

export const Todolist = ({todolist}: TodolistPropsType) => {
    const [addTask] = useAddTaskMutation()

        const addTaskHandler = (title: string) => {
          addTask({id: todolist.id, title})
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