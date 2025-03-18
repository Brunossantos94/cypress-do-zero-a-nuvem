Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data) => {

    cy.get('#firstName').type(data.firstName)
    cy.get('#firstName').should('have.value', data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)

    cy.contains('button[type="submit"]', 'Enviar').click()

})

Cypress.Commands.add('validaSucesso', () => {

    
    cy.get('.success').should('be.visible')
})