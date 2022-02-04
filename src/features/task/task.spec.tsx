import { Task } from '../../types/types'
import taskReducer, { addTask, setSelectedTask } from './taskSlice'

describe('feature/sessions', () => {
  describe('reducer', () => {
    const tasks: Task[] = [
      {
        id: '1',
        name: 'task1',
        description: 'task1',
        color: '#fff',
        isFavorite: false,
      },
      {
        id: '2',
        name: 'task2',
        description: 'task2',
        color: '#f1d4d4',
        isFavorite: false,
      },
      {
        id: '3',
        name: 'task3',
        description: 'task3',
        color: '#723535',
        isFavorite: true,
      },
    ]
    test('addTask once', () => {
      const reducer = taskReducer(undefined, addTask(tasks[1]))

      expect(reducer.tasks.length).toEqual(1)
      expect(reducer.tasks[0]).toEqual(tasks[1])
    })

    test('addTask multible', () => {
      let reducer = taskReducer(undefined, addTask(tasks[0]))
      reducer = taskReducer(reducer, addTask(tasks[1]))
      reducer = taskReducer(reducer, addTask(tasks[2]))

      expect(reducer.tasks.length).toEqual(3)
      expect(reducer.tasks).toEqual(tasks)
    })

    test('tasks/getAll/fulfilled', () => {
      const reducer = taskReducer(undefined, { type: 'tasks/getAll/fulfilled', payload: tasks })

      expect(reducer.tasks.length).toEqual(3)
      expect(reducer.tasks).toEqual(tasks)
    })

    test('tasks/create/fulfilled', () => {
      const task: Task = {
        id: '4',
        name: 'task4',
        description: 'task4',
        color: '#723535',
        isFavorite: false,
      }
      let reducer = taskReducer(undefined, { type: 'tasks/getAll/fulfilled', payload: tasks })
      reducer = taskReducer(reducer, { type: 'tasks/create/fulfilled', payload: task })

      expect(reducer.tasks.length).toEqual(4)
      expect(reducer.tasks).toEqual([...tasks, task])
    })

    test('tasks/update/fulfilled', () => {
      const task: Task = {
        id: '1',
        name: 'task4',
        description: 'task4',
        color: '#723535',
        isFavorite: false,
      }
      let reducer = taskReducer(undefined, { type: 'tasks/getAll/fulfilled', payload: tasks })
      reducer = taskReducer(reducer, { type: 'tasks/update/fulfilled', payload: task })

      expect(reducer.tasks.length).toEqual(3)
      expect(reducer.tasks[0]).toEqual(task)
    })

    test('tasks/delete/fulfilled', () => {
      let reducer = taskReducer(undefined, { type: 'tasks/getAll/fulfilled', payload: tasks })
      reducer = taskReducer(reducer, { type: 'tasks/delete/fulfilled', payload: '2' })

      expect(reducer.tasks.length).toEqual(2)
      expect(reducer.tasks).toEqual([tasks[0], tasks[2]])
    })

    test('setSelectedTask', () => {
      const reducer = taskReducer(undefined, setSelectedTask(tasks[1]))

      expect(reducer.selectedTask).toEqual(tasks[1])
    })

    test('setSelectedTask unselect', () => {
      let reducer = taskReducer(undefined, setSelectedTask(tasks[1]))
      reducer = taskReducer(reducer, setSelectedTask(undefined))

      expect(reducer.selectedTask).toEqual(undefined)
    })

    test('unknown action', () => {
      const reducer = taskReducer(undefined, { type: 'UNKNOWN' })

      expect(reducer).toEqual({ tasks: [] })
    })
  })
})
