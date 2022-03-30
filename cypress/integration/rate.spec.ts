import moment from 'moment'
import { calcSessionDuration } from '../../src/utils/timeUtil'
import { customer, overview, project, session, settings } from '../support/fields'

describe('rate', () => {
  before(() => {
    cy.resetFirestore()
  })

  beforeEach(() => {
    cy.loginToTT()
    cy.wait(500)
    cy.get(settings.settingsButton).click()
  })

  it('Setup', () => {
    const start = moment().valueOf()
    const end = moment().add(2, 'hours').valueOf()

    cy.fixture('rate.json').then((data) => {
      cy.addCustomersToFirestore(data.customers).then(() => {
        cy.addProjectsToFirestore(data.projects).then(() =>
          cy.addSessionsToFirestore([
            {
              start,
              end,
              duration: calcSessionDuration(start, end),
              project: 'Rate',
            },
          ])
        )
      })
    })
  })

  it('No rate', () => {
    cy.get(session.startButton).click()
    cy.get(session.sessionCard).first().contains('€').should('not.exist')
    cy.get(overview.overviewButton).click()

    checkCardValues('Total', '2:00', '0.00')
    checkCardValues('Rate', '2:00', '0.00')
  })

  it('Only default rate of "10"', () => {
    cy.get(settings.rateInput).clear().type('10').should('have.value', '10')
    cy.get(session.startButton).click()
    cy.get(session.sessionCard).first().contains('20.00€').should('exist')

    cy.get(overview.overviewButton).click()
    checkCardValues('Total', '2:00', '20.00')
    checkCardValues('Rate', '2:00', '20.00')
  })

  it('Customer with rate of "0"', () => {
    cy.get(customer.customersSettings).click()
    cy.contains('RateCus').click()
    cy.get(customer.formRate).type('0').should('have.value', '0')
    cy.get(customer.formSubmitButton).click({ force: true })

    cy.get(session.startButton).click()
    cy.get(session.sessionCard).first().contains('€').should('not.exist')

    cy.get(overview.overviewButton).click()
    checkCardValues('Total', '2:00', '0.00')
    checkCardValues('Rate', '2:00', '0.00')
  })

  it('Customer with rate of "20"', () => {
    cy.get(customer.customersSettings).click()
    cy.contains('RateCus').click()
    cy.get(customer.formRate).clear().type('20').should('have.value', '20')
    cy.get(customer.formSubmitButton).click({ force: true })

    cy.get(session.startButton).click()
    cy.get(session.sessionCard).first().contains('40.00€').should('exist')

    cy.get(overview.overviewButton).click()
    checkCardValues('Total', '2:00', '40.00')
    checkCardValues('Rate', '2:00', '40.00')
  })

  it('Project with rate of "0"', () => {
    cy.get(project.projectSettings).click()
    cy.contains('Rate').click()
    cy.get(project.formRate).clear().type('0').should('have.value', '0')
    cy.get(project.formSubmitButton).click({ force: true })

    cy.get(session.startButton).click()
    cy.get(session.sessionCard).first().contains('€').should('not.exist')

    cy.get(overview.overviewButton).click()
    checkCardValues('Total', '2:00', '0.00')
    checkCardValues('Rate', '2:00', '0.00')
  })

  it('Project with rate of "30"', () => {
    cy.get(project.projectSettings).click()
    cy.contains('Rate').click()
    cy.get(project.formRate).clear().type('30').should('have.value', '30')
    cy.get(project.formSubmitButton).click({ force: true })

    cy.get(session.startButton).click()
    cy.get(session.sessionCard).first().contains('60.00€').should('exist')

    cy.get(overview.overviewButton).click()
    checkCardValues('Total', '2:00', '60.00')
    checkCardValues('Rate', '2:00', '60.00')
  })

  it('Rate with break', () => {
    cy.get(session.startButton).click()
    cy.contains('Rate').click()
    cy.get(session.sessionBreak).clear().type('60')
    cy.get(project.formSubmitButton).click({ force: true })

    cy.get(session.sessionCard).first().contains('30.00€').should('exist')

    cy.get(overview.overviewButton).click()
    checkCardValues('Total', '1:00', '30.00')
    checkCardValues('Rate', '1:00', '30.00')
  })
})

function getCard(name: string) {
  return cy.contains(name).parent().parent()
}

function checkCardValues(name: string, hour: string, earning: string) {
  getCard(name)
    .find(overview.hours)
    .should((p) => expect(p).to.contain(`${hour}`))

  getCard(name)
    .find(overview.earingAmount)
    .should((p) => expect(p).to.contain(`${earning}€`))
}
