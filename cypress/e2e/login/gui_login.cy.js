/// <reference types="cypress" /> 


describe.only('Teste funcional de login', () => {
    
    before(() => {
        
    });

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        
    });
    
    after(() => {
        
    });
    
    afterEach(() => {
        
    });
    
    
        it('Deve efetuar o login com sucesso', () => {
        
        cy.gui_login('standard_user', 'secret_sauce')

        cy.get('.title').should('contain', 'Products')
    });

        it('Deve validar usuario incorreto', () => {
            
           
            cy.gui_login('incorreto', 'secret_sauce')
            //cy.get('[data-test="password"]').type('secret_sauce')
            // cy.get('[data-test="username"]').type('incorreto')
            //cy.get('[data-test="login-button"]').click()

            cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    
            
        });

        it('Deve validar senha incorreta', () => {
            
           
           cy.gui_login('standard_user', 'incorreto')
            //cy.get('[data-test="password"]').type('incorreta')
            //cy.get('[data-test="login-button"]').click()
            // cy.get('[data-test="username"]').type('standard_user')
    
            cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')

});

});