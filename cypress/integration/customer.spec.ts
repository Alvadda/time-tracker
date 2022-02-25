import { customer } from '../support/fields'

describe('customer', () => {
  beforeEach(() => {
    cy.login()
    cy.get(customer.settingsButton).click()
    cy.get(customer.customersSettings).click()
  })
  it('check customer form', () => {
    cy.get(customer.addCustomerButton).click()
    cy.get(customer.formHeader).should('exist')
    cy.contains('customer').should('exist')
    cy.get(customer.formName).should('exist')
    cy.get(customer.formContact).should('exist')
    cy.get(customer.formEmail).should('exist')
    cy.get(customer.formAdress).should('exist')
    cy.get(customer.formPhone).should('exist')
    cy.get(customer.formRate).should('exist')
    cy.get(customer.formNote).should('exist')
    cy.get(customer.formClose).should('exist')
    cy.get(customer.formSubmitButton).should('exist')
    cy.get(customer.formDeleteButton).should('not.exist')
    cy.get(customer.formCancleButton).should('exist')
  })

  it('check create customer', () => {
    cy.fixture('customer.json').then((customerFix) => {
      cy.get(customer.addCustomerButton).click()

      cy.get(customer.formName).should('have.attr', 'aria-invalid', 'false')
      cy.get(customer.formSubmitButton).click()
      cy.get(customer.formName).should('have.attr', 'aria-invalid', 'true')

      cy.get(customer.formName).type(customerFix.name)
      cy.get(customer.formContact).type(customerFix.contact)
      cy.get(customer.formEmail).type(customerFix.email)
      cy.get(customer.formAdress).type(customerFix.adress)
      cy.get(customer.formPhone).type(customerFix.phone)
      cy.get(customer.formRate).type(customerFix.rate)
      cy.get(customer.formNote).type(customerFix.note)

      cy.get(customer.formRate).type(customerFix.rateInvalid)
      cy.get(customer.formRate).invoke('val').should('eq', customerFix.rate)

      cy.get(customer.formSubmitButton).click()
      cy.get(customer.settingsHeader).should('exist')
      cy.contains(customerFix.name).should('exist')
      cy.contains(customerFix.name).click()
      cy.get(customer.formHeader).should('exist')

      cy.get(customer.formName).invoke('val').should('eq', customerFix.name)
      cy.get(customer.formContact).invoke('val').should('eq', customerFix.contact)
      cy.get(customer.formEmail).invoke('val').should('eq', customerFix.email)
      cy.get(customer.formAdress).invoke('val').should('eq', customerFix.adress)
      cy.get(customer.formPhone).invoke('val').should('eq', customerFix.phone)
      cy.get(customer.formRate).invoke('val').should('eq', customerFix.rate)
      cy.get(customer.formNote).invoke('val').should('eq', customerFix.note)
    })
  })
})
