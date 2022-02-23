import { login, nav } from '../support/fields'

describe('customer', () => {
  beforeEach(() => {
    cy.login()
  })
  it('test', () => {
    cy.get(nav.settingsButton).click()
    cy.get(login.logoutButton).should('exist')
  })
})
