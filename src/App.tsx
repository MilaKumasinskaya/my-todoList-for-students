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
const initTasks: TaskType[] = [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
]

function App() {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [tasks, setTasks] = useState<TaskType[]>(initTasks)
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
setTasks(tasks.map((t)=> t.id === taskId ? {...t, isDone: taskStatus} : t))
    }
    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }
    let tasksForTodolist = tasks
    if(filter === "active"){
         tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if(filter === "completed"){
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    const filterTasks = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    return (
        <div className="App">
            <Todolist
                title='What to read'
                tasks={tasksForTodolist}
                data='01.01.25'
                filter={filter}
                addTask={addTask}
                deleteTask={deleteTask}
                filterTasks={filterTasks}
                changeTaskStatus={changeTaskStatus}/>

        </div>
    );
}

export default App;
