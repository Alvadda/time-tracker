import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect, useState, VFC } from 'react'
import { HexColorPicker } from 'react-colorful'
import FormBox from '../../components/FormBox'
import { Customer, Project } from '../../types/types'

interface ProjectFormProps {
  variant?: 'create' | 'update'
  project?: Project
  customers?: Customer[]
  onUpdate: (project: Project) => void
  onCreate: (project: Partial<Project>) => void
  onDelete: (project: Project) => void
  onCancle: () => void
}

const getRateAsNumber = (rate: string) => {
  return rate ? Number(rate) : undefined
}

const ProjectForm: VFC<ProjectFormProps> = ({ variant = 'update', project, customers, onCancle, onCreate, onUpdate, onDelete }) => {
  const [customerSelect, setCustomerSelect] = useState<string>('')
  const [color, setColor] = useState<string>('#b32aa9')
  const [name, setName] = useState<string>('')
  const [rate, setRate] = useState<string>('')

  const isUpdate = variant === 'update'

  const projectFromForm: Partial<Project> = {
    name,
    rate: getRateAsNumber(rate),
    color,
    customerId: customerSelect,
  }

  useEffect(() => {
    if (project) {
      setName(project.name)
      setRate(project.rate?.toString() || '')
      setColor(project.color)
      setCustomerSelect(project.customerId || '')
    }
  }, [project, customers])

  const updateProject = () => {
    if (project) {
      onUpdate({
        ...project,
        ...projectFromForm,
      })
    }
  }

  const deleteProject = () => {
    if (project) {
      onDelete(project)
    }
  }

  const isProjectValid = () => {
    return Boolean(color && name && rate)
  }
  return (
    <FormBox
      header="Project"
      isValid={isProjectValid()}
      update={isUpdate}
      onCreate={() => onCreate(projectFromForm)}
      onUpdate={updateProject}
      onDelete={deleteProject}
      onClose={onCancle}
    >
      <TextField label="Name" variant="standard" value={name} onChange={(event) => setName(event.target.value)} />
      <TextField label="Rate" variant="standard" type="number" value={rate} onChange={(event) => setRate(event.target.value)} />
      <FormControl>
        <InputLabel>Customer</InputLabel>
        <Select label="Customer" variant="standard" value={customerSelect} onChange={(event) => setCustomerSelect(event.target.value)}>
          {customers?.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <HexColorPicker color={color} onChange={setColor} />
    </FormBox>
  )
}

export default ProjectForm
