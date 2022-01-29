import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { List, ListItem, ListItemButton, Paper } from '@mui/material'
import Label from '../features/settings/components/Label'

interface FormListProps<T> {
  form: T[]
  onSelect: (item: T) => void
}

interface Form {
  id: string
  name: string
  color?: string
}

const FormList = <T extends Form>({ form, onSelect }: FormListProps<T>) => {
  return (
    <List>
      {form.map((form: T) => (
        <ListItem disablePadding key={form.id}>
          <ListItemButton onClick={() => onSelect(form)}>
            <Paper sx={{ width: '100%', padding: 2, color: form.color || 'text.primary' }}>
              <Label label={form.name}>
                <OpenInNewIcon />
              </Label>
            </Paper>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default FormList
