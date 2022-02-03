import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Stack } from '@mui/material'
import { FC } from 'react'
import DeleteButton from './DeleteButton'

interface FormBoxProps {
  header: string
  isValid: boolean
  update?: boolean
  onCreate: () => void
  onUpdate: () => void
  onDelete: () => void
  onClose: () => void
}

const FormBox: FC<FormBoxProps> = ({ header, update = false, isValid, onCreate, onDelete, onUpdate, onClose, children }) => {
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
        <Stack gap={2} width={'100%'}>
          {children}
        </Stack>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={() => {
              update ? onUpdate() : onCreate()
            }}
          >
            {update ? 'Update' : 'Create'}
          </Button>
          {update && <DeleteButton onClick={onDelete} />}
          <Button variant="outlined" onClick={() => onClose()}>
            cancle
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default FormBox