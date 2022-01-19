import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Paper } from '@mui/material'
import { VFC } from 'react'
import { Project } from '../../types/types'
import Label from '../settings/components/Label'

interface ProjectProps {
  project: Project
}

const ProjectItem: VFC<ProjectProps> = ({ project }) => {
  return (
    <Paper sx={{ width: '100%', padding: 2, color: project.color }}>
      <Label label={project.name}>
        <OpenInNewIcon />
      </Label>
    </Paper>
  )
}

export default ProjectItem
