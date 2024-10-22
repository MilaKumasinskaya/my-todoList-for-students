import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


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
                <Box sx={{display: 'flex', alignItems:' center', justifyContent: 'center'}}>
                    <h3>
                        <EditableSpan value={title} onChange={onChangeTodoTitleHandler}/>
                    </h3>
                    <IconButton onClick={removeTodolistHandler}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <AddItemForm addItem={addTaskHandler}/>

                {tasks.length === 0 ?
                    <Typography>tasks' list is empty</Typography> :
                    <List>
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
                                <ListItem key={t.id}
                                          sx={{
                                              p: 0,
                                              justifyContent: 'space-between',
                                              opacity: t.isDone ? 0.5 : 1,}}
                                          disableGutters
                                          disablePadding>
                                    <Checkbox checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                                    <EditableSpan value={t.title} onChange={onChangeTaskTitleHandler} isDone={t.isDone}/>
                                    <IconButton onClick={deleteTaskHandler}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>)
                        })}
                    </List>}

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
                <Typography>{data}</Typography>
            </div>
        );
    }
;