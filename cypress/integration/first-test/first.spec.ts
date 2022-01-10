describe('login', () => {
  it('login', () => {
    cy.fixture('login.json').then((login) => {
      cy.get(`[aria-label="Email"]`).type(login.email)
      cy.get(`[aria-label="Password"]`).type(login.password)
      cy.get(`[aria-label="Login"]`).click()
      cy.get(`[aria-label="Login"]`).should('not.exist')
    })
  })
})

export {}
