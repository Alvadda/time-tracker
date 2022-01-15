import CloseIcon from '@mui/icons-material/Close'
import { Box, Button } from '@mui/material'
import { VFC } from 'react'

interface CustomerFormProps {
  // variant?: 'create' | 'update'
  // project?: Project
  // onUpdate?: (project: Project) => void
  // onCreate?: (project: Partial<Project>) => void
  // onDelete?: (project: Project) => void
  onCancle: () => void
}

const CustomerForm: VFC<CustomerFormProps> = ({ onCancle }) => {
  return (
    <Box
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
    >
      <Box sx={{ flex: '0 0 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} position={'relative'}>
        <Button
          variant="text"
          sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
          onClick={() => onCancle()}
        >
          <CloseIcon fontSize="medium" />
        </Button>
        Fielmann
      </Box>
    </Box>
  )
}

export default CustomerForm
