import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    data?: string
    filter: FilterValuesType
    updateTodoTitle: (todolistId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    updateTaskTitle: (taskId: string, title: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void
    filterTasks: (filer: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
};

export const Todolist = ({
                             todolistId,
                             title,
                             tasks,
                             data,
                             filter,
                             updateTodoTitle,
                             removeTodolist,
                             addTask,
                             updateTaskTitle,
                             deleteTask,
                             filterTasks,
                             changeTaskStatus
                         }: TodolistPropsType) => {

        const allFilerTasksHandler = () => {
            filterTasks('all', todolistId)
        }

        const activeFilerTasksHandler = () => {
            filterTasks('active', todolistId)
        }

        const completedFilerTasksHandler = () => {
            filterTasks('completed', todolistId)
        }

        const onChangeTodoTitleHandler = (title: string) => {
            updateTodoTitle(todolistId, title)
        }

        const removeTodolistHandler = () => {
            removeTodolist(todolistId)
        }

        const addTaskHandler = (title: string) => {
            addTask(title, todolistId)
        }

        return (
            <div>
                <div className={'todolist-title-container'}>
                    <EditableSpan value={title} onChange={onChangeTodoTitleHandler}/>
                    <Button title={'x'} onClick={removeTodolistHandler}/>
                </div>
                <AddItemForm addItem={addTaskHandler}/>

                {tasks.length === 0 ?
                    <p>tasks' list is empty</p> :
                    <ul>
                        {tasks.map((t) => {

                            const onChangeTaskTitleHandler = (title: string) => {
                                updateTaskTitle(t.id, title, todolistId)
                            }

                            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const taskStatus = e.currentTarget.checked
                                changeTaskStatus(t.id, taskStatus, todolistId)
                            }
                            const deleteTaskHandler = () => {
                                deleteTask(t.id, todolistId)
                            }

                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                                    <EditableSpan value={t.title} onChange={onChangeTaskTitleHandler} isDone={t.isDone}/>
                                    <Button onClick={deleteTaskHandler} title='x'/>
                                </li>)
                        })}
                    </ul>}

                <div>
                    <Button
                        className={filter === 'all' ? 'active-filter' : ''}
                        onClick={allFilerTasksHandler}
                        title='All'/>
                    <Button
                        className={filter === 'active' ? 'active-filter' : ''}
                        onClick={activeFilerTasksHandler}
                        title='Active'/>
                    <Button
                        className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={completedFilerTasksHandler}
                        title='Completed'/>
                </div>
                <span>{data}</span>
            </div>
        );
    }
;