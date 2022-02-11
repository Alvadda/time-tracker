import { DatePicker } from '@mui/lab'
import { Box, Divider, Grid, List, ListItem, ListItemButton, TextField } from '@mui/material'
import moment, { Moment } from 'moment'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProjectOverview from '../features/overview/ProjectOverview'
import ProjectStats from '../features/overview/projectStats'
import { selectProjectsInRage } from '../features/projects/projectsSlice'
import { timeInMiliseconds } from '../utils/timeUtil'

const Overview = () => {
  const defaultFromDate = moment().subtract(7, 'd').startOf('day')
  const defaultToDate = moment().endOf('day')

  const [fromDate, setFromDate] = useState<Moment>(defaultFromDate)
  const [toDate, setToDate] = useState<Moment>(defaultToDate)
  const [selectedProject, setSelectedProject] = useState<string | undefined>()

  const fromInMS = timeInMiliseconds(fromDate)
  const toInMS = timeInMiliseconds(toDate)

  const projectWithStats = useSelector(selectProjectsInRage(fromInMS, toInMS))

  const projectWithStatsAndSession = projectWithStats.filter((project) => project.sessions.length > 0)

  const { totalEarning, totalMinutes } = projectWithStats.reduce(
    (sum, project) => {
      return {
        totalEarning: sum.totalEarning + project.earning,
        totalMinutes: sum.totalMinutes + project.minutes,
      }
    },
    { totalEarning: 0, totalMinutes: 0 }
  )

  const selectedStats = projectWithStatsAndSession.find((project) => project.id === selectedProject)

  return (
    <Grid container sx={{ height: '100%', flexDirection: 'column', flexWrap: 'nowrap' }} justifyContent={'center'}>
      <Grid item container sx={{ flex: '0 0 40px', display: 'felx', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        overview
      </Grid>
      <Grid item container flexDirection={'column'} overflow={'hidden'}>
        <Box padding={2} display={'flex'} gap={2}>
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            label="From"
            value={fromDate}
            inputFormat="DD.MM.YYYY"
            mask="DD.MM.YYYY"
            onChange={(newValue) => {
              setFromDate(newValue || defaultFromDate)
            }}
          />
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            label="To"
            value={toDate}
            inputFormat="DD.MM.YYYY"
            mask="DD.MM.YYYY"
            minDate={fromDate}
            onChange={(newValue) => {
              setToDate(newValue || defaultToDate)
            }}
          />
        </Box>

        <Box padding={2} width={'100%'}>
          <ProjectStats header="Total" time={totalMinutes} earning={totalEarning} />
        </Box>
        <Divider />
      </Grid>
      <Grid item sx={{ flex: '1 0', width: '100%', overflow: 'auto', position: 'relative' }}>
        <List>
          {projectWithStatsAndSession.map((project) => (
            <ListItem disablePadding key={project.id}>
              <ListItemButton onClick={() => setSelectedProject(project.id)}>
                <ProjectStats header={project.name} headerColor={project.color} time={project.minutes} earning={project.earning || 0} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      {selectedProject && (
        <ProjectOverview onClose={() => setSelectedProject(undefined)} project={selectedStats} sessions={selectedStats?.sessions || []} />
      )}
    </Grid>
  )
}

export default Overview
