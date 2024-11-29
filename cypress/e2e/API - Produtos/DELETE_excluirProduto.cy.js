/// <reference types="cypress" />

describe('Validar exclusão de produtos', () => {
    let token
    let body
    let id

    before(() => {
        cy.api_login('fulano@qa.com', 'teste')
            .then(response => {
                token = response.body.authorization
            })
    });

    beforeEach(() => {
        cy.limparCarrinho(token)
        
        cy.construirBodyProduto()
            .then(construido => {
                body = construido
            })
    });
    it('Deve excluir um produto cadastrado', () => {
        cy.POST_cadastrarProduto(body, token)
            .then(response => {
                id = response.body._id
            }).then(() => {
                cy.DELETE_excluirProduto(id, token)
                    .then(response => {
                        expect(response.status).to.equal(200)
                        expect(response.body.message).to.equal('Registro excluído com sucesso')

                    })
            })
    });

    it('Validar exclusão de um produto inexistente', () => {
        id = Math.floor(Math.random() * 1000000)
        cy.DELETE_excluirProduto(id, token)
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Nenhum registro excluído')

            })
    });
    it('Não deve permitir excluir produto adicionado a algum carrinho', () => {
        cy.POST_cadastrarProduto(body, token)
            .then(response => {
                id = response.body._id
            }).then(() => {
                cy.POST_adicionarProdutoAoCarrinho(id, token)
            }).then(() => {
                cy.DELETE_excluirProduto(id, token)
                    .then(response => {
                        expect(response.status).to.equal(400)
                        expect(response.body.message).to.equal('Não é permitido excluir produto que faz parte de carrinho')
            })
        })

    });
}); 