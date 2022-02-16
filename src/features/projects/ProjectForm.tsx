import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect, VFC } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useForm } from 'react-hook-form'
import FormBox from '../../components/FormBox'
import { Customer, Project } from '../../types'

interface ProjectFormProps {
  variant?: 'create' | 'update'
  project?: Project
  customers?: Customer[]
  onUpdate: (project: Project) => void
  onCreate: (project: Partial<Project>) => void
  onDelete: (project: Project) => void
  onCancle: () => void
}
interface ProjectFormData {
  name: string
  customer: string
  rate: number | ''
  color: string
}

const ProjectForm: VFC<ProjectFormProps> = ({ variant = 'update', project, customers, onCancle, onCreate, onUpdate, onDelete }) => {
  const {
    register,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      color: '#b32aa9',
      rate: 0,
      customer: '',
    },
  })
  const isUpdate = variant === 'update'

  useEffect(() => {
    if (project) {
      setValue('name', project.name)
      setValue('customer', project.customerId || '')
      setValue('color', project.color)
      setValue('rate', project.rate)
    }
  }, [project, setValue])

  const getFormData = () => {
    const data = getValues()

    return {
      name: data.name,
      customerId: data.customer,
      color: data.color,
      rate: data.rate || 0,
    }
  }

  const createProject = async () => {
    const isValid = await trigger()

    if (isValid) onCreate(getFormData())
  }

  const updateProject = async () => {
    const isValid = await trigger('name')

    if (project && isValid) {
      onUpdate({
        ...project,
        ...getFormData(),
      })
    }
  }

  const deleteProject = () => {
    if (project) {
      onDelete(project)
    }
  }
  return (
    <FormBox
      header="Project"
      isValid={true}
      update={isUpdate}
      onCreate={createProject}
      onUpdate={updateProject}
      onDelete={deleteProject}
      onClose={onCancle}
    >
      <TextField label="Name" variant="standard" {...register('name', { required: true })} error={Boolean(errors.name)} />
      <TextField label="Rate" variant="standard" type="number" {...register('rate')} />
      <FormControl>
        <InputLabel>Customer</InputLabel>
        <Select
          label="Customer"
          variant="standard"
          value={watch('customer')}
          onChange={(event) => setValue('customer', event.target.value)}
        >
          {customers?.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <HexColorPicker color={watch('color')} onChange={(color) => setValue('color', color)} />
    </FormBox>
  )
}

export default ProjectForm
