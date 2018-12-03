/// <reference types="Cypress" />

context('Login', () => {
  const baseUrl = Cypress.config().baseUrl

  beforeEach(() => {
    cy.visit('/')
  })

  describe('Login Page', () => {
    it('should have elements', () => {
      cy.url().should('eq', `${baseUrl}/login/`)
      cy.get('img').should('have.attr', 'alt', 'SimpleSat')
      cy.contains('Log in to your account')
      cy.contains('Email')
      cy.get('form.ui.large.form input[type="email"]').as('emailInput')
      cy.get('@emailInput').should('have.attr', 'name', 'email')
      cy.contains('Password')
      cy.get('form.ui.large.form input[type="password"]').should('have.attr', 'name', 'password')
      cy.get('#login_button').should('contain', 'Login')
      cy.get('.left > a').should('have.attr', 'href', '/reset-password/').and('contain', 'Forget your password?')
      cy.get('.right').should('contain', 'New to us?')
      cy.get('.right > a').should('have.attr', 'href', '/signup/').and('contain', 'Sign Up')
    })

    it('should be able to log in', () => {
      const username = Cypress.env('username')
      const password = Cypress.env('password')
      cy.get('input[type="email"]').type(username)
      cy.get('input[type="password"]').type(password)
      cy.get('#login_button').click()
      cy.url().should('eq', `${baseUrl}/`)
      cy.contains('Dashboard')
    })
  })
})
