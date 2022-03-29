import { KeyboardArrowRightOutlined } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, VFC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebaseLogin } from '../../hooks/useFirebaseLogin'
import { isLanguageSupported, supportedLngs } from '../../i18n'
import { SettingPage } from '../../types'
import { selectUserEmail } from '../auth/authSlice'
import { selectProjects } from '../projects/projectsSlice'
import Label from './components/Label'
import {
  selectDarkMode,
  selectDefaultBreak,
  selectDefaultBreakRule,
  selectDefaultProjectId,
  selectDefaultRate,
  selectLanguage,
  setDarkMode,
  setDefaultBreak,
  setDefaultBreakRule,
  setDefaultProjectId,
  setDefaultRate,
  setLanguage,
  updateSettings,
} from './settingsSlice'
interface SettingsProps {
  onNavigation: (to: SettingPage) => void
}

const getNumberOrEmpty = (value: string) => {
  return value === '' ? '' : Number(value)
}

const Settings: VFC<SettingsProps> = ({ onNavigation }) => {
  const dispatch = useDispatch()
  const { logout } = useFirebaseLogin()
  const { t } = useTranslation()

  const userEmail = useSelector(selectUserEmail)
  const darkMode = useSelector(selectDarkMode)
  const defaultProjectId = useSelector(selectDefaultProjectId)
  const defaultBreak = useSelector(selectDefaultBreak)
  const defaultBreakApplyRule = useSelector(selectDefaultBreakRule)
  const defaultRate = useSelector(selectDefaultRate)
  const projects = useSelector(selectProjects)
  const language = useSelector(selectLanguage)

  useEffect(() => {
    return () => {
      dispatch(updateSettings())
    }
  }, [dispatch])

  const onChangeLanguage = (lang?: string) => {
    if (!lang || !isLanguageSupported(lang)) return

    dispatch(setLanguage(lang))
  }

  return (
    <Stack spacing={2} padding={2}>
      <Paper>
        <List>
          <ListItem disablePadding>
            <ListItemButton data-testid="settings_projects" onClick={() => onNavigation('projects')}>
              <Label label="Projects">
                <KeyboardArrowRightOutlined />
              </Label>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton data-testid="settings_customers" onClick={() => onNavigation('customer')}>
              <Label label="Customers">
                <KeyboardArrowRightOutlined />
              </Label>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton data-testid="settings_tasks" onClick={() => onNavigation('tasks')}>
              <Label label="Tasks">
                <KeyboardArrowRightOutlined />
              </Label>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>

      <Paper>
        <List>
          <ListItem data-testid="settings_default_project">
            <Label label="Default Project">
              <Select
                data-testid="settings_default_project_select"
                value={defaultProjectId}
                onChange={(event) => dispatch(setDefaultProjectId(event.target.value))}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </Label>
          </ListItem>
          <ListItem data-testid="settings_break">
            <Label label="Default break">
              <TextField
                sx={{ maxWidth: '20%' }}
                inputProps={{ 'aria-label': 'default break', 'data-testid': 'settings_breakInput' }}
                variant="standard"
                type="number"
                value={defaultBreak}
                onChange={(event) => dispatch(setDefaultBreak(getNumberOrEmpty(event.target.value)))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                }}
              />
            </Label>
          </ListItem>
          <ListItem data-testid="settings_break_rule">
            <Label label="Default break apply rule">
              <TextField
                sx={{ maxWidth: '20%' }}
                inputProps={{ 'aria-label': 'default break rule', 'data-testid': 'settings_break_ruleInput' }}
                variant="standard"
                type="number"
                value={defaultBreakApplyRule}
                onChange={(event) => dispatch(setDefaultBreakRule(getNumberOrEmpty(event.target.value)))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">h</InputAdornment>,
                }}
              />
            </Label>
          </ListItem>
          <ListItem data-testid="settings_rate">
            <Label label="Default rate">
              <TextField
                sx={{ maxWidth: '20%' }}
                inputProps={{ 'aria-label': 'default rate', 'data-testid': 'settings_rateInput' }}
                variant="standard"
                type="number"
                value={defaultRate}
                onChange={(event) => dispatch(setDefaultRate(getNumberOrEmpty(event.target.value)))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
              />
            </Label>
          </ListItem>
        </List>
      </Paper>

      <Paper>
        <List>
          <ListItem data-testid="settings_darkmode">
            <Label label="Darkmode">
              <Switch
                inputProps={{ 'aria-label': 'settings_darkmode_switch_check' }}
                data-testid="settings_darkmode_switch"
                checked={darkMode}
                onChange={() => dispatch(setDarkMode(!darkMode))}
              />
            </Label>
          </ListItem>
        </List>
      </Paper>

      <Paper>
        <List>
          <ListItem data-testid="settings_email">
            <Label label="E-Mail">
              <Typography variant="body1" data-testid="settings_userEmail">
                {userEmail}
              </Typography>
            </Label>
          </ListItem>
          <ListItem data-testid="settings_Lngs">
            <Label label={t('settings.language')}>
              <Select data-testid="settings_Lngs_select" value={language} onChange={(event) => onChangeLanguage(event.target.value)}>
                {supportedLngs.map((lng) => (
                  <MenuItem key={lng} value={lng}>
                    {t(lng)}
                  </MenuItem>
                ))}
              </Select>
            </Label>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton data-testid="settings_logout" onClick={logout}>
              <Label label="Logout">
                <LogoutIcon />
              </Label>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>

      <Paper>
        <List>
          <ListItem data-testid="settings_version">
            <Label label="Version">{process.env.VERSION}</Label>
          </ListItem>
        </List>
      </Paper>
    </Stack>
  )
}

export default Settings
