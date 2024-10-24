import React, {useState} from 'react';
import './App.css';
import {Todolist} from "../Todolist";
import {AddItemForm} from "../AddItemForm";
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
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "../model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";

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

    const todolists = useSelector<RootState, TodolistType[]>(state=>state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state=>state.tasks)

    const dispatch = useDispatch()

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
        dispatch(addTodolistAC(title))
    }

    const updateTodoTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    const removeTodolist = (id: string) => {
        dispatch(removeTodolistAC(id))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, status: taskStatus}))
    }

    const updateTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const deleteTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({todolistId, taskId}))
    }

    const filterTasks = (filter: FilterValuesType, id: string) => {
        dispatch(changeTodolistFilterAC({id, filter}))
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
