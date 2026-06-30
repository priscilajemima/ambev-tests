/**
 * Gera uma massa de dados dinâmica para criação de usuários.
 * Retorna um objeto com nome, email (único via timestamp), senha e permissão de administrador.
 */
Cypress.Commands.add('gerarUsuario', () => {
  const timestamp = new Date().getTime();
  return {
    nome: `QA Tester ${timestamp}`,
    email: `qa${timestamp}@qa.com.br`,
    password: 'teste',
    administrador: 'true'
  };
});

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="senha"]').type(password);
    cy.get('[data-testid="entrar"]').click();
    
    cy.url().should('include', '/admin/home');
  });
});

Cypress.Commands.add('getToken', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/login`,
    body: { email, password }
  }).then((response) => {
    return response.body.authorization;
  });
});
