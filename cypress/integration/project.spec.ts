import { project } from '../support/fields'

describe('project', () => {
  beforeEach(() => {
    cy.loginToTT()
    cy.get(project.settingsButton).click()
    cy.get(project.projectSettings).click()
  })
  it('check project form', () => {
    cy.get(project.addProjectButton).click()
    cy.get(project.formHeader).should('exist')
    cy.contains('project').should('exist')
    cy.get(project.formName).should('exist')
    cy.get(project.formRate).should('exist')
    cy.get(project.formCustomer).should('exist')
    cy.get(project.formColor).should('exist')
    cy.get(project.formSubmitButton).should('exist')
    cy.get(project.formDeleteButton).should('not.exist')
    cy.get(project.formCancleButton).should('exist')
  })

  it('check create project', () => {
    cy.fixture('project.json').then((data) => {
      cy.get(project.settingsBack).click({ force: true })
      cy.createUserFromSettings(data.customer1)
      cy.createUserFromSettings(data.customer2)
      cy.get(project.projectSettings).click()
      cy.get(project.addProjectButton).click()

      cy.get(project.formName).should('have.attr', 'aria-invalid', 'false')
      cy.get(project.formSubmitButton).click({ force: true })
      cy.get(project.formName).should('have.attr', 'aria-invalid', 'true')

      cy.get(project.formName).type(data.name)
      cy.get(project.formRate).type(data.rate)
      cy.get(project.formRate).type(data.rateInvalid).should('have.value', data.rate)
      cy.selectMui(project.formCustomer, data.customer1.name)

      cy.get(project.formSubmitButton).click({ force: true })
      cy.get(project.settingsHeader).should('exist')
      cy.contains(data.name).should('exist')
      cy.contains(data.name).click()
      cy.get(project.formHeader).should('exist')

      cy.get(project.formName).should('have.value', data.name)
      cy.get(project.formRate).should('have.value', data.rate)
      cy.contains(data.customer1.name)
    })
  })

  it('check update project', () => {
    cy.fixture('project.json').then((data) => {
      cy.contains(data.name).should('exist')
      cy.contains(data.name).click()

      cy.get(project.formName).clear().type(data.nameUpdate)
      cy.get(project.formRate).clear().type(data.rateUpdate)
      cy.selectMui(project.formCustomer, data.customer2.name)

      cy.get(project.formSubmitButton).click({ force: true })
      cy.get(project.settingsHeader).should('exist')

      cy.contains(data.name).should('not.exist')
      cy.contains(data.nameUpdate).should('exist')
      cy.contains(data.nameUpdate).click()

      cy.get(project.formName).should('have.value', data.nameUpdate)
      cy.get(project.formRate).should('have.value', data.rateUpdate)
      cy.contains(data.customer2.name)
    })
  })

  it('check delete project', () => {
    cy.fixture('project.json').then((data) => {
      cy.contains(data.nameUpdate).should('exist')
      cy.contains(data.nameUpdate).click()

      cy.get(project.formDeleteButton).click({ force: true })
      cy.get(project.settingsHeader).should('exist')
      cy.contains(data.name).should('not.exist')
      cy.contains(data.nameUpdate).should('not.exist')
    })
  })
})
