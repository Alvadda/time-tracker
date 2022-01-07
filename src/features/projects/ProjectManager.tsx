import AddIcon from '@mui/icons-material/Add'
import { Box, Fab, Paper, Stack } from '@mui/material'
import { useState, VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjectForm from './ProjectForm'
import ProjectItem from './ProjectItem'
import { createProject, selectProjects } from './projectsSlice'

const ProjectManager: VFC = () => {
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false)

  const projects = useSelector(selectProjects)

  const onAdd = (name: string, rate: number, color: string) => {
    dispatch(
      createProject({
        name,
        rate,
        color,
      })
    )
  }

  return (
    <Box height={'100%'} overflow={'auto'} position={'relative'}>
      <Stack spacing={2}>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </Stack>
      {showForm && (
        <Paper
          sx={{
            width: '100%',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          elevation={4}
        >
          <ProjectForm onAdd={onAdd} />
        </Paper>
      )}
      <Fab size="medium" aria-label="add" sx={{ position: 'absolute', bottom: 0, right: 0 }} onClick={() => setShowForm((prev) => !prev)}>
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default ProjectManager
