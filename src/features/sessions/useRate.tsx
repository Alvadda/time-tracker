import { useSelector } from 'react-redux'
import { Customer, Project, Session } from '../../types'
import { selectCustomers } from '../customer/customersSlice'
import { selectProjects } from '../projects/projectsSlice'
import { selectDefaultRate } from '../settings/settingsSlice'

export const getRateFrom = (project?: Project, customers?: Customer[], defaultRate?: string) => {
  if (project?.rate) return Number(project.rate)

  const customerRate = customers?.find((customer) => customer.id === project?.customerId)?.rate
  if (customerRate) return Number(customerRate)

  return Number(defaultRate) || 0
}

export const useRate = () => {
  const projects = useSelector(selectProjects)
  const customers = useSelector(selectCustomers)
  const defaultRate = useSelector(selectDefaultRate)

  const getRate = (session: Session) => {
    const project = projects.find((project) => project.id === session.projectId)
    return getRateFrom(project, customers, defaultRate)
  }

  return { getRate }
}
