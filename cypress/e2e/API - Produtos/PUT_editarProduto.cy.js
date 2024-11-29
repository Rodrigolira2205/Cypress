/// <reference types="cypress" />

describe('Validação de edição de produtos', () => {
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
        cy.construirBodyProduto()
            .then(construido => {
                body = construido
            })
    });

    it('Validar edição de produto com sucesso', () => {
        cy.POST_cadastrarProduto(body, token)
            .then(response => {
                id = response.body._id

            }).then(() => {
                cy.construirBodyProduto((newbody) => {
                    body = newbody
                }).then(() => {
                    cy.PUT_editarProduto(id, body, token)
                        .then(response => {
                            expect(response.status).to.equal(200)
                            expect(response.body.message).to.equal('Registro alterado com sucesso')
                        })
                    })
                })
            });

        it('Validar edição de produto com id inexistente', () => {
            id = Math.floor(Math.random() * 1000000)
            cy.PUT_editarProduto(id, body, token)
            .then(response =>{
                expect(response.status).to.equal(201)
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            })
        });

        
        });

        


