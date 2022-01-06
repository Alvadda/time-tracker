import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SettingsIcon from '@mui/icons-material/Settings'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import { BottomNavigation, BottomNavigationAction, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Page } from '../../types/types'
import Overview from '../Overview'
import SettingsPage from '../SettingsPage'
import TimeTracker from '../TimeTracker'
import { navigateTo, selectCurrentPage } from './wizardSlice'

const Wizard = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(selectCurrentPage)

  return (
    <Grid container direction={'column'} sx={{ height: '100vh' }} justifyContent={'center'}>
      <Grid item sx={{ flex: '1 0', height: 'calc(100vh - 60px)' }}>
        {currentPage === 'time-tracker' && <TimeTracker />}
        {currentPage === 'overview' && <Overview />}
        {currentPage === 'settings' && <SettingsPage />}
      </Grid>
      <Grid item sx={{ flex: '0 0 60px' }}>
        <BottomNavigation
          value={currentPage}
          onChange={(_, newPage: Page) => {
            dispatch(navigateTo(newPage))
          }}
        >
          <BottomNavigationAction label="Start" value="time-tracker" icon={<TimelapseIcon />} />
          <BottomNavigationAction label="Date" value="overview" icon={<CalendarTodayIcon />} />
          <BottomNavigationAction label="Input" value="settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Grid>
    </Grid>
  )
}

export default Wizard
