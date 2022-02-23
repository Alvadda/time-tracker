describe('Some Test', () => {
  it('Fire Store Test', () => {
    // cy.callFirestore('add', 'cypress', { some: 'value' })
    cy.callFirestore('get', 'users').then((user) => {
      console.log(user)
    })
  })
})
