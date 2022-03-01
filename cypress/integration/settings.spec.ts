import { settings } from '../support/fields'

describe('settings', () => {
  beforeEach(() => {
    cy.loginToTT()
    cy.get(settings.settingsButton).click()
  })
  it('check Page', () => {
    cy.fixture('settings.json').then((data) => {
      cy.contains(data.headerText)
      cy.get(settings.header).should('exist')
      cy.get(settings.projects).should('exist')
      cy.get(settings.customers).should('exist')
      cy.get(settings.tasks).should('exist')
      cy.get(settings.defaultProject).should('exist')
      cy.get(settings.defaultProjectSelect).should('exist')
      cy.get(settings.break).should('exist')
      cy.get(settings.breakInput).should('exist')
      cy.get(settings.breakRule).should('exist')
      cy.get(settings.breakRuleInput).should('exist')
      cy.get(settings.rate).should('exist')
      cy.get(settings.rateInput).should('exist')
      cy.get(settings.darkmode).should('exist')
      cy.get(settings.darkmodeSwitch).should('exist')
      cy.get(settings.email).should('exist')
      cy.get(settings.userEmail).contains(data.email)
      cy.get(settings.logout).should('exist')
      cy.get(settings.version).should('exist')
    })
  })

  it('inputs', () => {
    cy.get(settings.breakInput).clear()
    cy.get(settings.breakRuleInput).clear()
    cy.get(settings.rateInput).clear()
    cy.get(settings.darkmodeSwitchCheck).should('be.checked')
    cy.wait(500)

    cy.get(settings.breakInput).clear().type('30').should('have.value', '30')
    cy.get(settings.breakRuleInput).clear().type('6').should('have.value', '6')
    cy.get(settings.rateInput).clear().type('25.4').should('have.value', '25.4')

    cy.get(settings.darkmodeSwitch).click()
    cy.get(settings.darkmodeSwitchCheck).should('not.checked')
    cy.get(settings.darkmodeSwitch).click()
    cy.get(settings.darkmodeSwitchCheck).should('be.checked')
  })
})
