import { KeyboardArrowRightOutlined } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import { InputAdornment, List, ListItem, ListItemButton, MenuItem, Paper, Select, Stack, Switch, TextField } from '@mui/material'
import { useEffect, VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebaseLogin } from '../../hooks/useFirebaseLogin'
import { SettingPage } from '../../types/types'
import { selectProjects } from '../projects/projectsSlice'
import Label from './components/Label'
import {
  selectDarkMode,
  selectDefaultBreak,
  selectDefaultBreakRule,
  selectDefaultProjectId,
  setBreak,
  setBreakApplyRule,
  setDarkMode,
  setDefaultProjectId,
  updateSettings,
} from './settingsSlice'
interface SettingsProps {
  onNavigation: (to: SettingPage) => void
}

const Settings: VFC<SettingsProps> = ({ onNavigation }) => {
  const dispatch = useDispatch()
  const { logout } = useFirebaseLogin()

  const darkMode = useSelector(selectDarkMode)
  const defaultProjectId = useSelector(selectDefaultProjectId)
  const defaultBreak = useSelector(selectDefaultBreak)
  const defaultBreakApplyRule = useSelector(selectDefaultBreakRule)
  const projects = useSelector(selectProjects)

  useEffect(() => {
    return () => {
      dispatch(updateSettings())
    }
  }, [dispatch])

  return (
    <Stack spacing={2} padding={2}>
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
          <ListItem disablePadding>
            <ListItemButton onClick={() => onNavigation('tasks')}>
              <Label label="Tasks">
                <KeyboardArrowRightOutlined />
              </Label>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>

      <Paper>
        <List>
          <ListItem>
            <Label label="Default Project">
              <Select value={defaultProjectId} onChange={(event) => dispatch(setDefaultProjectId(event.target.value))}>
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </Label>
          </ListItem>
          <ListItem>
            <Label label="Default break">
              <TextField
                sx={{ maxWidth: '20%' }}
                variant="standard"
                type="number"
                value={defaultBreak}
                onChange={(event) => dispatch(setBreak(event.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                }}
              />
            </Label>
          </ListItem>
          <ListItem>
            <Label label="Default break apply rule">
              <TextField
                sx={{ maxWidth: '20%' }}
                variant="standard"
                type="number"
                value={defaultBreakApplyRule}
                onChange={(event) => dispatch(setBreakApplyRule(event.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">h</InputAdornment>,
                }}
              />
            </Label>
          </ListItem>
        </List>
      </Paper>

      <Paper>
        <List>
          <ListItem>
            <Label label="Darkmode">
              <Switch checked={darkMode} onChange={() => dispatch(setDarkMode(!darkMode))} />
            </Label>
          </ListItem>
        </List>
      </Paper>

      <Paper>
        <List>
          <ListItem>
            <ListItemButton onClick={logout}>
              <Label label="Logout">
                <LogoutIcon />
              </Label>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>

      <Paper>
        <List>
          <ListItem>
            <ListItemButton onClick={logout}>
              <Label label="Version">{process.env.VERSION}</Label>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </Stack>
  )
}

export default Settings
