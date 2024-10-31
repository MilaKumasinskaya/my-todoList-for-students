import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from "../tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "common/enums";


let todolistId1: string
let todolistId2: string
let startState: TasksStateType = {}
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        todolistId1: [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatus.New,
                addedDate: '',
                startDate: '',
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                order: 0,
                todoListId: 'todolistId1'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatus.Completed,
                addedDate: '',
                startDate: '',
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                order: 0,
                todoListId: 'todolistId1'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatus.New,
                addedDate: '',
                startDate: '',
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                order: 0,
                todoListId: 'todolistId1'
            },
        ],
        todolistId2: [
            {
                id: '1',
                title: 'bread',
                status: TaskStatus.New,
                addedDate: '',
                startDate: '',
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                order: 0,
                todoListId: 'todolistId2'
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatus.Completed,
                addedDate: '',
                startDate: '',
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                order: 0,
                todoListId: 'todolistId2'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatus.New,
                addedDate: '',
                startDate: '',
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                order: 0,
                todoListId: 'todolistId2'
            },
        ],
    }
})


test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC({id: 'todolistId2', taskId: '2'}))

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy()
})
test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState,
        addTaskAC({
            task: {
                todoListId: 'todolistId2',
                title: 'juice',
                status: TaskStatus.New,
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: 0,
                startDate: "",
                id: "id exists",
            }
        }))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatus.New)
})
test('status of specified task should be changed', () => {

    const endState = tasksReducer(
        startState,
        updateTaskAC({task:{
                description: '',
                title: '',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        })
    )

    expect(endState['todolistId2'][0].status).toBe(TaskStatus.New)
    expect(endState['todolistId2'][1].status).toBe(TaskStatus.Completed)
})
test('title of specified task should be changed', () => {

    const endState = tasksReducer(
        startState,
        updateTaskAC({task:{
                description: '',
                title: 'book',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        })
    )

    expect(endState['todolistId2'][0].title).toBe('bread')
    expect(endState['todolistId2'][1].title).toBe('book')
})
test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addTodolistAC({id: 'todo', title: 'new todolist', addedDate: '', order: 0}))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})