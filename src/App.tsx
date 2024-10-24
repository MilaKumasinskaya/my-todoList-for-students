import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from "@mui/material/Box";

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
export type TasksStateType = {
    [key: string]: TaskType[]
}
type ThemeMode = 'dark' | 'light'

function App() {
    const todolist1 = v1()
    const todolist2 = v1()
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist1, title: 'What to read', filter: 'all', data: '01.01.24'},
        {id: todolist2, title: 'What to learn', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist1]: [],
        [todolist2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#658764'
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const updateTodoTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map((tl) => tl.id === todolistId ? {...tl, title} : tl))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((tl) => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks(
            {...tasks, [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? {...t, isDone: taskStatus} : t)}
        )
    }

    const updateTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks(
            {...tasks, [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? {...t, title} : t)}
        )
    }

    const deleteTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId)})
    }

    const filterTasks = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map((tl) => tl.id === todolistId ? {...tl, filter} : tl))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <AppBar position="static" >
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Box>
                            <Button color="inherit">Login</Button>
                            <Button color="inherit">LogOut</Button>
                            <Button color="inherit">Faq</Button>
                            <Switch color={'default'} onChange={changeModeHandler} />
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container fixed sx={{m: '20px'}}>
                    <Grid container sx={{ m: '30px' }}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                            }
                            return (
                                <Grid item xs={3}>
                                    <Paper square={false} variant="elevation" elevation={2} sx={{ p: '20px' }}>
                                        <Todolist
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            data={tl.data}
                                            filter={tl.filter}
                                            updateTodoTitle={updateTodoTitle}
                                            removeTodolist={removeTodolist}
                                            addTask={addTask}
                                            updateTaskTitle={updateTaskTitle}
                                            deleteTask={deleteTask}
                                            filterTasks={filterTasks}
                                            changeTaskStatus={changeTaskStatus}/>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
