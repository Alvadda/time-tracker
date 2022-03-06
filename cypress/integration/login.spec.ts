import { login, nav } from '../support/fields'

describe('login', () => {
  before(() => {
    cy.resetFirestore()
  })
  it('login with no data', () => {
    cy.fixture('login.json').then(() => {
      cy.get(login.emailInput).should('have.attr', 'aria-invalid', 'false')
      cy.get(login.passwordInput).should('have.attr', 'aria-invalid', 'false')

      cy.get(login.loginButton).click()
      cy.get(login.emailInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(login.passwordInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(login.loginButton).should('exist')
    })
  })

  it('login with with wrong data', () => {
    cy.fixture('login.json').then((loginFix) => {
      cy.get(login.emailInput).should('have.attr', 'aria-invalid', 'false')
      cy.get(login.passwordInput).should('have.attr', 'aria-invalid', 'false')

      cy.get(login.emailInput).type(loginFix.email_wrong)
      cy.get(login.passwordInput).type(loginFix.password_wrong)

      cy.get(login.loginButton).click()
      cy.get(login.emailInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(login.passwordInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(login.loginButton).should('exist')
    })
  })

  it('login with right data', () => {
    cy.fixture('login.json').then((loginFix) => {
      cy.get(login.emailInput).type(loginFix.email)
      cy.get(login.passwordInput).type(loginFix.password)

      cy.get(login.loginButton).click()
      cy.get(login.loginButton).should('not.exist')
    })
  })

  it('logout', () => {
    cy.fixture('login.json').then((loginFix) => {
      cy.get(login.emailInput).type(loginFix.email)
      cy.get(login.passwordInput).type(loginFix.password)

      cy.get(login.loginButton).click()
      cy.get(login.loginButton).should('not.exist')

      cy.get(nav.settingsButton).click()
      cy.get(login.logoutButton).click()
      cy.get(login.loginButton).should('exist')
    })
  })
})
