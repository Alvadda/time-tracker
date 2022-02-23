import { logoutButton, navSettingsButton } from '../support/fields'

describe('customer', () => {
  beforeEach(() => {
    cy.login()
  })
  it('test', () => {
    cy.get(navSettingsButton).click()
    cy.get(logoutButton).should('exist')
  })
})
