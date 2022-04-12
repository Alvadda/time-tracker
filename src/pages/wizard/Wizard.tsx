import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SettingsIcon from '@mui/icons-material/Settings'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import { BottomNavigation, BottomNavigationAction, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getCustomers } from '../../features/customer/customersSlice'
import { getProjects } from '../../features/projects/projectsSlice'
import { getSettings } from '../../features/settings/settingsSlice'
import { getTasks } from '../../features/task/taskSlice'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import { Page } from '../../types'
import { NAV_BAR_HEIGHT } from '../../utils/constants '
import { navigateTo, selectCurrentPage } from './wizardSlice'

const Wizard = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentPage = useSelector(selectCurrentPage)
  const navigate = useNavigate()

  useEffectOnce(() => {
    dispatch(getSettings())
    dispatch(getProjects())
    dispatch(getCustomers())
    dispatch(getTasks())
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
    <Grid container direction={'column'} sx={{ height: '100vh', width: '100%' }} justifyContent={'center'}>
      <Grid item sx={{ flex: '1 0', height: `calc(100vh - ${NAV_BAR_HEIGHT}px)` }}>
        {/* {currentPage === 'time-tracker' && <TimeTracker />} */}
        {/* {currentPage === 'overview' && <Overview />}
        {currentPage === 'settings' && <SettingsPage />} */}
        <Outlet />
      </Grid>
      <Grid item sx={{ flex: `0 0 ${NAV_BAR_HEIGHT}px`, display: 'flex', alignItems: 'center' }}>
        <BottomNavigation
          sx={{ width: '100%' }}
          value={currentPage}
          onChange={(_, newPage: Page) => {
            navigate('settings')
            // dispatch(navigateTo(newPage))
          }}
        >
          <BottomNavigationAction data-testid="nav_start" label={t('nav.start')} value="time-tracker" icon={<TimelapseIcon />} />
          <BottomNavigationAction data-testid="nav_overview" label={t('nav.overview')} value="overview" icon={<CalendarTodayIcon />} />
          <BottomNavigationAction data-testid="nav_settings" label={t('nav.settings')} value="settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Grid>
    </Grid>
  )
}

export default Wizard
