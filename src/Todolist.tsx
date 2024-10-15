import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, useState, KeyboardEvent, useRef} from "react";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    data?: string
    filter: FilterValuesType
    addTask: (title: string) => void
    deleteTask: (taskId: string) => void
    filterTasks: (filer: FilterValuesType) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
};
export const Todolist = ({
                             title,
                             tasks,
                             data,
                             filter,
                             addTask,
                             deleteTask,
                             filterTasks,
                             changeTaskStatus
                         }: TodolistPropsType) => {
        // //добавляем заголовок с помощью useRef
        // const inputTitleRef = useRef<HTMLInputElement>(null)
        //добавляе заголовок с помощью useState
        const [taskTitle, setTaskTitle] = useState('')
        //добавляе обработку ошибки с помощью useState
        const [error, setError] = useState<string | null>(null)
        const onChangeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
            setTaskTitle(event.currentTarget.value)
            setError(null)
        }
        const addTaskTitleHandler = () => {
            if (taskTitle.trim() !== '') {
                addTask(taskTitle.trim())
                setTaskTitle('')
            } else {
                setError('enter a task title')
            }
            // console.log(error)
        }
        const addTaskOnEnterTitleHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                addTaskTitleHandler()
            }
            // console.log(error)
        }
        const allFilerTasksHandler = () => {
            filterTasks('all')
        }
        const activeFilerTasksHandler = () => {
            filterTasks('active')
        }
        const completedFilerTasksHandler = () => {
            filterTasks('completed')
        }

        return (
            <div>
                <h3>{title}</h3>
                <div>
                            <input className={error ? 'error' : ''} value={taskTitle} onChange={onChangeTaskTitle}
                                   onKeyDown={addTaskOnEnterTitleHandler}/>
                    {error && <div className={'error-message'}>{error}</div>}
                            <Button title={'+'} onClick={addTaskTitleHandler} disabled={!!error}/>





                    {/*//добавляем заголовок с помощью useRef*/}
                    {/*<input ref={inputTitleRef}/>*/}
                    {/*<Button title='+'*/}
                    {/*        onClick={() => {*/}
                    {/*if(inputTitleRef.current){*/}
                    {/*    addTask(inputTitleRef.current.value)*/}
                    {/*    console.log(inputTitleRef.current.value)*/}
                    {/*}*/}

                    {/*}} />*/}
                </div>

                {tasks.length === 0 ?
                    <p>tasks' list is empty</p> :
                    <ul>
                        {tasks.map((t) => {
                            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const taskStatus = e.currentTarget.checked
                                changeTaskStatus(t.id, taskStatus)
                            }
                            const deleteTaskHandler = () => {
                                deleteTask(t.id)
                            }
                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                                    <span className={t.isDone ? 'isDone' : ''}> {t.title} </span>
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