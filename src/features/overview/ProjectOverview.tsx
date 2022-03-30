import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import { PDFDownloadLink } from '@react-pdf/renderer'
import React, { useMemo, VFC } from 'react'
import { ProjectStats } from '../../types'
import { APP_WIDTH } from '../../utils/constants '
import { calcEarningFromMin, formatDateLong, formatMinToHourMin, formatTime } from '../../utils/timeUtil'
import { getDurationWithBreak, mergeDaysTogether } from '../sessions/sessionUtils'
import { useRate } from '../sessions/useRate'
import TimesheetPdf from './TimesheetPdf'

interface ProjectOverviewProps {
  projectStats: ProjectStats
  period: string
  onClose: () => void
}

const ProjectOverview: VFC<ProjectOverviewProps> = ({ projectStats, onClose, period }) => {
  const margedDays = useMemo(() => mergeDaysTogether(projectStats.sessions), [projectStats.sessions])
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
      <List sx={{ flex: '1', overflow: 'auto', width: '100%', bgcolor: 'background.paper' }}>
        {margedDays.map((session) => {
          const duration = getDurationWithBreak(session)
          return (
            <React.Fragment key={session.id}>
              <ListItem data-testid="overview_session">
                <ListItemText
                  primary={formatDateLong(session.start)}
                  secondary={`${formatTime(session.start)} - ${formatTime(session.end)}`}
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
      <Box sx={{ flex: '0 1 auto', padding: '16px 16px', display: 'flex', justifyContent: 'center' }}>
        <PDFDownloadLink document={<TimesheetPdf period={period} projectStats={projectStats} />} fileName="etest.pdf">
          {({ loading }) => (loading ? 'downloading...' : <Button variant="contained"> Download </Button>)}
        </PDFDownloadLink>
      </Box>
    </Box>
  )
}

export default ProjectOverview
