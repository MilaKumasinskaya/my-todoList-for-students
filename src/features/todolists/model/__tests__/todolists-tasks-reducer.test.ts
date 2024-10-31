import {addTodolistAC, DomainTodolist, todolistsReducer} from "../todolists-reducer";
import {tasksReducer, TasksStateType} from "../tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: DomainTodolist[] = []

    const action = addTodolistAC({id: 'xxx', title: 'new todolist', addedDate: '', order: 0})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})