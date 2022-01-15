import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, List, ListItem, ListItemButton, Paper } from '@mui/material'
import { useState, VFC } from 'react'
import AddButton from '../../components/AddButton'
import Label from '../settings/components/Label'
import CustomerForm from './CustomerForm'

const CustomerManager: VFC = () => {
  const [createNewCustomer, setCreateNewCustomer] = useState<boolean>(false)

  return (
    <Box height={'100%'}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Paper sx={{ width: '100%', padding: 2 }}>
              <Label label="Customer1">
                <OpenInNewIcon />
              </Label>
            </Paper>
          </ListItemButton>
        </ListItem>
      </List>
      {createNewCustomer && <CustomerForm onCancle={() => setCreateNewCustomer(false)} />}
      {!createNewCustomer && <AddButton onClick={() => setCreateNewCustomer(true)} />}
    </Box>
  )
}

export default CustomerManager
