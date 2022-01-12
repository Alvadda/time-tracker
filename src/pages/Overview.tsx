import { DateTimePicker } from '@mui/lab'
import { Box, Grid, TextField } from '@mui/material'
import moment, { Moment } from 'moment'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProjects } from '../features/projects/projectsSlice'
import { selectInactiveSessionsFromTo } from '../features/sessions/sessionsSlice'
import { formatMinToHourMin, timeInMiliseconds } from '../utils/timeUtil'

const Overview = () => {
  const [fromDate, setFromDate] = useState<Moment | undefined>(moment().subtract(7, 'd'))
  const [toDate, setToDate] = useState<Moment | undefined>(moment())

  const fromInMS = timeInMiliseconds(fromDate!)
  const toInMS = timeInMiliseconds(toDate!)

  const sessionInRage = useSelector(selectInactiveSessionsFromTo(fromInMS, toInMS))
  const projects = useSelector(selectProjects)

  const projectWithStats = projects.map((project) => {
    const sessionsToProject = sessionInRage.filter((session) => session.projectId === project.id)

    const earning = sessionsToProject.reduce((sum, session) => {
      const rate = project.rate || 0
      return sum + ((session.duration || 0) * rate) / 60
    }, 0)

    const minutes = sessionsToProject.reduce((sum, session) => {
      return sum + (session.duration || 0)
    }, 0)

    return { ...project, earning, minutes }
  })

  const { totalEarning, totalMinutes } = projectWithStats.reduce(
    (sum, project) => {
      return {
        totalEarning: sum.totalEarning + project.earning,
        totalMinutes: sum.totalMinutes + project.minutes,
      }
    },
    { totalEarning: 0, totalMinutes: 0 }
  )

  return (
    <Box height={'100%'}>
      <Grid container direction={'column'} sx={{ height: '100%' }} justifyContent={'center'}>
        <Grid
          item
          container
          sx={{ flex: '0 0 40px', display: 'felx', justifyContent: 'center', alignItems: 'center' }}
          position={'relative'}
        >
          overview
        </Grid>
        <Grid item container sx={{ flex: '1 0' }} justifyContent={'flex-start'}>
          <Box padding={2} display={'flex'} gap={2}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="From"
              value={fromDate}
              inputFormat="DD.MM.YY HH:mm"
              onChange={(newValue) => {
                setFromDate(newValue || undefined)
              }}
            />
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="To"
              value={toDate}
              inputFormat="DD.MM.YY HH:mm"
              minDate={fromDate}
              minTime={fromDate}
              onChange={(newValue) => {
                setToDate(newValue || undefined)
              }}
            />
          </Box>
          {formatMinToHourMin(totalMinutes)} Hours | {totalEarning.toFixed(2)}€
        </Grid>
      </Grid>
    </Box>
  )
}

export default Overview
