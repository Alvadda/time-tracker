import { Box, CircularProgress } from '@mui/material'
import { VFC } from 'react'

export const Spinner: VFC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  )
}
