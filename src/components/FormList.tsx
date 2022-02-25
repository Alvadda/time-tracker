import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import StarIcon from '@mui/icons-material/Star'
import { Box, List, ListItem, ListItemButton, Paper } from '@mui/material'
import Label from '../features/settings/components/Label'
import { Form } from '../types'

interface FormListProps<T> {
  form: T[]
  onSelect: (item: T) => void
}

const FormList = <T extends Form>({ form, onSelect }: FormListProps<T>) => {
  return (
    <List data-testid="form_list">
      {form.map((form: T) => (
        <ListItem disablePadding key={form.id}>
          <ListItemButton data-testid="form_list_item" onClick={() => onSelect(form)}>
            <Paper sx={{ width: '100%', padding: 2 }}>
              <Label label={form.name}>
                <Box sx={{ color: form.color || 'text.primary', display: 'flex', gap: 1 }}>
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
