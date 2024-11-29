const locators = {
CARRINHO_ITENS: {
    PRIMEIRO: '.cart_list > :nth-child(3)',
    SEGUNDO:  '.cart_list > :nth-child(4)',
    TERCEIRO: '.cart_list > :nth-child(5)'
},

LISTAGEM_ITENS: {
    PRIMEIRO: ':nth-child(1) > [data-test="inventory-item-description"]',
    SEGUNDO: ':nth-child(2) > [data-test="inventory-item-description"]',
    TERCEIRO: ':nth-child(3) > [data-test="inventory-item-description"]'
}

}

export default locators