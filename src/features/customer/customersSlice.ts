import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, RootState } from '../../store/store'
import { Customer } from '../../types'

export interface CustomersState {
  customers: Customer[]
  selectedCustomer?: Customer
}

const initialState: CustomersState = { customers: [] }

const getCustomers = createAsyncThunk<Customer[], undefined, { state: RootState; extra: Extra }>(
  'customers/getAll',
  async (_, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) return []

    return await extra.customer.getAll(auth.uid)
  }
)

const createCustomer = createAsyncThunk<Customer, Partial<Customer>, { state: RootState; extra: Extra }>(
  'customers/create',
  async (customer, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.customer.create(auth.uid, customer)
  }
)

const updateCustomer = createAsyncThunk<Customer, Customer, { state: RootState; extra: Extra }>(
  'customers/update',
  async (customer, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.customer.update(auth.uid, customer)
  }
)

const deleteCustomer = createAsyncThunk<string, Customer, { state: RootState; extra: Extra }>(
  'customers/delete',
  async (customer, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.customer.remove(auth.uid, customer)
  }
)

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload)
    },
    setSelectedCustomer: (state, action: PayloadAction<Customer | undefined>) => {
      state.selectedCustomer = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.customers = [...action.payload]
    })
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.customers.push(action.payload)
    })
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      const indexOfCustomerToUpdate = state.customers.findIndex((customer) => customer.id === action.payload.id)
      state.customers[indexOfCustomerToUpdate] = action.payload
    })
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      const indexOfCustomerToRemove = state.customers.findIndex((customer) => customer.id === action.payload)
      state.customers.splice(indexOfCustomerToRemove, 1)
    })
  },
})

// SELECTOR
export const selectCustomers = (state: RootState) => state.customers.customers
export const selectSelectedCustomer = (state: RootState) => state.customers.selectedCustomer
export const selectCustomerToCurrentProject = (state: RootState) => {
  return state.customers.customers.find((customer) => state.projects.selectedProject?.customerId === customer.id)
}

//ACTIONS
export const { addCustomer, setSelectedCustomer } = customersSlice.actions
export { getCustomers, createCustomer, updateCustomer, deleteCustomer }

export default customersSlice.reducer
