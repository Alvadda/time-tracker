import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
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
    return !Boolean(color && name && rate)
  }
  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        height: '100%',
        padding: 2,
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <Paper sx={{ padding: 2 }}>
        <Typography align="center" marginBottom={4} variant="h5" component={'h3'}>
          {isUpdate ? 'Update the selected project' : 'Create a new project'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', alignContent: 'center', marginBottom: 4 }}>
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
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Button
            variant="contained"
            disabled={isProjectValid()}
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
      </Paper>
    </Box>
  )
}

export default ProjectForm
