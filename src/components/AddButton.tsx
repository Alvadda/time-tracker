import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import { VFC } from 'react'
import { NAV_BAR_HEIGHT } from '../utils/constants '

interface AddButtonProps {
  onClick: () => void
}

const AddButton: VFC<AddButtonProps> = ({ onClick }) => {
  return (
    <Fab
      data-testid="add_button"
      size="medium"
      aria-label="add"
      sx={{ position: 'absolute', bottom: `${NAV_BAR_HEIGHT + 10}px`, right: '10px' }}
      onClick={() => onClick()}
    >
      <AddIcon />
    </Fab>
  )
}

export default AddButton
