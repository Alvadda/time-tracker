import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Checkbox, TextField } from '@mui/material'
import { useEffect, VFC } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormBox from '../../components/FormBox'
import { Task } from '../../types'

interface TaskFormProps {
  task?: Task
  isUpdate: boolean
  onUpdate: (task: Task) => void
  onCreate: (task: Partial<Task>) => void
  onDelete: (task: Task) => void
  onCancle: () => void
}

interface TaskFormData {
  name: string
  description?: string
  color: string
  isFavorite: boolean
}

const TaskForm: VFC<TaskFormProps> = ({ task, isUpdate, onCreate, onUpdate, onDelete, onCancle }) => {
  const {
    register,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      color: '#b32aa9',
      isFavorite: false,
    },
  })
  const { t } = useTranslation()
  const isFavorite = watch('isFavorite')

  const getFormData = () => {
    const data = getValues()

    return {
      name: data.name,
      description: data.description,
      color: data.color,
      isFavorite: data.isFavorite,
    }
  }

  useEffect(() => {
    if (task) {
      setValue('name', task.name)
      setValue('description', task.description)
      setValue('color', task.color)
      setValue('isFavorite', Boolean(task.isFavorite))
    }
  }, [task, setValue])

  const createTask = async () => {
    const isValid = await trigger()

    if (isValid) onCreate(getFormData())
  }

  const updateTask = () => {
    if (task) {
      onUpdate({
        ...task,
        ...getFormData(),
      })
    }
  }

  const deleteTask = () => {
    if (task) {
      onDelete(task)
    }
  }

  return (
    <FormBox
      header={t('common.task')}
      isValid={true}
      update={isUpdate}
      onCreate={createTask}
      onUpdate={updateTask}
      onDelete={deleteTask}
      onClose={onCancle}
    >
      <TextField
        inputProps={{ 'data-testid': 'task_name' }}
        label={t('task.name')}
        variant="standard"
        {...register('name', { required: true })}
        error={Boolean(errors.name)}
      />
      <TextField
        inputProps={{ 'data-testid': 'task_description' }}
        label={t('task.description')}
        variant="standard"
        multiline
        rows={7}
        {...register('description')}
      />
      <HexColorPicker data-testid="task_color" color={watch('color')} onChange={(color) => setValue('color', color)} />
      <Checkbox
        icon={<StarBorderIcon />}
        checkedIcon={<StarIcon />}
        inputProps={{ 'data-testid': 'task_favorite' }}
        value={isFavorite}
        checked={isFavorite}
        onChange={() => setValue('isFavorite', !isFavorite)}
      />
    </FormBox>
  )
}
export default TaskForm
