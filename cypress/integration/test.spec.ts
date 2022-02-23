describe('Some Test', () => {
  xit('Adds document to test_hello_world collection of Firestore', () => {
    cy.callFirestore('add', 'cypress', { some: 'value' })
  })
})
