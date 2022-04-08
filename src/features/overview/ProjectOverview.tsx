import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import { PDFDownloadLink } from '@react-pdf/renderer'
import React, { useMemo, VFC } from 'react'
import { useSelector } from 'react-redux'
import { ProjectStats } from '../../types'
import { createCSVDownloadLink, formatCurrency } from '../../utils'
import { APP_WIDTH, HOUR } from '../../utils/constants '
import { calcEarningFromMin, formatDateShort } from '../../utils/timeUtil'
import { getDurationWithBreak, mergeDaysTogether } from '../sessions/sessionUtils'
import { useRate } from '../sessions/useRate'
import { selectTimesheetInfos } from '../settings/settingsSlice'
import { useTask } from '../task/useTask'
import TimesheetPdf from './TimesheetPdf'

interface ProjectOverviewProps {
  projectStats: ProjectStats
  period: string
  onClose: () => void
}

const ProjectOverview: VFC<ProjectOverviewProps> = ({ projectStats, onClose, period }) => {
  const margedDays = useMemo(() => mergeDaysTogether(projectStats.sessions), [projectStats.sessions])
  const { getRate } = useRate()
  const { getTaskNamesByIds } = useTask()

  const timeSheetinfos = useSelector(selectTimesheetInfos)

  const formatedDays = margedDays.map((session) => {
    const duration = getDurationWithBreak(session)
    const earning = calcEarningFromMin(duration, getRate(session))
    return {
      date: formatDateShort(session.start),
      duration: (duration / HOUR).toFixed(0),
      earning: formatCurrency(earning),
      notes: session.note,
      tasks: getTaskNamesByIds(session.taskIds ?? []).join(' '),
    }
  })

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
        {formatedDays.map((day) => {
          return (
            <React.Fragment key={day.date}>
              <ListItem data-testid="overview_session">
                <ListItemText primary={day.date} />
                <ListItemText primary={day.earning} secondary={`${day.duration}h`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        })}
      </List>
      <Box sx={{ flex: '0 1 auto', padding: '16px 16px', display: 'flex', justifyContent: 'center' }}>
        <PDFDownloadLink
          document={
            <TimesheetPdf
              sessions={margedDays}
              projectName={projectStats.project.name}
              customerName={projectStats.customer?.name ?? ''}
              customerAdress={projectStats.customer?.address ?? ''}
              totalMinutesWorked={projectStats.totalMinutesWorked}
              period={period}
              timesheetInfos={timeSheetinfos}
            />
          }
          fileName="etest.pdf"
        >
          {({ loading }) => (loading ? 'downloading...' : <Button variant="contained"> Download </Button>)}
        </PDFDownloadLink>
        <a href={createCSVDownloadLink(formatedDays)} download={'timesheet.csv'}>
          CSV
        </a>
      </Box>
    </Box>
  )
}

export default ProjectOverview
