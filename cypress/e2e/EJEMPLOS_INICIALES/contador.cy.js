/// <reference types="cypress" />
describe('ejemplo inicial - test app 1', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  describe('boton contador', () => {
    it('se muestra un boton contador en la UI', () => {
      cy.get('[data-testid="boton-contador"]').should('exist');

      cy.get('[data-testid="boton-contador"]').should('include.text', 'Contador')
    })

    describe('cuando se hace click en el boton contador', () => {
      it('el contador se inicia en 0', () => {
        cy.get('[data-testid="boton-contador"]').should('include.text', '0')
        cy.get('[data-testid="boton-contador"]').should('not.include.text', '1')
      })

      it('el contador incrementa en 1 cuando se hace click en el', () => {
        cy.get('[data-testid="boton-contador"]').click()

        cy.get('[data-testid="boton-contador"]').should('include.text', '1')
        cy.get('[data-testid="boton-contador"]').should('not.include.text', '0')
      })
    }
  )})
})
