import { session } from '../support/fields'

describe('session', () => {
  beforeEach(() => {
    cy.loginToTT()
  })

  it('setup', () => {
    cy.fixture('session.json').then((data) => {
      cy.get(session.sessionLiveTrack).click()
      cy.get(session.sessionLiveWorking).should('exist')

      cy.get(session.settingsButton).click()

      cy.createProjectFromSettings(data.projectLive)
      cy.createProjectFromSettings(data.projectWebsite)
      cy.createProjectFromSettings(data.projectApp)

      cy.createTaskFromSettings(data.TaskTest)
      cy.createTaskFromSettings(data.TaskRef)
      cy.createTaskFromSettings(data.TaskPipe)
      cy.createTaskFromSettings(data.TaskFeat)
    })
  })

  it('check session tracker', () => {
    cy.get(session.sessionLiveClock).should('exist')
    cy.get(session.sessionLiveDuration).should('exist')
    cy.get(session.sessionLiveProject).should('exist')
    cy.get(session.sessionLiveTrack).should('exist')
  })

  it('check session form', () => {
    cy.get(session.addSessionButton).click()
    cy.get(session.formHeader).should('exist')
    cy.contains('Session').should('exist')

    cy.get(session.sessionStart).should('exist')
    cy.get(session.sessionEnd).should('exist')
    cy.get(session.sessionBreak).should('exist')
    cy.get(session.sessionProject).should('exist')
    cy.get(session.sessionTask).should('exist')
    cy.get(session.sessionNote).should('exist')

    cy.get(session.formSubmitButton).should('exist')
    cy.get(session.formDeleteButton).should('not.exist')
    cy.get(session.formCancleButton).should('exist')
  })

  //TODO check session form validation

  it('create session', () => {
    cy.fixture('session.json').then((data) => {
      //Todo generate date with time to type
      cy.get(session.addSessionButton).click()
      cy.get(session.formHeader).should('exist')
      cy.enterDateTimeMui(session.sessionStart, '02.03.22 10:00')
      cy.enterDateTimeMui(session.sessionEnd, '02.03.22 11:30')
      cy.get(session.sessionBreak).clear().type('30')
      cy.selectMui(session.sessionProject, data.projectWebsite.name)
      cy.selectMui(session.sessionTask, data.TaskPipe.name)

      cy.get(session.formSubmitButton).click({ force: true })
      cy.get(session.sessionLiveClock).should('exist')
      cy.contains(data.projectWebsite.name)
      cy.contains('1:00H')
      cy.contains('30.00€')
    })
  })

  // it('check update project', () => {
  //   cy.fixture('project.json').then((data) => {
  //     cy.contains(data.name).should('exist')
  //     cy.contains(data.name).click()

  //     cy.get(project.formName).clear().type(data.nameUpdate)
  //     cy.get(project.formRate).clear().type(data.rateUpdate)
  //     cy.selectMui(project.formCustomer, data.customer2.name)

  //     cy.get(project.formSubmitButton).click({ force: true })
  //     cy.get(project.settingsHeader).should('exist')

  //     cy.contains(data.name).should('not.exist')
  //     cy.contains(data.nameUpdate).should('exist')
  //     cy.contains(data.nameUpdate).click()

  //     cy.get(project.formName).should('have.value', data.nameUpdate)
  //     cy.get(project.formRate).should('have.value', data.rateUpdate)
  //     cy.contains(data.customer2.name)
  //   })
  // })

  // it('check delete project', () => {
  //   cy.fixture('project.json').then((data) => {
  //     cy.contains(data.nameUpdate).should('exist')
  //     cy.contains(data.nameUpdate).click()

  //     cy.get(project.formDeleteButton).click({ force: true })
  //     cy.get(project.settingsHeader).should('exist')
  //     cy.contains(data.name).should('not.exist')
  //     cy.contains(data.nameUpdate).should('not.exist')
  //   })
  // })
})
