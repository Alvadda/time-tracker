import { KeyboardArrowRightOutlined } from '@mui/icons-material'
import { List, ListItem, ListItemButton, Paper, Stack, Switch } from '@mui/material'
import { VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettingPage } from '../../types/types'
import Label from './components/Label'
import { selectDarkMode, setDarkMode } from './settingsSlice'

interface SettingsProps {
  onNavigation: (to: SettingPage) => void
}

const Settings: VFC<SettingsProps> = ({ onNavigation }) => {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)

  return (
    <Stack spacing={2}>
      <Paper>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onNavigation('projects')}>
              <Label label="Projects">
                <KeyboardArrowRightOutlined />
              </Label>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onNavigation('customer')}>
              <Label label="Customer">
                <KeyboardArrowRightOutlined />
              </Label>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>

      <Paper>
        <List>
          <ListItem>
            <Label label="Darkmode">
              <Switch checked={darkMode} onChange={() => dispatch(setDarkMode(!darkMode))} inputProps={{ 'aria-label': 'controlled' }} />
            </Label>
          </ListItem>
        </List>
      </Paper>
    </Stack>
  )
}

export default Settings
