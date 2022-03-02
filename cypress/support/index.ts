import './commands'

beforeEach(() => {
  cy.viewport(400, 850)
  cy.visit('http://localhost:8080')
})

before(() => {
  cy.resetFirestore()
})
