describe('ejemplo inicial - test 2', () => {
  it('Existe redireccion a URL y campo para cargar email', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('fake@email.com')

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})

// The steps of this test are the following:

// 1. Visit: https://example.cypress.io
// 2. Find the element with content: type
// 3. Click on it
// 4. Get the URL
// 5. Assert it includes: /commands/actions
// 6. Get the input with the action-email class
// 7. Type fake@email.com into the input
// 8. Assert the input reflects the new value