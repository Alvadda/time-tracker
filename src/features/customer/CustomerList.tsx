import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { List, ListItem, ListItemButton, Paper } from '@mui/material'
import { VFC } from 'react'
import { Customer } from '../../types/types'
import Label from '../settings/components/Label'

interface CustomerListProps {
  customers: Customer[]
  onSelect: (customer: Customer) => void
}

const CustomerList: VFC<CustomerListProps> = ({ customers, onSelect }) => {
  return (
    <List>
      {customers.map((customer) => (
        <ListItem disablePadding key={customer.id}>
          <ListItemButton onClick={() => onSelect(customer)}>
            <Paper sx={{ width: '100%', padding: 2 }}>
              <Label label={customer.name}>
                <OpenInNewIcon />
              </Label>
            </Paper>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default CustomerList
