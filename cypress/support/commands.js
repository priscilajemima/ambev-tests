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