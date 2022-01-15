import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import { VFC } from 'react'

interface AddButtonProps {
  onClick: () => void
}

const AddButton: VFC<AddButtonProps> = ({ onClick }) => {
  return (
    <Fab size="medium" aria-label="add" sx={{ position: 'fixed', bottom: '70px', right: '10px' }} onClick={() => onClick()}>
      <AddIcon />
    </Fab>
  )
}

export default AddButton
