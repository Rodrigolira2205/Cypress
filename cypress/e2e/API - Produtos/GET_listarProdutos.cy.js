/// <reference types="cypress" />

describe('Validar busca de produtos', () => {
    it('Deve listar todos os produtos', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/produtos'
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(100)
        })
    });
});