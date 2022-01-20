import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Divider, List, ListItem, ListItemText } from '@mui/material'
import moment from 'moment'
import React, { VFC } from 'react'
import { Project, Session } from '../../types/types'
import { calcEarningFromMin, formatMinToHourMin } from '../../utils/timeUtil'

interface ProjectOverviewProps {
  project: Project
  sessions: Session[]
}

const ProjectOverview: VFC<ProjectOverviewProps> = ({ project, sessions }) => {
  console.log(sessions)

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        inset: '0',
        zIndex: 100,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <Box sx={{ flex: '0 0 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        <Button variant="text" sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }} onClick={() => {}}>
          <CloseIcon fontSize="medium" />
        </Button>
        {project.name}
      </Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {sessions.map((session) => (
          <React.Fragment key={session.id}>
            <ListItem>
              <ListItemText
                primary={moment(session.start).format('DD MMM YYYY')}
                secondary={`${moment(session.start).format('hh:mm')} - ${moment(session.end).format('hh:mm')}`}
              />
              <ListItemText
                primary={`${calcEarningFromMin(session.duration, project.rate)} €`}
                secondary={formatMinToHourMin(session.duration)}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default ProjectOverview
