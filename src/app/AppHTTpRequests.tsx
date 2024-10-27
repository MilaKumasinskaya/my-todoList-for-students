import {ChangeEvent, useEffect, useState} from "react";
import {tasksApi} from "../features/todolists/api/tasksApi";
import {todolistsApi} from "../features/todolists/api/todolistsApi";
import {Todolist} from "../features/todolists/api/todolistsApi.types";
import {DomainTask, UpdateTaskModel} from "../features/todolists/api/tasksApi.types";
import {AddItemForm} from "common/components/AddItemForm";
import Box from "@mui/material/Box";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "common/components/EditableSpan";
import {TaskStatus} from "common/enums";


export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          if (!tasks[tl.id]) {
            tasks[tl.id] = []
          }
              setTasks((prevState) => {
                return { ...prevState, [tl.id]: res.data.items }
              })
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      setTodolists([res.data.data.item, ...todolists])
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.deleteTodolist(id).then((res) => {
      setTodolists(todolists.filter((tl) => tl.id !== id))
      delete tasks[id]
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then((res) => {
      setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)))
    })
  }

  const createTaskHandler = (id: string, title: string) => {
    tasksApi.createTask({ id, title }).then((res) => {
      const newTask = res.data.data.item
      if (!tasks[id]) {
        tasks[id] = []
      }
      setTasks({ ...tasks, [id]: [newTask, ...tasks[id]] })
    })
  }

  const removeTaskHandler = (id: string, taskId: string) => {
    tasksApi.deleteTask({ id, taskId }).then((res) => {
      setTasks({ ...tasks, [id]: tasks[id].filter((t) => t.id !== taskId) })
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }

    tasksApi.updateTask({ id: task.todoListId, taskId: task.id, model }).then((res) => {
      const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t))
      setTasks({ ...tasks, [task.todoListId]: newTasks })
    })
  }

  const changeTaskTitleHandler = (title: string, task: DomainTask) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }

    tasksApi.updateTask({id: task.todoListId, taskId: task.id, model}).then((res) => {
      const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t))
      setTasks({ ...tasks, [task.todoListId]: newTasks })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <Box>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </Box>
            <AddItemForm addItem={(title) => createTaskHandler(tl.id, title)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatusHandler(e, task)} />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task)} />
                    <button onClick={() => removeTaskHandler(tl.id, task.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
