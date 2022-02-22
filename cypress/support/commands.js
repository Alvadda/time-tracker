import { loginButton, loginEmailInput, loginPasswordInput } from './fields.js'

Cypress.Commands.add('login', () => {
  cy.fixture('login.json').then((login) => {
    cy.get(loginEmailInput).type(login.email)
    cy.get(loginPasswordInput).type(login.password)

    cy.get(loginButton).click()
    cy.get(loginButton).should('not.exist')
  })
})
