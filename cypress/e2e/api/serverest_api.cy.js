describe('Testes de API - ServeRest', () => {
  const apiUrl = Cypress.env('apiBaseUrl');
  let usuario;
  let token;

  before(() => {
    // Preparação única: gera massa, cadastra e obtém token para todo o conjunto de testes
    cy.gerarUsuario().then((user) => {
      usuario = user;
      cy.request('POST', `${apiUrl}/usuarios`, usuario);
      cy.getToken(usuario.email, usuario.password).then((t) => {
        token = t;
      });
    });
  });

  it('CT01 - Deve cadastrar um novo usuário com sucesso', () => {
    cy.gerarUsuario().then((novoUsuario) => {
      cy.request('POST', `${apiUrl}/usuarios`, novoUsuario).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
      });
    });
  });

  it('CT02 - Deve realizar login com um usuário válido', () => {
    cy.request('POST', `${apiUrl}/login`, {
      email: usuario.email,
      password: usuario.password
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
    });
  });

  it('CT03 - Deve cadastrar um produto com sucesso usando Fixture', () => {
    cy.fixture('produto').then((dadosProduto) => {
      // Timestamp garante unicidade do nome para evitar conflito de duplicação no servidor
      dadosProduto.nome = `${dadosProduto.nome} - ${new Date().getTime()}`;

      cy.request({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: { authorization: token },
        body: dadosProduto
      }).then((responseProduto) => {
        expect(responseProduto.status).to.eq(201);
        expect(responseProduto.body.message).to.eq('Cadastro realizado com sucesso');
        expect(responseProduto.body).to.have.property('_id');
      });
    });
  });
});