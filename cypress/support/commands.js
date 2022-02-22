import login from '../fixtures/login.json'
import { loginEmailInput, loginPasswordInput, logoutButton } from './fields.js'

Cypress.Commands.add('login', () => {
  cy.get(loginEmailInput).type(login.email)
  cy.get(loginPasswordInput).type(login.password)

  cy.get(logoutButton).click()
  cy.get(logoutButton).should('not.exist')
})
