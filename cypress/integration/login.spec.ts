import { loginButton, loginEmailInput, loginPasswordInput, logoutButton, navSettingsButton } from '../support/fields'

describe('login', () => {
  it('login with no data', () => {
    cy.fixture('login.json').then(() => {
      cy.get(loginEmailInput).should('have.attr', 'aria-invalid', 'false')
      cy.get(loginPasswordInput).should('have.attr', 'aria-invalid', 'false')

      cy.get(loginButton).click()
      cy.get(loginEmailInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(loginPasswordInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(loginButton).should('exist')
    })
  })

  it('login with with wrong data', () => {
    cy.fixture('login.json').then((login) => {
      cy.get(loginEmailInput).should('have.attr', 'aria-invalid', 'false')
      cy.get(loginPasswordInput).should('have.attr', 'aria-invalid', 'false')

      cy.get(loginEmailInput).type(login.email_wrong)
      cy.get(loginPasswordInput).type(login.password_wrong)

      cy.get(loginButton).click()
      cy.get(loginEmailInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(loginPasswordInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(loginButton).should('exist')
    })
  })

  it('login with right data', () => {
    cy.fixture('login.json').then((login) => {
      cy.get(loginEmailInput).type(login.email)
      cy.get(loginPasswordInput).type(login.password)

      cy.get(loginButton).click()
      cy.get(loginButton).should('not.exist')
    })
  })

  it('logout', () => {
    cy.fixture('login.json').then((login) => {
      cy.get(loginEmailInput).type(login.email)
      cy.get(loginPasswordInput).type(login.password)

      cy.get(loginButton).click()
      cy.get(loginButton).should('not.exist')

      cy.get(navSettingsButton).click()
      cy.get(logoutButton).click()
      cy.get(loginButton).should('exist')
    })
  })
})
