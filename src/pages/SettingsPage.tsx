import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { Button, Grid } from '@mui/material'
import { VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomerManager from '../features/customer/CustomerManager'
import ProjectManager from '../features/projects/ProjectManager'
import Settings from '../features/settings/Settings'
import { navigateBack, navigateTo, selectSettingPage } from '../features/settings/settingsSlice'
import TaskManager from '../features/task/TaskManager'
import { useEffectOnce } from '../hooks/useEffectOnce'
import { SettingPage } from '../types'

const SettingsPage: VFC = () => {
  const dispatch = useDispatch()
  const page = useSelector(selectSettingPage)

  useEffectOnce(() => {
    dispatch(navigateBack())
  })

  const onNavigation = (to: SettingPage) => {
    dispatch(navigateTo(to))
  }

  return (
    <Grid container sx={{ height: '100%', flexDirection: 'column', flexWrap: 'nowrap' }} justifyContent={'center'}>
      <Grid
        item
        container
        sx={{ flex: '0 0 40px', display: 'felx', justifyContent: 'center', alignItems: 'center', textTransform: 'capitalize' }}
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
      <Grid item sx={{ flex: '1 0', width: '100%', overflow: 'auto', position: 'relative' }}>
        {page === 'settings' && <Settings onNavigation={onNavigation} />}
        {page === 'projects' && <ProjectManager />}
        {page === 'customer' && <CustomerManager />}
        {page === 'tasks' && <TaskManager />}
      </Grid>
    </Grid>
  )
}

export default SettingsPage
