describe('Testes E2E Frontend - ServeRest', () => {
  let usuario;

  beforeEach(() => {
    cy.gerarUsuario().then((user) => {
      usuario = user;
    });
  });

  it('CT04 - Deve realizar o cadastro de um novo usuário administrador', () => {
    // Arrange
    cy.visit('/cadastrarusuarios');
    
    // Act
    cy.get('[data-testid="nome"]').type(usuario.nome);
    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="password"]').type(usuario.password);
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrar"]').click();

    // Assert
    cy.get('.alert').should('contain', 'Cadastro realizado com sucesso');
    cy.url().should('include', '/admin/home');
  });

  it('CT05 - Deve realizar login com sucesso', () => {
    // Arrange: Cadastro prévio via API para otimizar o tempo de execução do teste E2E
    cy.request('POST', `${Cypress.env('apiBaseUrl')}/usuarios`, usuario);
    cy.visit('/login');

    // Act
    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="senha"]').type(usuario.password);
    cy.get('[data-testid="entrar"]').click();

    // Assert
    cy.url().should('include', '/admin/home');
    cy.get('h1').should('contain', `Bem Vindo`);
  });

  it('CT06 - Deve exibir mensagem de erro ao tentar login com senha inválida', () => {
    // Arrange
    cy.request('POST', `${Cypress.env('apiBaseUrl')}/usuarios`, usuario);
    cy.visit('/login');

    // Act
    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="senha"]').type('senhaIncorreta123');
    cy.get('[data-testid="entrar"]').click();

    // Assert
    cy.get('.alert')
      .should('be.visible')
      .and('contain', 'Email e/ou senha inválidos');
  });
});