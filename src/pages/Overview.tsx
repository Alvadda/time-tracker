import { DatePicker } from '@mui/lab'
import { Box, Divider, Grid, List, ListItem, ListItemButton, TextField, Typography } from '@mui/material'
import moment, { Moment } from 'moment'
import { lazy, Suspense, useState, VFC } from 'react'
import { isBrowser, isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import ProjectStatsOverview from '../features/overview/ProjectStatsOverview'
import { selectProjectsInRage } from '../features/projects/projectsSlice'
import { ProjectStats } from '../types'
import { formatDateShort, getDateFormatShort, getRoundedHours, timeInMiliseconds } from '../utils/timeUtil'

const Timesheet = lazy(() => import('../features/overview/Timesheet'))
const ProjectOverview = lazy(() => import('../features/overview/ProjectOverview'))

const Overview: VFC = ({}) => {
  const defaultFromDate = moment().subtract(7, 'd').startOf('day')
  const defaultToDate = moment().endOf('day')

  const { t } = useTranslation()
  const [fromDate, setFromDate] = useState<Moment>(defaultFromDate)
  const [toDate, setToDate] = useState<Moment>(defaultToDate)
  const [selectedProjectStats, setSelectedProjectStats] = useState<ProjectStats | undefined>()

  const fromInMS = timeInMiliseconds(fromDate)
  const toInMS = timeInMiliseconds(toDate)
  const formatPeriod = `${formatDateShort(fromDate)} - ${formatDateShort(toDate)}`

  const projectStats = useSelector(selectProjectsInRage(fromInMS, toInMS))

  const projectStatsWithSession = projectStats.filter((project) => project.sessions.length > 0)

  const { totalEarning, totalHours } = projectStats.reduce(
    (sum, projectStats) => {
      const hours = getRoundedHours(projectStats.totalMinutesWorked)

      return {
        totalEarning: sum.totalEarning + hours * projectStats.rate,
        totalHours: sum.totalHours + hours,
      }
    },
    { totalEarning: 0, totalHours: 0 }
  )

  return (
    <Grid container sx={{ height: '100%', flexDirection: 'column', flexWrap: 'nowrap' }} justifyContent={'center'}>
      <Grid item container sx={{ flex: '0 0 40px', display: 'felx', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        <Typography variant="h6" data-testid="page_header">
          {t('nav.overview')}
        </Typography>
      </Grid>
      <Grid item container flexDirection={'column'} overflow={'hidden'}>
        <Box padding={2} display={'flex'} gap={2}>
          <DatePicker
            renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} data-testid="overview_from" />}
            label={t('overview.from')}
            value={fromDate}
            inputFormat={getDateFormatShort()}
            mask={getDateFormatShort()}
            onChange={(newValue) => {
              setFromDate(newValue || defaultFromDate)
            }}
          />
          <DatePicker
            renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} data-testid="overview_to" />}
            label={t('overview.to')}
            value={toDate}
            inputFormat={getDateFormatShort()}
            mask={getDateFormatShort()}
            minDate={fromDate}
            onChange={(newValue) => {
              setToDate(newValue || defaultToDate)
            }}
          />
        </Box>

        <Box padding={2} width={'100%'}>
          <ProjectStatsOverview header={t('overview.total')} time={totalHours} earning={totalEarning} />
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
                  time={getRoundedHours(projectStats.totalMinutesWorked)}
                  earning={getRoundedHours(projectStats.totalMinutesWorked) * projectStats.rate}
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
