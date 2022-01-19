import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useEffect, useState, VFC } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Project } from '../../types/types'

interface ProjectFormProps {
  variant?: 'create' | 'update'
  project?: Project
  onUpdate?: (project: Project) => void
  onCreate?: (project: Partial<Project>) => void
  onDelete?: (project: Project) => void
  onCancle: () => void
}

const getRateAsNumber = (rate: string) => {
  return rate ? Number(rate) : undefined
}

const ProjectForm: VFC<ProjectFormProps> = ({ variant = 'update', project, onCancle, onCreate, onUpdate, onDelete }) => {
  const [color, setColor] = useState<string>('#b32aa9')
  const [name, setName] = useState<string>('')
  const [rate, setRate] = useState<string>('')

  const isUpdate = variant === 'update'
  useEffect(() => {
    if (project) {
      setName(project.name)
      setRate(project.rate?.toString() || '')
      setColor(project.color)
    }
  }, [project])

  const updateProject = () => {
    if (project && onUpdate) {
      onUpdate({
        ...project,
        name,
        rate: getRateAsNumber(rate),
        color,
      })
    }
  }

  const createProject = () => {
    if (onCreate) {
      onCreate({
        name,
        rate: getRateAsNumber(rate),
        color,
      })
    }
  }

  const deleteProject = () => {
    if (onDelete && project) {
      onDelete(project)
    }
  }

  const isProjectValid = () => {
    return Boolean(color && name && rate)
  }
  return (
    <Box
      component="form"
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        inset: '0',
        zIndex: 100,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ flex: '0 0 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        <Button
          variant="text"
          sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
          onClick={() => onCancle()}
        >
          <CloseIcon fontSize="medium" />
        </Button>
        Project
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          width: '100%',
          height: '100%',
        }}
      >
        <Stack gap={2} width={'100%'}>
          <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={(event) => setName(event.target.value)} />
          <TextField
            id="standard-basic"
            label="Rate"
            variant="standard"
            type="number"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
          />
          <HexColorPicker color={color} onChange={setColor} />
        </Stack>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Button
            variant="contained"
            disabled={!isProjectValid()}
            onClick={() => {
              isUpdate ? updateProject() : createProject()
            }}
          >
            {isUpdate ? 'Update' : 'Create'}
          </Button>
          {isUpdate && (
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteProject()}>
              Delete
            </Button>
          )}
          <Button variant="outlined" onClick={() => onCancle()}>
            cancle
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectForm
