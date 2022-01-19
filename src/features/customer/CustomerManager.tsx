import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, List, ListItem, ListItemButton, Paper } from '@mui/material'
import { useEffect, useState, VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../../components/AddButton'
import { Customer } from '../../types/types'
import Label from '../settings/components/Label'
import CustomerForm from './CustomerForm'
import {
  createCustomer,
  deleteCustomer,
  selectCustomers,
  selectSelectedCustomer,
  setSelectedCustomer,
  updateCustomer,
} from './customersSlice'

const CustomerManager: VFC = () => {
  const dispatch = useDispatch()
  const [createNewCustomer, setCreateNewCustomer] = useState<boolean>(false)
  console.log(createNewCustomer)

  const customers = useSelector(selectCustomers)
  const selectedCustomer = useSelector(selectSelectedCustomer)

  const showForm = createNewCustomer || selectedCustomer

  useEffect(() => {
    return () => {
      dispatch(setSelectedCustomer(undefined))
      setCreateNewCustomer(false)
    }
  }, [setCreateNewCustomer, dispatch])

  const closeForm = () => {
    dispatch(setSelectedCustomer(undefined))
    setCreateNewCustomer(false)
  }

  const onSelect = (customer: Customer) => {
    dispatch(setSelectedCustomer(customer))
  }

  const onUpdate = (customer: Customer) => {
    dispatch(updateCustomer(customer))
    closeForm()
  }

  const onCreate = (customer: Partial<Customer>) => {
    dispatch(createCustomer(customer))
    closeForm()
  }

  const onDelete = (customer: Customer) => {
    dispatch(deleteCustomer(customer))
    closeForm()
  }

  return (
    <Box height={'100%'}>
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
      {showForm && (
        <CustomerForm
          variant={selectedCustomer ? 'update' : 'create'}
          customer={selectedCustomer}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onCancle={closeForm}
        />
      )}
      {!showForm && <AddButton onClick={() => setCreateNewCustomer(true)} />}
    </Box>
  )
}

export default CustomerManager
