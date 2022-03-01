import { task } from '../support/fields'

describe('task', () => {
  beforeEach(() => {
    cy.loginToTT()
    cy.get(task.settingsButton).click()
    cy.get(task.taskSettings).click()
  })
  it('check task form', () => {
    cy.get(task.addTaskButton).click()
    cy.get(task.formHeader).should('exist')
    cy.contains('task').should('exist')
    cy.get(task.taskName).should('exist')
    cy.get(task.taskDescription).should('exist')
    cy.get(task.taskColor).should('exist')
    cy.get(task.taskFavorite).should('exist')
    cy.get(task.formSubmitButton).should('exist')
    cy.get(task.formDeleteButton).should('not.exist')
    cy.get(task.formCancleButton).should('exist')
  })

  it('check create task', () => {
    cy.fixture('task.json').then((data) => {
      cy.get(task.addTaskButton).click()

      cy.get(task.taskName).should('have.attr', 'aria-invalid', 'false')
      cy.get(task.formSubmitButton).click({ force: true })
      cy.get(task.taskName).should('have.attr', 'aria-invalid', 'true')

      cy.get(task.taskName).type(data.refector.name)
      cy.get(task.taskDescription).type(data.refector.description)
      cy.get(task.taskFavorite).check()

      cy.get(task.formSubmitButton).click({ force: true })
      cy.get(task.settingsHeader).should('exist')
      cy.contains(data.refector.name).should('exist')
      cy.contains(data.refector.name).click()
      cy.get(task.formHeader).should('exist')

      cy.get(task.taskName).should('have.value', data.refector.name)
      cy.get(task.taskDescription).should('have.value', data.refector.description)
      cy.get(task.taskFavorite).should('be.checked')
    })
  })

  it('check update task', () => {
    cy.fixture('task.json').then((data) => {
      cy.contains(data.refector.name).should('exist').click()

      cy.get(task.taskName).clear().type(data.test.name)
      cy.get(task.taskDescription).clear().type(data.test.description)
      cy.get(task.taskFavorite).uncheck()

      cy.get(task.formSubmitButton).click({ force: true })
      cy.get(task.settingsHeader).should('exist')

      cy.contains(data.refector.name).should('not.exist')
      cy.contains(data.test.name).should('exist')
      cy.contains(data.test.name).click()

      cy.get(task.taskName).should('have.value', data.test.name)
      cy.get(task.taskDescription).should('have.value', data.test.description)
      cy.get(task.taskFavorite).should('not.be.checked')
    })
  })

  it('check delete task', () => {
    cy.fixture('task.json').then((data) => {
      cy.contains(data.test.name).should('exist')
      cy.contains(data.test.name).click()

      cy.get(task.formDeleteButton).click({ force: true })
      cy.get(task.settingsHeader).should('exist')
      cy.contains(data.refector.name).should('not.exist')
      cy.contains(data.test.name).should('not.exist')
    })
  })

  it('check task favorite', () => {
    cy.fixture('task.json').then((data) => {
      cy.get(task.addTaskButton).click()
      cy.get(task.taskName).type(data.design.name)
      cy.get(task.taskDescription).type(data.design.description)
      cy.get(task.taskFavorite).check()

      cy.get(task.formSubmitButton).click({ force: true })
      cy.get(task.settingsHeader).should('exist')
      cy.get(task.taskFavoriteicon).should('exist')

      cy.contains(data.design.name).click()
      cy.get(task.taskFavorite).uncheck()
      cy.get(task.formSubmitButton).click({ force: true })

      cy.contains(data.design.name).should('exist')
      cy.get(task.taskFavoriteicon).should('not.exist')
    })
  })
})
