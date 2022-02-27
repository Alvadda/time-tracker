import { attachCustomCommands } from 'cypress-firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { customer, login, settings } from './fields'
require('dotenv').config({ path: './.env' })

const fbConfig = {
  apiKey: Cypress.env('apiKey'),
  authDomain: Cypress.env('authDomain'),
  projectId: Cypress.env('projectId'),
  storageBucket: Cypress.env('storageBucket'),
  messagingSenderId: Cypress.env('messagingSenderId'),
  appId: Cypress.env('appId'),
}

firebase.initializeApp(fbConfig)

firebase.firestore().settings({
  host: 'http://localhost:5051/',
  ssl: false,
})

//connectFirestoreEmulator(firebase.firestore(), 'localhost', 5051)
// firebase.firestore().useEmulator('localhost', 5051)
firebase.auth().useEmulator(`http://localhost:9099/`)

attachCustomCommands({ Cypress, cy, firebase })

Cypress.Commands.add('login', () => {
  cy.fixture('login.json').then((data) => {
    cy.get(login.emailInput).type(data.email)
    cy.get(login.passwordInput).type(data.password)

    cy.get(login.loginButton).click()
    cy.get(login.loginButton).should('not.exist')
  })
})

interface CreateUserFromSettingsProps {
  name?: string
  contact?: string
  email?: string
  adress?: string
  phone?: string
  rate?: string
  note?: string
}

Cypress.Commands.add('createUserFromSettings', (user: CreateUserFromSettingsProps) => {
  cy.get(customer.customersSettings).click()
  cy.get(customer.addCustomerButton).click()
  cy.get(customer.formName).type(user.name)
  cy.get(customer.formContact).type(user.contact)
  cy.get(customer.formEmail).type(user.email)
  cy.get(customer.formAdress).type(user.adress)
  cy.get(customer.formPhone).type(user.phone)
  cy.get(customer.formRate).type(user.rate)
  cy.get(customer.formNote).type(user.note)
  cy.get(customer.formSubmitButton).click({ force: true })
  cy.get(customer.settingsHeader).should('exist')
  cy.get(settings.back).click({ force: true })
})

Cypress.Commands.add('selectMui', (select: string, option: string) => {
  cy.get(select).parent().click()
  cy.get('[role="option"]').should('exist').contains(option).click()
})

Cypress.Commands.add('resetFirestore', () => {
  cy.request('DELETE', `'http://localhost:5051/emulator/v1/projects/${Cypress.env('projectId')}/databases/(default)/documents'`)
})
