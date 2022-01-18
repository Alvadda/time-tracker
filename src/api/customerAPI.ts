/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from 'firebase/firestore'
import { Customer } from '../types/types'
import { setValue } from './apiUtils'

const customerPath = (userId: string) => `users/${userId}/customers`

const projectAPI = (db: Firestore) => {
  const getAll = async (userId: string) => {
    const customers: Customer[] = []

    const querySnapshot = await getDocs(collection(db, customerPath(userId)))
    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      customers.push({
        id: doc.id,
        name: docData.name,
        contact: setValue(docData.contact),
        email: setValue(docData.email),
        address: setValue(docData.address),
        phone: setValue(docData.phone),
        rate: setValue(docData.rate),
        defaultBreak: setValue(docData.defaultBreak),
        note: setValue(docData.note),
      })
    })
    return customers
  }

  const create = async (userId: string, customer: Partial<Customer>) => {
    try {
      const docRef = await addDoc(collection(db, customerPath(userId)), {
        name: customer.name,
        contact: customer.contact || null,
        email: customer.email || null,
        address: customer.address || null,
        phone: customer.phone || null,
        rate: customer.rate || null,
        defaultBreak: customer.defaultBreak || null,
        note: customer.note || null,
      })

      const newCustomer: Customer = {
        id: docRef.id,
        name: customer.name!,
        contact: setValue(customer.contact),
        email: setValue(customer.email),
        address: setValue(customer.address),
        phone: setValue(customer.phone),
        rate: setValue(customer.rate),
        defaultBreak: setValue(customer.defaultBreak),
        note: setValue(customer.note),
      }

      return newCustomer
    } catch (error: any) {
      throw new Error(`create Customer faild: ${error.message}`)
    }
  }

  const update = async (userId: string, customer: Customer) => {
    try {
      const customerRef = doc(db, customerPath(userId), customer.id)
      await updateDoc(customerRef, {
        id: customer.id,
        name: customer.name,
        contact: customer.contact || null,
        email: customer.email || null,
        address: customer.address || null,
        phone: customer.phone || null,
        rate: customer.rate || null,
        defaultBreak: customer.defaultBreak || null,
        note: customer.note || null,
      })

      return customer
    } catch (error: any) {
      throw new Error(`Update session ${customer.id} faild: ${error.message}`)
    }
  }

  const remove = async (userId: string, customer: Customer) => {
    try {
      const projectRef = doc(db, customerPath(userId), customer.id)
      await deleteDoc(projectRef)

      return customer.id
    } catch (error: any) {
      throw new Error(`Delete project ${customer.id} faild: ${error.message}`)
    }
  }

  return { getAll, create, remove, update }
}

export default projectAPI
