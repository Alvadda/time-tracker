import { attachCustomCommands } from 'cypress-firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { loginButton, loginEmailInput, loginPasswordInput } from './fields.js'

const fbConfig = {
  apiKey: 'AIzaSyA4A5TF-urVeS-vaDY88pnGXKQdWdsyqfQ',
  authDomain: 'time-tracker-4d8a7.firebaseapp.com',
  projectId: 'time-tracker-4d8a7',
  storageBucket: 'time-tracker-4d8a7.appspot.com',
  messagingSenderId: '706198867361',
  appId: '1:706198867361:web:5fd8a93234b59fbf2b4fe0',
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
