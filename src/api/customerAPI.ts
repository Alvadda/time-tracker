/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from 'firebase/firestore'
import { Customer } from '../types/types'
import { setValueFromFb, setValueToFb } from './apiUtils'

const customerPath = (userId: string) => `users/${userId}/customers`

const customerAPI = (db: Firestore) => {
  const getAll = async (userId: string) => {
    const customers: Customer[] = []

    const querySnapshot = await getDocs(collection(db, customerPath(userId)))
    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      customers.push({
        id: doc.id,
        name: docData.name,
        contact: setValueFromFb(docData.contact),
        email: setValueFromFb(docData.email),
        address: setValueFromFb(docData.address),
        phone: setValueFromFb(docData.phone),
        rate: setValueFromFb(docData.rate),
        defaultBreak: setValueFromFb(docData.defaultBreak),
        note: setValueFromFb(docData.note),
      })
    })
    return customers
  }

  const create = async (userId: string, customer: Partial<Customer>) => {
    try {
      const docRef = await addDoc(collection(db, customerPath(userId)), {
        name: customer.name,
        contact: setValueToFb(customer.contact),
        email: setValueToFb(customer.email),
        address: setValueToFb(customer.address),
        phone: setValueToFb(customer.phone),
        rate: setValueToFb(customer.rate),
        defaultBreak: setValueToFb(customer.defaultBreak),
        note: setValueToFb(customer.note),
      })

      const newCustomer: Customer = {
        id: docRef.id,
        name: customer.name!,
        contact: setValueFromFb(customer.contact),
        email: setValueFromFb(customer.email),
        address: setValueFromFb(customer.address),
        phone: setValueFromFb(customer.phone),
        rate: setValueFromFb(customer.rate),
        defaultBreak: setValueFromFb(customer.defaultBreak),
        note: setValueFromFb(customer.note),
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
        contact: setValueToFb(customer.contact),
        email: setValueToFb(customer.email),
        address: setValueToFb(customer.address),
        phone: setValueToFb(customer.phone),
        rate: setValueToFb(customer.rate),
        defaultBreak: setValueToFb(customer.defaultBreak),
        note: setValueToFb(customer.note),
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

export default customerAPI
