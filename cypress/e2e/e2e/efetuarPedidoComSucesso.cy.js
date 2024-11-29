/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Teste E2E  - Realizacao de pedido com sucesso', () =>{
    
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    });
    
     it('Deve realizar um pedido com sucesso', () => {
        
        cy.gui_login('standard_user', 'secret_sauce')

        //cy.get('[data-test="username"]').type('standard_user')
        //cy.get('[data-test="password"]').type('secret_sauce')
        //cy.get('[data-test="login-button"]').click()
        

        //verifica se esta na tela de produtos
        cy.get('.title').should('contain', 'Products')
        
        //seleciona filtro no combo
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

        //valida se realmente reordenou de acordo com o filtro
        cy.get(loc.LISTAGEM_ITENS.PRIMEIRO).should('contain', 'Sauce Labs Onesie')
        cy.get(loc.LISTAGEM_ITENS.SEGUNDO).should('contain', 'Sauce Labs Bike Light')
        cy.get(loc.LISTAGEM_ITENS.TERCEIRO).should('contain', 'Sauce Labs Bolt T-Shirt')

        //clicar n produto e adicionar no carrinho 
        
        cy.adicionarItemNoCarrinho('Sauce Labs Onesie')
        cy.adicionarItemNoCarrinho('Sauce Labs Bike Light')
        cy.adicionarItemNoCarrinho('Sauce Labs Bolt T-Shirt')
        //cy.contains('Sauce Labs Onesie').click()
        //cy.get('.btn_primary').click()
        //cy.get('[data-test="back-to-products"]').click()

        //cy.contains('Sauce Labs Bike Light').click()
        //cy.get('.btn_primary').click()
        //cy.get('[data-test="back-to-products"]').click()

        //cy.contains('Sauce Labs Bolt T-Shirt').click()
        //cy.get('.btn_primary').click()
        //cy.get('[data-test="back-to-products"]').click()

        //verifica quantidade no carrinho
        cy.get('.shopping_cart_badge').should('have.text', '3').click()

        cy.get(loc.CARRINHO_ITENS.PRIMEIRO).should('contain', 'Sauce Labs Onesie')
        cy.get(loc.CARRINHO_ITENS.SEGUNDO).should('contain', 'Sauce Labs Bike Light')
        cy.get(loc.CARRINHO_ITENS.TERCEIRO).should('contain', 'Sauce Labs Bolt T-Shirt')
        cy.get('[data-test="checkout"]').click()
        
        //cy.get('[data-test="firstName"]').type('Karina')
        //cy.get('[data-test="lastName"]').type('Araujo')
        //cy.get('[data-test="postalCode"]').type('04933-110')
       
        cy.informaDadosDoComprador('Karina', 'Araujo', '04933_110')

        cy.get('[data-test="continue"]').click()

        cy.get(loc.CARRINHO_ITENS.PRIMEIRO).should('contain', 'Sauce Labs Onesie')
        cy.get(loc.CARRINHO_ITENS.SEGUNDO).should('contain', 'Sauce Labs Bike Light')
        cy.get(loc.CARRINHO_ITENS.TERCEIRO).should('contain', 'Sauce Labs Bolt T-Shirt')
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69')
        cy.get('[data-test="finish"]').click()
        
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')

    })
})