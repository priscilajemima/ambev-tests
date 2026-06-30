describe('Testes de API - ServeRest', () => {
  const apiUrl = Cypress.env('apiBaseUrl');
  let usuario;

  beforeEach(() => {
    cy.gerarUsuario().then((user) => {
      usuario = user;
    });
  });

  it('CT01 - Deve cadastrar um novo usuário com sucesso', () => {
    // Act
    cy.request('POST', `${apiUrl}/usuarios`, usuario).then((response) => {
      // Assert
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
    });
  });

  it('CT02 - Deve realizar login com um usuário válido', () => {
    // Arrange
    cy.request('POST', `${apiUrl}/usuarios`, usuario);

    // Act
    cy.request('POST', `${apiUrl}/login`, {
      email: usuario.email,
      password: usuario.password
    }).then((response) => {
      // Assert
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
    });
  });

  it('CT03 - Deve cadastrar um produto com sucesso usando Fixture', () => {
    // Arrange
    cy.request('POST', `${apiUrl}/usuarios`, usuario);
    cy.request('POST', `${apiUrl}/login`, {
      email: usuario.email,
      password: usuario.password
    }).then((responseLogin) => {
      const token = responseLogin.body.authorization;

      cy.fixture('produto').then((dadosProduto) => {
        // Necessário concatenar timestamp ao nome do produto para evitar erro 400 de duplicação
        dadosProduto.nome = `${dadosProduto.nome} - ${new Date().getTime()}`;

        // Act
        cy.request({
          method: 'POST',
          url: `${apiUrl}/produtos`,
          headers: { authorization: token },
          body: dadosProduto
        }).then((responseProduto) => {
          // Assert
          expect(responseProduto.status).to.eq(201);
          expect(responseProduto.body.message).to.eq('Cadastro realizado com sucesso');
          expect(responseProduto.body).to.have.property('_id');
        });
      });
    });
  });
});