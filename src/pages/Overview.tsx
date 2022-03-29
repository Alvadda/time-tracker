import { DatePicker } from '@mui/lab'
import { Box, Divider, Grid, List, ListItem, ListItemButton, TextField, Typography } from '@mui/material'
import moment, { Moment } from 'moment'
import { lazy, Suspense, useState, VFC } from 'react'
import { isBrowser, isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import ProjectStatsOverview from '../features/overview/ProjectStatsOverview'
import { selectProjectsInRage } from '../features/projects/projectsSlice'
import { ProjectStats } from '../types'
import { getLocalDateFormatShort, timeInMiliseconds } from '../utils/timeUtil'

const Timesheet = lazy(() => import('../features/overview/Timesheet'))
const ProjectOverview = lazy(() => import('../features/overview/ProjectOverview'))

const Overview: VFC = ({}) => {
  const defaultFromDate = moment().subtract(7, 'd').startOf('day')
  const defaultToDate = moment().endOf('day')

  const [fromDate, setFromDate] = useState<Moment>(defaultFromDate)
  const [toDate, setToDate] = useState<Moment>(defaultToDate)
  const [selectedProjectStats, setSelectedProjectStats] = useState<ProjectStats | undefined>()

  const fromInMS = timeInMiliseconds(fromDate)
  const toInMS = timeInMiliseconds(toDate)
  const formatPeriod = `${fromDate.format('DD.MM.YYYY')} - ${toDate.format('DD.MM.YYYY')}`

  const projectStats = useSelector(selectProjectsInRage(fromInMS, toInMS))

  const projectStatsWithSession = projectStats.filter((project) => project.sessions.length > 0)

  const { totalEarning, totalMinutes } = projectStats.reduce(
    (sum, projectStats) => {
      return {
        totalEarning: sum.totalEarning + projectStats.totalEarning,
        totalMinutes: sum.totalMinutes + projectStats.totalMinutesWorked,
      }
    },
    { totalEarning: 0, totalMinutes: 0 }
  )

  return (
    <Grid container sx={{ height: '100%', flexDirection: 'column', flexWrap: 'nowrap' }} justifyContent={'center'}>
      <Grid item container sx={{ flex: '0 0 40px', display: 'felx', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        <Typography variant="h6" data-testid="page_header">
          Overview
        </Typography>
      </Grid>
      <Grid item container flexDirection={'column'} overflow={'hidden'}>
        <Box padding={2} display={'flex'} gap={2}>
          <DatePicker
            renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} data-testid="overview_from" />}
            label="From"
            value={fromDate}
            inputFormat={getLocalDateFormatShort()}
            mask={getLocalDateFormatShort()}
            onChange={(newValue) => {
              setFromDate(newValue || defaultFromDate)
            }}
          />
          <DatePicker
            renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} data-testid="overview_to" />}
            label="To"
            value={toDate}
            inputFormat={getLocalDateFormatShort()}
            mask={getLocalDateFormatShort()}
            minDate={fromDate}
            onChange={(newValue) => {
              setToDate(newValue || defaultToDate)
            }}
          />
        </Box>

        <Box padding={2} width={'100%'}>
          <ProjectStatsOverview header="Total" time={totalMinutes} earning={totalEarning} />
        </Box>
        <Divider />
      </Grid>
      <Grid item sx={{ flex: '1 0', width: '100%', overflow: 'auto', position: 'relative' }}>
        <List>
          {projectStatsWithSession.map((projectStats) => (
            <ListItem disablePadding key={projectStats.project.id}>
              <ListItemButton onClick={() => setSelectedProjectStats(projectStats)}>
                <ProjectStatsOverview
                  header={projectStats.project.name}
                  headerColor={projectStats.project.color}
                  time={projectStats.totalMinutesWorked}
                  earning={projectStats.totalEarning}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Suspense fallback={<div />}>
        {isMobile && selectedProjectStats && (
          <ProjectOverview period={formatPeriod} onClose={() => setSelectedProjectStats(undefined)} projectStats={selectedProjectStats} />
        )}
        {isBrowser && selectedProjectStats && (
          <Timesheet period={formatPeriod} onClose={() => setSelectedProjectStats(undefined)} projectStats={selectedProjectStats} />
        )}
      </Suspense>
    </Grid>
  )
}

export default Overview
