describe('login', () => {
  const emailInput = `[data-testid="login_email"]`
  const passwordInput = `[data-testid="login_password"]`
  const loginButton = `[data-testid="login_button"]`
  const logoutButton = `[data-testid="settings_logout"]`
  const navSettingsButton = `[data-testid="nav_settings"]`

  it('login with no data', () => {
    cy.fixture('login.json').then(() => {
      cy.get(emailInput).should('have.attr', 'aria-invalid', 'false')
      cy.get(passwordInput).should('have.attr', 'aria-invalid', 'false')

      cy.get(loginButton).click()
      cy.get(emailInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(passwordInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(loginButton).should('exist')
    })
  })

  it('login with with wrong data', () => {
    cy.fixture('login.json').then((login) => {
      cy.get(emailInput).should('have.attr', 'aria-invalid', 'false')
      cy.get(passwordInput).should('have.attr', 'aria-invalid', 'false')

      cy.get(emailInput).type(login.email_wrong)
      cy.get(passwordInput).type(login.password_wrong)

      cy.get(loginButton).click()
      cy.get(emailInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(passwordInput).should('have.attr', 'aria-invalid', 'true')
      cy.get(loginButton).should('exist')
    })
  })

  it('login with right data', () => {
    cy.fixture('login.json').then((login) => {
      cy.get(emailInput).type(login.email)
      cy.get(passwordInput).type(login.password)

      cy.get(loginButton).click()
      cy.get(loginButton).should('not.exist')
    })
  })

  it('logout', () => {
    cy.fixture('login.json').then((login) => {
      cy.get(emailInput).type(login.email)
      cy.get(passwordInput).type(login.password)

      cy.get(loginButton).click()
      cy.get(loginButton).should('not.exist')

      cy.get(navSettingsButton).click()
      cy.get(logoutButton).click()
      cy.get(loginButton).should('exist')
    })
  })
})

export {}
