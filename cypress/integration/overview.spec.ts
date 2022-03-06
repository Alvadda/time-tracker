import moment, { Moment } from 'moment'
import { calcSessionDuration } from '../../src/utils/timeUtil'
import { overview } from '../support/fields'

describe('overview', () => {
  before(() => {
    cy.resetFirestore()
  })

  beforeEach(() => {
    cy.loginToTT()
    cy.wait(500)
    cy.get(overview.overviewButton).click()
  })

  it('setup', () => {
    cy.fixture('overview.json').then((data) => {
      cy.addCustomersToFirestore(data.customers).then(() => {
        cy.addProjectsToFirestore(data.projects).then(() => cy.addSessionsToFirestore(createSessions()))
      })
    })
  })

  it('check default', () => {
    cy.contains('Overview').should('exist')
    cy.get(overview.from).should('exist')
    cy.get(overview.to).should('exist')
    cy.get(overview.from).should('exist')
    cy.get(overview.from).should('exist')
    getCard('Total').find(overview.time).should('exist')
    getCard('Total').find(overview.earing).should('exist')

    cy.checkDateTimeMui(overview.from, moment().subtract(7, 'days').format('DD.MM.YYYY'))
    cy.checkDateTimeMui(overview.to, moment().format('DD.MM.YYYY'))
  })

  it('Totel summs', () => {
    checkCardValues('Total', '3:30', '70.00')
  })

  it('Summs default', () => {
    cy.get(overview.card).should('have.length', 2)

    checkCardValues('Total', '3:30', '70.00')
    checkCardValues('Project', '3:30', '70.00')
  })

  it('Summs one month', () => {
    cy.enterDateTimeMui(overview.from, moment().subtract(1, 'months').format('DD.MM.YYYY'))

    cy.get(overview.card).should('have.length', 3)
    checkCardValues('Total', '10:30', '140.00')
    checkCardValues('Project', '3:30', '70.00')
    checkCardValues('Customer', '7:00', '70.00')
  })

  it('Summs two month', () => {
    cy.enterDateTimeMui(overview.from, moment().subtract(2, 'months').format('DD.MM.YYYY'))

    cy.get(overview.card).should('have.length', 4)
    checkCardValues('Total', '17:30', '140.00')
    checkCardValues('Project', '3:30', '70.00')
    checkCardValues('Customer', '7:00', '70.00')
    checkCardValues('No Rate', '7:00', '0.00')
  })

  it('Project stats overview', () => {
    getCard('Project').click()
    cy.contains('Project')
    cy.get(overview.sessionBack).should('exist')
    cy.get(overview.session).should('have.length', 7)

    cy.get(overview.session)
      .first()
      .find('.MuiListItemText-primary')
      .should((p) => expect(p).to.contain('10.00 €'))

    cy.get(overview.session)
      .first()
      .find('.MuiListItemText-secondary')
      .should((p) => expect(p).to.contain('0:30'))

    cy.get(overview.sessionBack).click()
    cy.contains('Overview').should('exist')

    cy.enterDateTimeMui(overview.from, moment().subtract(2, 'days').format('DD.MM.YYYY'))

    getCard('Project').click()
    cy.contains('Project')
    cy.get(overview.session).should('have.length', 2)
  })
})

function checkCardValues(name: string, hour: string, earning: string) {
  getCard(name)
    .find(overview.hours)
    .should((p) => expect(p).to.contain(`${hour} Hours`))

  getCard(name)
    .find(overview.earingAmount)
    .should((p) => expect(p).to.contain(`${earning}€`))
}

function getCard(name: string) {
  return cy.contains(name).parent().parent()
}

function createSessions() {
  const sessions = []
  const startDate = moment()

  sessions.push(...createSessionsForOneWeek(startDate, 'Project', 30))
  sessions.push(...createSessionsForOneWeek(startDate.subtract(12, 'days'), 'Customer'))
  sessions.push(...createSessionsForOneWeek(startDate.subtract(18, 'days'), 'No Rate'))

  return sessions
}

function createSessionsForOneWeek(startDate: Moment, project?: string, sessionBreak = 0) {
  const dateToStart = moment(startDate)
  const sessions = []

  for (let i = 1; i <= 7; i++) {
    const day = moment(dateToStart).subtract(i, 'days')
    const start = day.valueOf()
    const end = day.add(1, 'hour').valueOf()
    sessions.push({
      start,
      end,
      duration: calcSessionDuration(start, end),
      break: sessionBreak,
      project: project,
    })
  }

  return sessions
}
