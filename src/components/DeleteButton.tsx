import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { VFC } from 'react'

interface DeleteButtonProps {
  onClick: () => void
}

const DeleteButton: VFC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => onClick()}>
      Delete
    </Button>
  )
}

export default DeleteButton
