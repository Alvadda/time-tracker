import CloseIcon from '@mui/icons-material/Close'
import { Box, Button } from '@mui/material'
import { FC } from 'react'

interface ScreenBoxProps {
  header: string
  onClose: () => void
}

const ScreenBox: FC<ScreenBoxProps> = ({ header, onClose, children }) => {
  return (
    <Box
      component="form"
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        inset: '0',
        zIndex: 100,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ flex: '0 0 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        <Button variant="text" sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }} onClick={() => onClose()}>
          <CloseIcon fontSize="medium" />
        </Button>
        {header}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default ScreenBox
