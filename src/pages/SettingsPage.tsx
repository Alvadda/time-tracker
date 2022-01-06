import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { Box, Button, Grid } from '@mui/material'
import { VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomerManager from '../features/customer/CustomerManager'
import ProjectManager from '../features/projects/ProjectManager'
import Settings from '../features/settings/Settings'
import { navigateBack, navigateTo, selectSettingPage } from '../features/settings/settingsSlice'
import { SettingPage } from '../types/types'

const SettingsPage: VFC = () => {
  const dispatch = useDispatch()
  const page = useSelector(selectSettingPage)

  const onNavigation = (to: SettingPage) => {
    dispatch(navigateTo(to))
  }

  return (
    <Box height={'100%'}>
      <Grid container direction={'column'} sx={{ height: '100%' }} justifyContent={'center'}>
        <Grid
          item
          container
          sx={{ flex: '0 0 40px', display: 'felx', justifyContent: 'center', alignItems: 'center' }}
          position={'relative'}
        >
          {page !== 'settings' && (
            <Button
              variant="text"
              sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
              onClick={() => dispatch(navigateBack())}
            >
              <KeyboardArrowLeftIcon fontSize="medium" />
            </Button>
          )}
          {page}
        </Grid>
        <Grid item sx={{ flex: '1 0' }} padding={2}>
          {page === 'settings' && <Settings onNavigation={onNavigation} />}
          {page === 'projects' && <ProjectManager />}
          {page === 'customer' && <CustomerManager />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default SettingsPage
