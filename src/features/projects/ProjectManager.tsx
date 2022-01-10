import AddIcon from '@mui/icons-material/Add'
import { Box, Fab } from '@mui/material'
import { useEffect, useState, VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Project } from '../../types/types'
import ProjectForm from './ProjectForm'
import ProjectList from './ProjectList'
import { createProject, deleteProject, selectProjects, selectSelectedProject, setSelectedProject, updateProject } from './projectsSlice'

const ProjectManager: VFC = () => {
  const dispatch = useDispatch()
  const [createNewProject, setCreateNewProject] = useState<boolean>(false)

  const projects = useSelector(selectProjects)
  const selectedProjects = useSelector(selectSelectedProject)

  const showForm = createNewProject || selectedProjects

  useEffect(() => {
    return () => {
      dispatch(setSelectedProject(undefined))
      setCreateNewProject(false)
    }
  }, [setCreateNewProject, dispatch])

  const closeForm = () => {
    dispatch(setSelectedProject(undefined))
    setCreateNewProject(false)
  }

  const onSelect = (project: Project) => {
    dispatch(setSelectedProject(project))
  }

  const onUpdate = (project: Project) => {
    dispatch(updateProject(project))
    closeForm()
    // setShowFeedback({ open: true, message: 'Session successfully updated' })
  }

  const onCreate = (project: Partial<Project>) => {
    dispatch(createProject(project))
    closeForm()
    // setShowFeedback({ open: true, message: 'Session successfully created' })
  }

  const onDelete = (project: Project) => {
    dispatch(deleteProject(project))
    closeForm()
    // setShowFeedback({ open: true, message: 'Session successfully deleted' })
  }

  return (
    <Box height={'100%'} overflow={'auto'} position={'relative'}>
      {!showForm && <ProjectList projects={projects} onSelect={onSelect} />}

      {showForm && (
        <ProjectForm
          variant={selectedProjects ? 'update' : 'create'}
          project={selectedProjects}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onCancle={closeForm}
        />
      )}
      {!showForm && (
        <Fab
          size="medium"
          aria-label="add"
          sx={{ position: 'fixed', bottom: '70px', right: '10px' }}
          onClick={() => setCreateNewProject((prev) => !prev)}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  )
}

export default ProjectManager
