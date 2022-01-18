import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useState, VFC } from 'react'

interface CustomerFormProps {
  // variant?: 'create' | 'update'
  // project?: Project
  // onUpdate?: (project: Project) => void
  // onCreate?: (project: Partial<Project>) => void
  // onDelete?: (project: Project) => void
  onCancle: () => void
}

interface State {
  name: string
  contact: string
  email: string
  address: string
  phone: string
  rate: string
  defaultBreak: string
  notes: string
}

const CustomerForm: VFC<CustomerFormProps> = ({ onCancle }) => {
  const [state, setstate] = useState<State>({
    name: '',
    contact: '',
    email: '',
    address: '',
    phone: '',
    rate: '',
    defaultBreak: '',
    notes: '',
  })

  const isUpdate = true

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
        Customer
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
          <TextField
            label="Name"
            variant="standard"
            value={state.name}
            onChange={(event) => setstate((state) => ({ ...state, name: event.target.value }))}
          />
          <TextField
            label="Contact"
            variant="standard"
            value={state.contact}
            onChange={(event) => setstate((state) => ({ ...state, contact: event.target.value }))}
          />
          <TextField
            label="Email"
            variant="standard"
            type={'email'}
            value={state.email}
            onChange={(event) => setstate((state) => ({ ...state, email: event.target.value }))}
          />
          <TextField
            label="Address"
            variant="standard"
            value={state.address}
            onChange={(event) => setstate((state) => ({ ...state, address: event.target.value }))}
          />
          <TextField
            label="Phone"
            variant="standard"
            type={'tel'}
            value={state.phone}
            onChange={(event) => setstate((state) => ({ ...state, phone: event.target.value }))}
          />
          <TextField
            label="Rate"
            variant="standard"
            type={'number'}
            value={state.rate}
            onChange={(event) => setstate((state) => ({ ...state, rate: event.target.value }))}
          />
          <TextField
            label="Default break"
            variant="standard"
            type={'number'}
            value={state.defaultBreak}
            onChange={(event) => setstate((state) => ({ ...state, defaultBreak: event.target.value }))}
          />
          <TextField
            label="Notes"
            variant="standard"
            multiline
            rows={3}
            value={state.notes}
            onChange={(event) => setstate((state) => ({ ...state, notes: event.target.value }))}
          />
        </Stack>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Button variant="contained">{isUpdate ? 'Update' : 'Create'}</Button>
          {isUpdate && (
            <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          )}
          <Button variant="outlined" onClick={() => onCancle()}>
            cancle
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CustomerForm
