import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { APP_WIDTH } from '../utils/constants '
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
        width: APP_WIDTH,
        height: '100vh',
        position: 'absolute',
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
        <Button
          data-testid="form_close"
          variant="text"
          sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
          onClick={() => onClose()}
        >
          <CloseIcon fontSize="medium" />
        </Button>
        <Typography variant="h6" data-testid="form_header">
          {header}
        </Typography>
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
          paddingBottom: '24px',
        }}
      >
        <Stack gap={2} width={'100%'}>
          {children}
        </Stack>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Button
            data-testid="form_submit"
            variant="contained"
            disabled={!isValid}
            onClick={() => {
              update ? onUpdate() : onCreate()
            }}
          >
            {update ? 'Update' : 'Create'}
          </Button>
          {update && <DeleteButton data-testid="form_delete" onClick={onDelete} />}
          <Button data-testid="form_cancle" variant="outlined" onClick={() => onClose()}>
            cancle
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default FormBox
