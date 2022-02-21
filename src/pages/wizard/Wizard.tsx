import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SettingsIcon from '@mui/icons-material/Settings'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import { BottomNavigation, BottomNavigationAction, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from '../../features/customer/customersSlice'
import { getProjects } from '../../features/projects/projectsSlice'
import { getSettings } from '../../features/settings/settingsSlice'
import { getTasks } from '../../features/task/taskSlice'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import { Page } from '../../types'
import { NAV_BAR_HEIGHT } from '../../utils/constants '
import Overview from '../Overview'
import SettingsPage from '../SettingsPage'
import TimeTracker from '../TimeTracker'
import { navigateTo, selectCurrentPage } from './wizardSlice'

const Wizard = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(selectCurrentPage)

  useEffectOnce(() => {
    dispatch(getProjects())
    dispatch(getCustomers())
    dispatch(getTasks())
    dispatch(getSettings())
  })

  useEffectOnce(() => {
    const handleVisibilitychange = () => {
      if (document.visibilityState === 'visible') {
        dispatch(navigateTo('time-tracker'))
      }
    }
    document.addEventListener('visibilitychange', handleVisibilitychange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilitychange)
    }
  })

  return (
    <Grid container direction={'column'} sx={{ height: '100vh', width: '100vw' }} justifyContent={'center'}>
      <Grid item sx={{ flex: '1 0', height: `calc(100vh - ${NAV_BAR_HEIGHT}px)` }}>
        {currentPage === 'time-tracker' && <TimeTracker />}
        {currentPage === 'overview' && <Overview />}
        {currentPage === 'settings' && <SettingsPage />}
      </Grid>
      <Grid item sx={{ flex: `0 0 ${NAV_BAR_HEIGHT}px`, display: 'flex', alignItems: 'center' }}>
        <BottomNavigation
          sx={{ width: '100%' }}
          value={currentPage}
          onChange={(_, newPage: Page) => {
            dispatch(navigateTo(newPage))
          }}
        >
          <BottomNavigationAction data-testid="nav_start" label="Start" value="time-tracker" icon={<TimelapseIcon />} />
          <BottomNavigationAction data-testid="nav_overview" label="Date" value="overview" icon={<CalendarTodayIcon />} />
          <BottomNavigationAction data-testid="nav_settings" label="Input" value="settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Grid>
    </Grid>
  )
}

export default Wizard
