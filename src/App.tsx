import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    data?: string
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolist1 = v1()
    const todolist2 = v1()
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist1, title: 'What to read', filter: 'all', data:'01.01.24'},
        {id: todolist2, title: 'What to learn', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolist1]: [],
        [todolist2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
    })
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((tl)=>tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks(
            {...tasks, [todolistId]: tasks[todolistId].map((t)=>t.id === taskId ? {...t, isDone: taskStatus} : t)}
        )}

    const deleteTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId] : tasks[todolistId].filter((t)=>t.id !== taskId)})
    }

    const filterTasks = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map((tl)=>tl.id === todolistId ? {...tl, filter} : tl))
    }

    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                }
                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        data={tl.data}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        filterTasks={filterTasks}
                        changeTaskStatus={changeTaskStatus}/>
                )
            })}
        </div>
    );
}

export default App;
