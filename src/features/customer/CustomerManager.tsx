import { Box } from '@mui/material'
import { useEffect, useState, VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../../components/AddButton'
import FormList from '../../components/FormList'
import { Customer } from '../../types/types'
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
      <FormList form={customers} onSelect={onSelect} />
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
