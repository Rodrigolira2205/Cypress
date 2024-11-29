/// <reference types="cypress" />

Cypress.Commands.add('gui_login', (username, password) => {
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()

})

Cypress.Commands.add('adicionarItemNoCarrinho', (item) => {
    cy.contains(item).click()
    cy.get('.btn_primary').click()
    cy.get('[data-test="back-to-products"]').click()

})

Cypress.Commands.add('informaDadosDoComprador', (nome, sobrenome, cep) => {
        cy.get('[data-test="firstName"]').type(nome)
        cy.get('[data-test="lastName"]').type(sobrenome)
        cy.get('[data-test="postalCode"]').type(cep)
})