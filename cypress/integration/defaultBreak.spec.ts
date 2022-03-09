import moment from 'moment'
import { session, settings } from '../support/fields'

describe('default break', () => {
  beforeEach(() => {
    cy.resetFirestore()
    cy.loginToTT()
    cy.get(settings.settingsButton).click()
  })

  it('With no defaults', () => {
    cy.addSessionsToFirestore([createActivSession(3)]).then(() => {
      cy.wait(500)

      cy.get(settings.breakInput).clear()
      cy.get(settings.breakRuleInput).clear()
      cy.get(session.startButton).click()

      cy.get(session.sessionLiveWorking).should('exist')
      cy.get(session.sessionLiveTrack).click()
      cy.get(session.sessionLiveWorking).should('not.exist')

      cy.get(session.sessionCard).first().contains('3:00H')
    })
  })

  it('No Rule with break', () => {
    cy.addSessionsToFirestore([createActivSession(3)]).then(() => {
      cy.wait(500)

      cy.get(settings.breakInput).clear().type('30').should('have.value', '30')
      cy.get(settings.breakRuleInput).clear()
      cy.get(session.startButton).click()

      cy.get(session.sessionLiveWorking).should('exist')
      cy.get(session.sessionLiveTrack).click()
      cy.get(session.sessionLiveWorking).should('not.exist')

      cy.get(session.sessionCard).first().contains('3:00H')
    })
  })

  it('Break longer then session', () => {
    cy.addSessionsToFirestore([createActivSession(1)]).then(() => {
      cy.wait(500)

      cy.get(settings.breakInput).clear().type('90').should('have.value', '90')
      cy.get(settings.breakRuleInput).clear()
      cy.get(session.startButton).click()

      cy.get(session.sessionLiveWorking).should('exist')
      cy.get(session.sessionLiveTrack).click()
      cy.get(session.sessionLiveWorking).should('not.exist')

      cy.get(session.sessionCard).first().contains('1:00H')
    })
  })

  it('Session shorter then apply rule', () => {
    cy.addSessionsToFirestore([createActivSession(1)]).then(() => {
      cy.wait(500)

      cy.get(settings.breakInput).clear().type('30').should('have.value', '30')
      cy.get(settings.breakRuleInput).clear().type('6').should('have.value', '6')
      cy.get(session.startButton).click()

      cy.get(session.sessionLiveWorking).should('exist')
      cy.get(session.sessionLiveTrack).click()
      cy.get(session.sessionLiveWorking).should('not.exist')

      cy.get(session.sessionCard).first().contains('1:00H')
    })
  })

  it('Session longer then apply rule', () => {
    cy.addSessionsToFirestore([createActivSession(7)]).then(() => {
      cy.wait(500)

      cy.get(settings.breakInput).clear().type('30').should('have.value', '30')
      cy.get(settings.breakRuleInput).clear().type('6').should('have.value', '6')
      cy.get(session.startButton).click()

      cy.get(session.sessionLiveWorking).should('exist')
      cy.get(session.sessionLiveTrack).click()
      cy.get(session.sessionLiveWorking).should('not.exist')

      cy.get(session.sessionCard).first().contains('6:30H')
    })
  })
})

function createActivSession(duration: number) {
  return {
    activ: true,
    start: moment().subtract(duration, 'hours').valueOf(),
  }
}
