import { Box, Card, CardContent, Typography } from '@mui/material'
import { VFC } from 'react'
import { Project } from '../../types/types'

interface ProjectProps {
  project: Project
}

const ProjectItem: VFC<ProjectProps> = ({ project }) => {
  return (
    <Card sx={{ width: '100%', padding: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={project.color} gutterBottom>
          {project.name}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" component="div">
            Rate {project.rate}€
          </Typography>
          <Typography variant="h6" component="div"></Typography>
          <Typography variant="h6" component="div"></Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProjectItem
