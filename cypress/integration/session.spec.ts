import moment from 'moment'
import { session } from '../support/fields'

describe('session', () => {
  beforeEach(() => {
    cy.loginToTT()
  })

  it('setup', () => {
    cy.fixture('session.json').then((data) => {
      cy.callFirestore('get', 'users').then((users) => {
        const userId = users.find((user) => user.name === 'UI Test').id
        if (!userId) throw new Error('no test user found')

        cy.callFirestore('add', `users/${userId}/projects`, {
          name: data.projectLive.name,
          rate: data.projectLive.rate,
          color: data.projectLive.color,
        })

        cy.callFirestore('add', `users/${userId}/projects`, {
          name: data.projectWebsite.name,
          rate: data.projectWebsite.rate,
          color: data.projectWebsite.color,
        })

        cy.callFirestore('add', `users/${userId}/projects`, {
          name: data.projectApp.name,
          rate: data.projectApp.rate,
          color: data.projectApp.color,
        })

        cy.callFirestore('add', `users/${userId}/tasks`, {
          name: data.taskTest.name,
          description: data.taskTest.description,
          color: data.taskTest.color,
          isFavorite: false,
        })
        cy.callFirestore('add', `users/${userId}/tasks`, {
          name: data.taskRef.name,
          description: data.taskRef.description,
          color: data.taskRef.color,
          isFavorite: false,
        })
        cy.callFirestore('add', `users/${userId}/tasks`, {
          name: data.taskPipe.name,
          description: data.taskPipe.description,
          color: data.taskPipe.color,
          isFavorite: false,
        })
        cy.callFirestore('add', `users/${userId}/tasks`, {
          name: data.taskFeat.name,
          description: data.taskFeat.description,
          color: data.taskFeat.color,
          isFavorite: false,
        })
      })
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
      cy.multiSelectMui(session.sessionTask, [data.taskFeat.name])

      cy.get(session.formSubmitButton).click({ force: true })
      cy.get(session.sessionLiveClock).should('exist')
      cy.contains(data.projectWebsite.name)
      cy.contains('1:00H')
      cy.contains('30.00€')
    })
  })

  it('update project', () => {
    cy.fixture('session.json').then((data) => {
      cy.contains(data.projectWebsite.name).click()
      cy.get(session.formHeader).should('exist')

      cy.enterDateTimeMui(session.sessionStart, '02.03.22 09:00')
      cy.enterDateTimeMui(session.sessionEnd, '02.03.22 13:00')
      cy.get(session.sessionBreak).clear().type('60')
      cy.selectMui(session.sessionProject, data.projectApp.name)
      cy.multiSelectMui(session.sessionTask, [data.taskTest.name, data.taskPipe.name])

      cy.get(session.formSubmitButton).click({ force: true })
      cy.get(session.sessionLiveClock).should('exist')
      cy.contains(data.projectApp.name)
      cy.contains('3:00H')
      cy.contains('150.00€')
    })
  })

  it('delete project', () => {
    cy.fixture('session.json').then((data) => {
      cy.contains(data.projectApp.name).click()

      cy.get(session.formDeleteButton).click({ force: true })
      cy.get(session.sessionLiveClock).should('exist')
      cy.contains(data.projectApp.name).should('not.exist')
    })
  })

  it('start session', () => {
    cy.get(session.sessionLiveTrack).click()
    cy.get(session.sessionLiveWorking).should('exist')
    cy.wait(2000)
    cy.get(session.sessionLiveTrack).click()
    cy.get(session.sessionLiveWorking).should('not.exist')
    cy.contains('0:00H').click()
    cy.get(session.formDeleteButton).click({ force: true })
  })

  it('start session with project', () => {
    cy.fixture('session.json').then((data) => {
      cy.get(session.sessionLiveTrack).click()
      cy.get(session.sessionLiveWorking).should('exist')
      cy.selectMui(session.sessionLiveProject, data.projectWebsite.name)
      cy.wait(2000)
      cy.get(session.sessionLiveTrack).click()
      cy.get(session.sessionLiveWorking).should('not.exist')
      cy.contains(data.projectWebsite.name).click()
      cy.get(session.formDeleteButton).click({ force: true })
    })
  })

  it('end session session with project', () => {
    cy.fixture('session.json').then((data) => {
      cy.callFirestore('get', 'users').then((users) => {
        const userId = users.find((user) => user.name === 'UI Test').id
        const twoHoursParst = moment().subtract({ hours: 2 }).valueOf()

        if (!userId) throw new Error('no test user found')

        cy.callFirestore('add', `users/${userId}/session`, {
          activ: true,
          start: twoHoursParst,
        })
        cy.wait(500)
        cy.get(session.sessionLiveWorking).should('exist')
        cy.contains('2:00')
        cy.selectMui(session.sessionLiveProject, data.projectWebsite.name)

        cy.get(session.sessionLiveTrack).click()
        cy.get(session.sessionLiveWorking).should('not.exist')
        cy.contains('2:00H')
        cy.contains('60.00€')
      })
    })
  })
})
