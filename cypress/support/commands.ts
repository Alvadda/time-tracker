import { attachCustomCommands } from 'cypress-firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { loginButton, loginEmailInput, loginPasswordInput } from './fields'
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
  host: 'localhost:5051',
  ssl: false,
})

firebase.auth().useEmulator(`http://localhost:9099/`)
console.log(`Using Auth emulator: http://localhost:9099/`)

attachCustomCommands({ Cypress, cy, firebase })

Cypress.Commands.add('login', () => {
  cy.fixture('login.json').then((login) => {
    cy.get(loginEmailInput).type(login.email)
    cy.get(loginPasswordInput).type(login.password)

    cy.get(loginButton).click()
    cy.get(loginButton).should('not.exist')
  })
})
