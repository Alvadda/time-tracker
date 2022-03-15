import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import moment from 'moment'
import React, { VFC } from 'react'
import { ProjectStats } from '../../types'
import { APP_WIDTH } from '../../utils/constants '
import { calcEarningFromMin, formatMinToHourMin } from '../../utils/timeUtil'
import { getDurationWithBreak } from '../sessions/sessionUtils'
import { useRate } from '../sessions/useRate'

interface ProjectOverviewProps {
  projectStats: ProjectStats
  onClose: () => void
}

const ProjectOverview: VFC<ProjectOverviewProps> = ({ projectStats, onClose }) => {
  const { getRate } = useRate()

  return (
    <Box
      sx={{
        width: APP_WIDTH,
        height: '100vh',
        position: 'absolute',
        inset: '0',
        zIndex: 100,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: '0 0 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        <Button
          variant="text"
          data-testid="overview_stats_back"
          sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
          onClick={() => onClose()}
        >
          <CloseIcon fontSize="medium" />
        </Button>
        <Typography variant="h6" data-testid="overwiev_project_header">
          {projectStats.project.name}
        </Typography>
      </Box>
      <List sx={{ overflow: 'auto', width: '100%', bgcolor: 'background.paper' }}>
        {projectStats.sessions.map((session) => {
          const duration = getDurationWithBreak(session)
          return (
            <React.Fragment key={session.id}>
              <ListItem data-testid="overview_session">
                <ListItemText
                  primary={moment(session.start).format('DD MMM YYYY')}
                  secondary={`${moment(session.start).format('hh:mm')} - ${moment(session.end).format('hh:mm')}`}
                />
                <ListItemText
                  primary={`${calcEarningFromMin(duration, getRate(session)).toFixed(2)} €`}
                  secondary={formatMinToHourMin(duration)}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        })}
      </List>
    </Box>
  )
}

export default ProjectOverview
