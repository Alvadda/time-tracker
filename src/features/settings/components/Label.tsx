import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'

interface LabelProps {
  label: string
}

const Label: FC<LabelProps> = ({ label, children }) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
      <Typography>{label}</Typography>
      {children}
    </Box>
  )
}

export default Label
