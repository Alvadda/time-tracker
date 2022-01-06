import { Box, Button, TextField } from '@mui/material'
import { useState, VFC } from 'react'
import { HexColorPicker } from 'react-colorful'

interface ProjectFormProps {
  onAdd: (name: string, rate: number, color: string) => void
}

const ProjectForm: VFC<ProjectFormProps> = ({ onAdd }) => {
  const [color, setColor] = useState<string>('#b32aa9')
  const [name, setName] = useState<string>('')
  const [rate, setRate] = useState<string>('')

  const createProject = () => {
    onAdd(name, +rate, color)
  }

  const isProjectValid = () => {
    return !Boolean(color && name && rate)
  }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '100%' },
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
    >
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
      <Button variant="contained" onClick={createProject} disabled={isProjectValid()}>
        ADD
      </Button>
    </Box>
  )
}

export default ProjectForm
