const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      apiBaseUrl: 'https://serverest.dev',
    },
    baseUrl: 'https://front.serverest.dev',
    setupNodeEvents(on, config) {
    },
  },
});