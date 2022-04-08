import { useSelector } from 'react-redux'
import { selectTasks } from './taskSlice'

export const useTask = () => {
  const tasks = useSelector(selectTasks)

  const getTaskNamesByIds = (ids: string[]) => {
    return tasks.filter((task) => ids.includes(task.id)).map((task) => task.name)
  }

  return {
    getTaskNamesByIds,
  }
}
