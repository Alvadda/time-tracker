import { TextField } from '@mui/material'
import { useEffect, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormBox from '../../components/FormBox'
import { Customer, NumberOrEmpty } from '../../types'

interface CustomerFormProps {
  variant?: 'create' | 'update'
  customer?: Customer
  onUpdate: (customer: Customer) => void
  onCreate: (customer: Partial<Customer>) => void
  onDelete: (customer: Customer) => void
  onCancle: () => void
}
interface CustomerFormData {
  name: string
  contact?: string
  email?: string
  address?: string
  phone?: string
  rate: NumberOrEmpty
  note?: string
}

const CustomerForm: VFC<CustomerFormProps> = ({ variant = 'update', customer, onUpdate, onCreate, onDelete, onCancle }) => {
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<CustomerFormData>()

  const { t } = useTranslation()
  const isUpdate = variant === 'update'

  useEffect(() => {
    if (customer) {
      setValue('name', customer.name)
      setValue('contact', customer.contact)
      setValue('email', customer.email)
      setValue('address', customer.address)
      setValue('phone', customer.phone)
      setValue('rate', customer.rate)
      setValue('note', customer.note)
    }
  }, [customer, setValue])

  const getFormData = () => {
    const data = getValues()

    return {
      name: data.name,
      contact: data.contact,
      email: data.email,
      address: data.address,
      phone: data.phone,
      rate: data.rate,
      note: data.note,
    }
  }

  const createCustomer = async () => {
    const isValid = await trigger()

    if (isValid) onCreate(getFormData())
  }

  const updateCustomer = async () => {
    const isValid = await trigger()
    if (customer && isValid) {
      onUpdate({
        ...customer,
        ...getFormData(),
      })
    }
  }

  const deleteCustomer = () => {
    if (customer) {
      onDelete(customer)
    }
  }

  return (
    <FormBox
      header={t('common.customer')}
      isValid={true}
      update={isUpdate}
      onCreate={createCustomer}
      onUpdate={updateCustomer}
      onDelete={deleteCustomer}
      onClose={onCancle}
    >
      <TextField
        inputProps={{ 'data-testid': 'customer_name' }}
        label={t('customer.name')}
        variant="standard"
        {...register('name', { required: true })}
        error={Boolean(errors.name)}
      />
      <TextField
        inputProps={{ 'data-testid': 'customer_contact' }}
        label={t('customer.contact')}
        variant="standard"
        {...register('contact')}
      />
      <TextField
        inputProps={{ 'data-testid': 'customer_email' }}
        label={t('customer.email')}
        variant="standard"
        type={'email'}
        {...register('email')}
      />
      <TextField
        inputProps={{ 'data-testid': 'customer_address' }}
        label={t('customer.address')}
        variant="standard"
        {...register('address')}
      />
      <TextField
        inputProps={{ 'data-testid': 'customer_phone' }}
        label={t('customer.phoneNumber')}
        variant="standard"
        type={'tel'}
        {...register('phone')}
      />
      <TextField
        inputProps={{ 'data-testid': 'customer_rate' }}
        label={t('customer.rate')}
        variant="standard"
        type={'number'}
        {...register('rate')}
      />
      <TextField
        inputProps={{ 'data-testid': 'customer_note' }}
        label={t('customer.note')}
        variant="standard"
        multiline
        rows={3}
        {...register('note')}
      />
    </FormBox>
  )
}

export default CustomerForm
