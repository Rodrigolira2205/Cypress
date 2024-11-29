/// <reference types="cypress" />

const faker = require('faker')

Cypress.Commands.add('api_login', (email, password) => {
    cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
              "email": email,
              "password": password
            },
            failOnStatusCode: false
}).then((response) =>{
    return response
})

})
Cypress.Commands.add('construirBodyProduto', () => {
 let body = {
     "nome": faker.commerce.product()+Math.floor(Math.random() * 1000000),
     "preco": faker.commerce.price(),
     "descricao": faker.commerce.productDescription(),
     "quantidade": Math.floor(Math.random() * 100)
 }
  return body
})

Cypress.Commands.add('POST_cadastrarProduto', (body, token) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/produtos',
    body: body,
    headers: {
        authorization: token
    },
    failOnStatusCode: false
      }).then(response =>{
        return response
      })
    
    })

    Cypress.Commands.add('PUT_editarProduto', (id, body, token) => {
      cy.request({
        method: 'PUT',
        url: `http://localhost:3000/produtos/${id}`,
        body: body,
        headers: {
            authorization: token
        },
        failOnStatusCode: false
          }).then(response =>{
            return response
          })
        
        })

        Cypress.Commands.add('DELETE_excluirProduto', (id, token) => {
          cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/produtos/${id}`,
            headers: {
                authorization: token
            },
            failOnStatusCode: false
              }).then(response =>{
                return response

              })
            })

            Cypress.Commands.add('POST_adicionarProdutoAoCarrinho', (id, token) => {
              cy.request({
                method: 'POST',
                url: `http://localhost:3000/carrinhos`,
                body: {
                  "produtos": [
                    {
                      "idProduto": id,
                      "quantidade": 1
                    }
                    
                  ]
                },
                headers: {
                    authorization: token
                },
                failOnStatusCode: false
                  }).then(response =>{
                    return response
    
                  })
                })
                Cypress.Commands.add('limparCarrinho', (token) => {
                  cy.request({
                    method: 'DELETE',
                    url: `http://localhost:3000/carrinhos/cancelar-compra`,
                    headers: {
                        authorization: token
                    },
                    failOnStatusCode: false
                      }).then(response =>{
                        return response
        
                      })
                    })