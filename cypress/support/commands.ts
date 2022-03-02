import { attachCustomCommands } from 'cypress-firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { customer, login, project, settings, task } from './fields'
require('dotenv').config({ path: './.env' })

interface CreateUserFromSettingsProps {
  name?: string
  contact?: string
  email?: string
  adress?: string
  phone?: string
  rate?: string
  note?: string
}

interface CreateProjectFromSettingsProps {
  name?: string
  rate?: string
  customer?: string
}

interface CreateTaskFromSettingsProps {
  name?: string
  description?: string
  isFavorite?: boolean
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      loginToTT(): Chainable<Element>
    }
    interface Chainable {
      createUserFromSettings(user: CreateUserFromSettingsProps): Chainable<Element>
    }
    interface Chainable {
      createProjectFromSettings(projectData: CreateProjectFromSettingsProps): Chainable<Element>
    }
    interface Chainable {
      createTaskFromSettings(taskData: CreateTaskFromSettingsProps): Chainable<Element>
    }
    interface Chainable {
      selectMui(select: string, option: string): Chainable<Element>
    }
    interface Chainable {
      enterDateTimeMui(id: string, dateTime: string, clear?: boolean): Chainable<Element>
    }
    interface Chainable {
      resetFirestore(): Chainable<Element>
    }
  }
}

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

Cypress.Commands.add('loginToTT', () => {
  // is Overwriting cypress-firebase login
  cy.fixture('login.json').then((data) => {
    cy.get(login.emailInput).type(data.email)
    cy.get(login.passwordInput).type(data.password)

    cy.get(login.loginButton).click()
    cy.get(login.loginButton).should('not.exist')
  })
})

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

Cypress.Commands.add('createProjectFromSettings', (projectData: CreateProjectFromSettingsProps) => {
  cy.get(project.projectSettings).click()
  cy.get(project.addProjectButton).click()
  cy.get(project.formName).type(projectData.name)
  cy.get(project.formRate).type(projectData.rate)
  if (projectData.customer) {
    cy.selectMui(project.formCustomer, projectData.customer)
  }

  cy.get(project.formSubmitButton).click({ force: true })
  cy.get(project.settingsHeader).should('exist')
  cy.get(settings.back).click({ force: true })
})

Cypress.Commands.add('createTaskFromSettings', (taskData: CreateTaskFromSettingsProps) => {
  cy.get(task.taskSettings).click()
  cy.get(task.addTaskButton).click()

  cy.get(task.taskName).type(taskData.name)
  cy.get(task.taskDescription).type(taskData.description)
  if (taskData.isFavorite) {
    cy.get(task.taskFavorite).check()
  }
  cy.get(task.formSubmitButton).click({ force: true })
  cy.get(task.settingsHeader).should('exist')
  cy.get(settings.back).click({ force: true })
})

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

Cypress.Commands.add('enterDateTimeMui', (id: string, dateTime: string, clear = true) => {
  if (clear) {
    cy.get(id).find('input').first().clear({ force: true }).type(dateTime, { force: true })
  } else {
    cy.get(id).find('input').first().type(dateTime, { force: true })
  }
})

Cypress.Commands.add('resetFirestore', () => {
  cy.request('DELETE', `http://localhost:5051/emulator/v1/projects/${Cypress.env('projectId')}/databases/(default)/documents`)
})
