import moment, { Moment } from 'moment'
import { calcSessionDuration } from '../../src/utils/timeUtil'
describe('overview', () => {
  beforeEach(() => {
    cy.loginToTT()
  })

  it('setup', () => {
    cy.fixture('overview.json').then((data) => {
      cy.addCustomersToFirestore(data.customers).then(() => {
        cy.addProjectsToFirestore(data.projects).then(() => cy.addSessionsToFirestore(createSessions()))
      })
    })
  })
})

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
