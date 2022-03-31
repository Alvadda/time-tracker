import { customer } from '../support/fields'

describe('customer', () => {
  before(() => {
    cy.resetFirestore()
  })

  beforeEach(() => {
    cy.loginToTT()
    cy.get(customer.settingsButton).click()
    cy.get(customer.customersSettings).click()
  })
  it('check customer form', () => {
    cy.get(customer.addCustomerButton).click()
    cy.get(customer.formHeader).should('exist')
    cy.contains('Customer').should('exist')
    cy.get(customer.formName).should('exist')
    cy.get(customer.formContact).should('exist')
    cy.get(customer.formEmail).should('exist')
    cy.get(customer.formAddress).should('exist')
    cy.get(customer.formPhone).should('exist')
    cy.get(customer.formRate).should('exist')
    cy.get(customer.formNote).should('exist')
    cy.get(customer.formClose).should('exist')
    cy.get(customer.formSubmitButton).should('exist')
    cy.get(customer.formDeleteButton).should('not.exist')
    cy.get(customer.formCancleButton).should('exist')
  })

  it('create customer', () => {
    cy.fixture('customer.json').then((data) => {
      cy.get(customer.addCustomerButton).click()

      cy.get(customer.formName).should('have.attr', 'aria-invalid', 'false')
      cy.get(customer.formSubmitButton).click({ force: true })
      cy.get(customer.formName).should('have.attr', 'aria-invalid', 'true')

      cy.get(customer.formName).type(data.name)
      cy.get(customer.formContact).type(data.contact)
      cy.get(customer.formEmail).type(data.email)
      cy.get(customer.formAddress).type(data.address)
      cy.get(customer.formPhone).type(data.phone)
      cy.get(customer.formRate).type(data.rate)
      cy.get(customer.formNote).type(data.note)

      cy.get(customer.formRate).type(data.rateInvalid).should('have.value', data.rate)

      cy.get(customer.formSubmitButton).click({ force: true })
      cy.get(customer.settingsHeader).should('exist')
      cy.contains(data.name).should('exist')
      cy.contains(data.name).click()
      cy.get(customer.formHeader).should('exist')

      cy.get(customer.formName).should('have.value', data.name)
      cy.get(customer.formContact).should('have.value', data.contact)
      cy.get(customer.formEmail).should('have.value', data.email)
      cy.get(customer.formAddress).should('have.value', data.address)
      cy.get(customer.formPhone).should('have.value', data.phone)
      cy.get(customer.formRate).should('have.value', data.rate)
      cy.get(customer.formNote).should('have.value', data.note)
    })
  })

  it('update customer', () => {
    cy.fixture('customer.json').then((data) => {
      cy.contains(data.name).should('exist')
      cy.contains(data.name).click()

      cy.get(customer.formName).clear().type(data.nameUpdate)
      cy.get(customer.formContact).clear().type(data.contactUpdate)
      cy.get(customer.formEmail).clear().type(data.emailUpdate)
      cy.get(customer.formAddress).clear().type(data.addressUpdate)
      cy.get(customer.formPhone).clear().type(data.phoneUpdate)
      cy.get(customer.formRate).clear().type(data.rateUpdate)
      cy.get(customer.formNote).clear().type(data.noteUpdate)

      cy.get(customer.formSubmitButton).click({ force: true })
      cy.get(customer.settingsHeader).should('exist')
      cy.contains(data.name).should('not.exist')
      cy.contains(data.nameUpdate).should('exist')
      cy.contains(data.nameUpdate).click()

      cy.get(customer.formName).should('have.value', data.nameUpdate)
      cy.get(customer.formContact).should('have.value', data.contactUpdate)
      cy.get(customer.formEmail).should('have.value', data.emailUpdate)
      cy.get(customer.formAddress).should('have.value', data.addressUpdate)
      cy.get(customer.formPhone).should('have.value', data.phoneUpdate)
      cy.get(customer.formRate).should('have.value', data.rateUpdate)
      cy.get(customer.formNote).should('have.value', data.noteUpdate)
    })
  })

  it('delete customer', () => {
    cy.fixture('customer.json').then((data) => {
      cy.contains(data.nameUpdate).should('exist')
      cy.contains(data.nameUpdate).click()

      cy.get(customer.formDeleteButton).click({ force: true })
      cy.get(customer.settingsHeader).should('exist')
      cy.contains(data.name).should('not.exist')
      cy.contains(data.nameUpdate).should('not.exist')
    })
  })
})
