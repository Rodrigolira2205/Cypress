/// <reference types="cypress" />

describe.only('API - Teste Funcional de Login', () => {
    it('Efetuar login com sucesso', () => {
        
        cy.api_login('fulano@qa.com', 'teste')
        .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
        })
    
    });
    it('Validar email não cadastrado', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
              "email": "fulano@inexistente.com",
              "password": "teste"
            },
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    });
    it('Validar senha incorreta', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
              "email": "fulano@qa.com",
              "password": "incorreta"
            },
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    });
    it('Validar email invalido', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
              "email": "fulacom",
              "password": "teste"
            },
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.equal(400)
            expect(response.body.email).to.equal('email deve ser um email válido')
        })
    });
    it('Validar senha em branco', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
              "email": "fulano@qa.com",
              "password": ""
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.password).to.equal('password não pode ficar em branco')
        })

    });
    
});