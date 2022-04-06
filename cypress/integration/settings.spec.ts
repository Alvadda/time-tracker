import { settings } from '../support/fields'

describe('settings', () => {
  before(() => {
    cy.resetFirestore()
  })

  beforeEach(() => {
    cy.loginToTT()
    cy.get(settings.settingsButton).click()
  })
  it('check page', () => {
    cy.fixture('settings.json').then((data) => {
      cy.contains('Settings')
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

  it('check inputs', () => {
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

  it('check timesheet infos', () => {
    cy.get(settings.timesheetInfos).click()
    cy.contains('Timesheet Infos')

    cy.get(settings.fullname).should('exist')
    cy.get(settings.street).should('exist')
    cy.get(settings.zipCode).should('exist')
    cy.get(settings.city).should('exist')

    cy.get(settings.fullname).clear().type('Meier')
    cy.get(settings.street).clear().type('Meier Street 9A')
    cy.get(settings.zipCode).clear().type('45458')
    cy.get(settings.city).clear().type('Hamburg')

    cy.get(settings.back).click()
    cy.get(settings.timesheetInfos).click()
    cy.get(settings.fullname).should('have.value', 'Meier')
    cy.get(settings.street).should('have.value', 'Meier Street 9A')
    cy.get(settings.zipCode).should('have.value', '45458')
    cy.get(settings.city).should('have.value', 'Hamburg')
  })
})
