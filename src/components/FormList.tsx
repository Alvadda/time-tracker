import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import StarIcon from '@mui/icons-material/Star'
import { Box, List, ListItem, ListItemButton, Paper } from '@mui/material'
import Label from '../features/settings/components/Label'
import { Form } from '../types/types'

interface FormListProps<T> {
  form: T[]
  onSelect: (item: T) => void
}

const FormList = <T extends Form>({ form, onSelect }: FormListProps<T>) => {
  return (
    <List>
      {form.map((form: T) => (
        <ListItem disablePadding key={form.id}>
          <ListItemButton onClick={() => onSelect(form)}>
            <Paper sx={{ width: '100%', padding: 2 }}>
              <Label label={form.name}>
                <Box sx={{ color: form.color || 'text.primary' }}>
                  {form.isFavorite && <StarIcon sx={{ color: 'yellow' }} />}
                  <OpenInNewIcon />
                </Box>
              </Label>
            </Paper>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default FormList
