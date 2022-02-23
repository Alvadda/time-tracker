import { settings } from '../support/fields'

describe('settings', () => {
  beforeEach(() => {
    cy.login()
    cy.get(settings.settingsButton).click()
  })
  it('options', () => {
    cy.get(settings.projects).should('exist')
    cy.get(settings.customers).should('exist')
    cy.get(settings.tasks).should('exist')
    cy.get(settings.defaultProject).should('exist')
    cy.get(settings.break).should('exist')
    cy.get(settings.breakRule).should('exist')
    cy.get(settings.rate).should('exist')
    cy.get(settings.darkmode).should('exist')
    cy.get(settings.email).should('exist')
    cy.get(settings.logout).should('exist')
    cy.get(settings.version).should('exist')
  })

  it('inputs', () => {
    cy.get(settings.breakInput).clear()
    cy.get(settings.breakRuleInput).clear()
    cy.get(settings.rateInput).clear()
    cy.wait(500)

    cy.get(settings.breakInput).clear().type('30')
    cy.get(settings.breakInput).invoke('val').should('eq', '30')

    cy.get(settings.breakRuleInput).clear().type('6')
    cy.get(settings.breakRuleInput).invoke('val').should('eq', '6')

    cy.get(settings.rateInput).clear().type('25.4')
    cy.get(settings.rateInput).invoke('val').should('eq', '25.4')

    cy.get(settings.overviewButton).click()
    cy.get(settings.settingsButton).click()
    cy.get(settings.rateInput).invoke('val').should('eq', '25.4')
    cy.get(settings.breakRuleInput).invoke('val').should('eq', '6')
    cy.get(settings.breakInput).invoke('val').should('eq', '30')
  })
})
