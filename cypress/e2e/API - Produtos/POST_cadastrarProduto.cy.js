/// <reference types="cypress" />

const faker = require('faker')

describe('Validar cadastro de Produto', () => {
    let token
    let body


    before(() => {
        cy.api_login('fulano@qa.com', 'teste')
            .then(response => {
                token = response.body.authorization
            })
    });

    beforeEach(() => {
        cy.construirBodyProduto()
            .then(construido => {
                body = construido
            })
    });
    it('Cadastrar produto', () => {
        cy.POST_cadastrarProduto(body, token)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            })
    });

    it('Validar cadastro de produto já existente', () => {
        // Primeira chamada para tentar cadastrar um produto
        cy.POST_cadastrarProduto(body, token)
            .then(() => {
                // Segunda chamada para tentar cadastrar o mesmo produto novamente
                return cy.POST_cadastrarProduto(body, token)
            }).then(response => {
                // Verifica se a segunda chamada retornou o status esperado e a mensagem correta
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal('Já existe produto com esse nome')
            })

    })

})

