describe('Testes E2E Frontend - ServeRest', () => {
  let usuario;

  beforeEach(() => {
    cy.gerarUsuario().then((user) => {
      usuario = user;
      cy.request('POST', `${Cypress.env('apiBaseUrl')}/usuarios`, usuario);
      cy.login(usuario.email, usuario.password);
    });
  });

  it('CT04 - Deve realizar o cadastro de um novo usuário administrador', () => {
    cy.gerarUsuario().then((usuarioUnico) => {
      cy.visit('/cadastrarusuarios');
      
      cy.get('[data-testid="nome"]').type(usuarioUnico.nome);
      cy.get('[data-testid="email"]').type(usuarioUnico.email);
      cy.get('[data-testid="password"]').type(usuarioUnico.password);
      cy.get('[data-testid="checkbox"]').check();
      cy.get('[data-testid="cadastrar"]').click();

      cy.get('.alert').should('contain', 'Cadastro realizado com sucesso');
      cy.url().should('include', '/admin/home');
    });
  });

  it('CT05 - Deve acessar a home com sucesso após login', () => {
    cy.visit('/admin/home');
    cy.get('h1').should('contain', 'Bem Vindo');
  });

  it('CT06 - Deve exibir mensagem de erro ao tentar login com senha inválida', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="senha"]').type('senhaIncorreta123');
    cy.get('[data-testid="entrar"]').click();

    cy.get('.alert')
      .should('be.visible')
      .and('contain', 'Email e/ou senha inválidos');
  });

  it('CT07 - Deve cadastrar, listar e excluir um novo usuário', () => {
    cy.visit('/admin/cadastrarusuarios');

    const novoNome = `Novo QA ${new Date().getTime()}`;
    const novoEmail = `novo_qa${new Date().getTime()}@qa.com`;

    cy.get('[data-testid="nome"]').type(novoNome);
    cy.get('[data-testid="email"]').type(novoEmail);
    cy.get('[data-testid="password"]').type('senha123');
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrarUsuario"]').click();

    cy.url().should('include', '/admin/listarusuarios');
    cy.contains('td', novoNome).should('be.visible');

    cy.contains('tr', novoEmail)
      .contains('Excluir')
      .click();

    cy.contains('td', novoEmail).should('not.exist');
  });
});