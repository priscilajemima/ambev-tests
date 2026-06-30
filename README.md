Desafio Técnico QA - AmbevEste repositório contém a automação de testes desenvolvida para o desafio técnico de QA da Ambev. O projeto contempla testes de ponta a ponta (E2E) no Frontend e testes automatizados de API, utilizando o framework Cypress e a linguagem JavaScript.  A aplicação testada é o ecossistema ServeRest, que simula uma plataforma de e-commerce.  Tecnologias e FerramentasFramework principal: Cypress (v13+)  Linguagem: JavaScript (ES6+)  Ambiente de Execução: Node.js  Estrutura do ProjetoO projeto foi estruturado seguindo as melhores práticas recomendadas pelo Cypress, mantendo uma separação clara entre massa de dados, comandos customizados e os cenários de teste.  Plaintextambev_tests/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   └── serverest_api.cy.js       # Cenários de teste da API REST
│   │   └── frontend/
│   │       └── serverest_front.cy.js     # Cenários de teste E2E da Interface
│   ├── fixtures/
│   │   └── produto.json                  # Massa de dados estática para criação de produtos
│   └── support/
│       ├── commands.js                   # Comandos customizados (Geração de massa dinâmica)
│       └── e2e.js                        # Configurações globais de suporte
├── .gitignore                            # Arquivo de exclusão de arquivos pesados (node_modules, vídeos, etc)
├── cypress.config.js                     # Arquivo de configuração central do Cypress
├── package.json                          # Gerenciador de dependências e scripts do projeto
└── README.md                             # Documentação do projeto
Cenários de Teste AutomatizadosForam implementados os 6 cenários solicitados, divididos igualmente entre API e Frontend:  Testes de API (cypress/e2e/api/)CT01 - Deve cadastrar um novo usuário com sucesso (POST): Valida a criação de novos usuários com e-mail dinâmico e o status code 201. CT02 - Deve realizar login com um usuário válido (POST): Valida a autenticação e geração do token de autorização (Status 200).  CT03 - Deve cadastrar um produto com sucesso usando Fixture (POST): Valida a criação de produtos associando o token de admin e consumindo dados de um arquivo JSON estático.  Testes de Frontend E2E (cypress/e2e/frontend/)CT04 - Deve realizar o cadastro de um novo usuário administrador: Valida o fluxo completo de registro na interface gráfica do ServeRest.  CT05 - Deve realizar login com sucesso: Valida o fluxo de login e o redirecionamento correto para o dashboard (/admin/home).  CT06 - Deve exibir mensagem de erro ao tentar login com senha inválida: Valida o comportamento de exceção do sistema e exibição do alerta de erro adequado.  Padrões de Projeto e Boas PráticasPara atender aos critérios de avaliação mais rigorosos, foram aplicadas as seguintes técnicas:  Massa de Dados Dinâmica (Custom Commands): Evita falhas de testes causadas por e-mails duplicados. O comando cy.gerarUsuario() cria dados únicos usando timestamps a cada execução.  Massa Estática via Fixtures: Uso do padrão de projeto de Fixtures (cypress/fixtures/produto.json) para centralizar os dados textuais de produtos, facilitando alterações futuras sem a necessidade de modificar o código do teste.  Padrão AAA (Arrange, Act, Assert): Blocos de códigos organizados visualmente entre Preparação, Ação e Validação para garantir legibilidade impecável.  Otimização de Testes de Tela: No teste de login do Frontend, o usuário pré-requisito é cadastrado via requisição de API (cy.request), reduzindo o tempo total de execução e focando o teste de tela estritamente no fluxo de login.  Conventional Commits: Histórico do Git estruturado e sem ruídos, separando commits por contexto lógico (feat:, test:, chore:).  Como Instalar e Executar o ProjetoPré-requisitosCertifique-se de ter o Node.js (versão 18 ou superior) instalado em sua máquina.  1. Clonar o RepositórioBashgit clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd ambev_tests
2. Instalar as DependênciasBashnpm install
3. Executar em Modo Interativo (Interface Gráfica)Ideal para desenvolvimento e acompanhamento visual dos testes.  Bashnpx cypress open
Após abrir a interface, selecione E2E Testing, escolha o navegador de preferência e selecione a Spec que deseja rodar.
4. Executar em Modo Headless (Via Terminal)Ideal para esteiras de Integração Contínua (CI/CD). Executa todos os testes em segundo plano e exibe um relatório formatado.  Bashnpx cypress run
Licença  Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica e está sob a licença MIT. 
