import { Switch, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { VFC } from 'react'

interface SwitchLabelProps {
  label: string
  checked: boolean
  onChange: () => void
}

const SwitchLabel: VFC<SwitchLabelProps> = ({ label, checked, onChange }) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
      <Typography>{label}</Typography>
      <Switch checked={checked} onChange={onChange} inputProps={{ 'aria-label': 'controlled' }} />
    </Box>
  )
}

export default SwitchLabel
