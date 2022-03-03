import { attachCustomCommands } from 'cypress-firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { setValueToFb } from './../../src/api/apiUtils'
import { Customer, Project, Session, Task } from './../../src/types/index'
import { customer, login, project, settings, task } from './fields'
require('dotenv').config({ path: './.env' })

interface AddProjectProps extends Partial<Project> {
  customer?: string
}
interface AddSessionProps extends Partial<Session> {
  rate?: string
  project?: string
  tasks: string[]
}

interface AddTaskpProps extends Partial<Task> {
  task?: string
  project?: string
}

type AddCustomerProps = Partial<Customer>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      loginToTT(): Chainable<Element>
    }
    interface Chainable {
      createUserFromSettings(customerData: AddCustomerProps): Chainable<Element>
    }
    interface Chainable {
      createProjectFromSettings(projectData: AddProjectProps): Chainable<Element>
    }
    interface Chainable {
      createTaskFromSettings(taskData: AddTaskpProps): Chainable<Element>
    }
    interface Chainable {
      selectMui(select: string, option: string): Chainable<Element>
    }
    interface Chainable {
      multiSelectMui(select: string, options: string[]): Chainable<Element>
    }
    interface Chainable {
      enterDateTimeMui(id: string, dateTime: string, clear?: boolean): Chainable<Element>
    }
    interface Chainable {
      addTasksToFirestore(tasks: AddTaskpProps[]): Chainable<Element>
    }
    interface Chainable {
      addProjectsToFirestore(projects: AddProjectProps[]): Chainable<Element>
    }
    interface Chainable {
      addCustomersToFirestore(customers: AddCustomerProps[]): Chainable<Element>
    }
    interface Chainable {
      addSessionsToFirestore(sessions: AddSessionProps[]): Chainable<Element>
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

Cypress.Commands.add('createUserFromSettings', (customerData: AddCustomerProps) => {
  cy.get(customer.customersSettings).click()
  cy.get(customer.addCustomerButton).click()
  cy.get(customer.formName).type(customerData.name)
  cy.get(customer.formContact).type(customerData.contact)
  cy.get(customer.formEmail).type(customerData.email)
  cy.get(customer.formAddress).type(customerData.address)
  cy.get(customer.formPhone).type(customerData.phone)
  cy.get(customer.formRate).type(customerData.rate.toString())
  cy.get(customer.formNote).type(customerData.note)
  cy.get(customer.formSubmitButton).click({ force: true })
  cy.get(customer.settingsHeader).should('exist')
  cy.get(settings.back).click({ force: true })
})

Cypress.Commands.add('createProjectFromSettings', (projectData: AddProjectProps) => {
  cy.get(project.projectSettings).click()
  cy.get(project.addProjectButton).click()
  cy.get(project.formName).type(projectData.name)
  cy.get(project.formRate).type(projectData.rate.toString())
  if (projectData.customer) {
    cy.selectMui(project.formCustomer, projectData.customer)
  }

  cy.get(project.formSubmitButton).click({ force: true })
  cy.get(project.settingsHeader).should('exist')
  cy.get(settings.back).click({ force: true })
})

Cypress.Commands.add('createTaskFromSettings', (taskData: AddTaskpProps) => {
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

Cypress.Commands.add('addProjectsToFirestore', (projects: AddProjectProps[]) => {
  cy.callFirestore('get', 'users').then((users) => {
    const userId = users.find((user) => user.name === 'UI Test').id
    if (!userId) throw new Error('no test user found')

    projects.forEach((project) => {
      cy.callFirestore('get', `users/${userId}/customers`).then((customers) => {
        const customerId = customers?.find((customer) => customer.name === project.customer).id

        cy.callFirestore('add', `users/${userId}/projects`, {
          name: project.name,
          rate: setValueToFb(project.rate),
          color: setValueToFb(project.color),
          customerId: setValueToFb(customerId),
        })
      })
    })
  })
})

Cypress.Commands.add('addCustomersToFirestore', (customers: AddCustomerProps[]) => {
  cy.callFirestore('get', 'users').then((users) => {
    const userId = users.find((user) => user.name === 'UI Test').id
    if (!userId) throw new Error('no test user found')

    customers.forEach((customer) => {
      cy.callFirestore('add', `users/${userId}/customers`, {
        name: customer.name,
        contact: setValueToFb(customer.contact),
        email: setValueToFb(customer.email),
        address: setValueToFb(customer.address),
        phone: setValueToFb(customer.phone),
        rate: setValueToFb(customer.rate),
        note: setValueToFb(customer.note),
      })
    })
  })
})

Cypress.Commands.add('addTasksToFirestore', (tasks: AddTaskpProps[]) => {
  cy.callFirestore('get', 'users').then((users) => {
    const userId = users.find((user) => user.name === 'UI Test').id
    if (!userId) throw new Error('no test user found')

    tasks.forEach((task) => {
      cy.callFirestore('add', `users/${userId}/tasks`, {
        name: task.name,
        description: setValueToFb(task.description),
        color: setValueToFb(task.color),
        isFavorite: setValueToFb(task.isFavorite),
      })
    })
  })
})

Cypress.Commands.add('addSessionsToFirestore', (sessions: AddSessionProps[]) => {
  cy.callFirestore('get', 'users').then((users) => {
    const userId = users.find((user) => user.name === 'UI Test').id
    if (!userId) throw new Error('no test user found')

    sessions.forEach((session) => {
      cy.callFirestore('get', `users/${userId}/projects`).then((projects) => {
        const projectId = projects?.find((project) => project.name === session.project).id

        cy.callFirestore('add', `users/${userId}/session`, {
          activ: session.activ,
          start: session.start,
          end: setValueToFb(session.end),
          duration: setValueToFb(session.duration),
          break: setValueToFb(session.break),
          note: setValueToFb(session.note),
          projectId: setValueToFb(projectId),
          taskIds: session.taskIds || [],
        })
      })
    })
  })
})

Cypress.Commands.add('selectMui', (select: string, option: string) => {
  cy.get(select).parent().click()
  cy.get('[role="option"]').should('exist').contains(option).click()
})

Cypress.Commands.add('multiSelectMui', (select: string, options: string[]) => {
  cy.get(select).parent().click()
  options.forEach((option) => {
    cy.get('[role="option"]').should('exist').contains(option).click()
  })
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
