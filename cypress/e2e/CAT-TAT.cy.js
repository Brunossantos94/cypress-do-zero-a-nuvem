describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('Bruno')
    cy.get('#firstName').should('have.value', 'Bruno')
    cy.get('#lastName').should('be.visible').type('Santos')
    cy.get('#email').should('be.visible').type('teste@hotmail.com')
    cy.get('#open-text-area').should('be.visible').type(longText, { delay: 0 })
    cy.contains('button[type="submit"]', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').should('be.visible').type('Bruno')
    cy.get('#firstName').should('have.value', 'Bruno')
    cy.get('#lastName').should('be.visible').type('Santos')
    cy.get('#email').should('be.visible').type('teste@')
    cy.get('#open-text-area').should('be.visible').type('Primeiro exercicio do cypress, com texto longo', { delay: 15 })
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório', () => {
    cy.get('#firstName').should('be.visible').type('Bruno')
    cy.get('#firstName').should('have.value', 'Bruno')
    cy.get('#lastName').should('be.visible').type('Santos')
    cy.get('#email').should('be.visible').type('teste@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').should('be.visible').type('Primeiro exercicio do cypress, com texto longo', { delay: 15 })
    cy.contains('button[type="submit"]', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Bruno')
      .should('have.value', 'Bruno')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Santos')
      .should('have.value', 'Santos')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@hotmail.com')
      .should('have.value', 'teste@hotmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('999999999')
      .should('have.value', '999999999')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Bruno',
      lastName: 'Santos',
      email: 'teste@teste.com.br',
      text: 'Teste'
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('selecionando opção Youtube', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })

  it('selecionando opção Mentoria', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })

  it('selecionando opção blog', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  })


  it('Marca o tipo de atendimento Feedback', () => {
    cy.get('[type="radio"]')
      .check('feedback')
      .should('be.checked')

  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })
  it('marca ambos, depois desmarca o último', () => {
    cy.get('[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    //cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })



})

