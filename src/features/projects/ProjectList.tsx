import { List, ListItem, ListItemButton } from '@mui/material'
import React, { VFC } from 'react'
import { Project } from '../../types/types'
import ProjectItem from './ProjectItem'

interface ProjectListProps {
  projects: Project[]
  onSelect: (project: Project) => void
}

const ProjectList: VFC<ProjectListProps> = ({ projects, onSelect }) => {
  return (
    <List>
      {projects.map((project) => (
        <ListItem disablePadding key={project.id}>
          <ListItemButton onClick={() => onSelect(project)}>
            <ProjectItem key={project.id} project={project} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default ProjectList
