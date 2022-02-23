/// <reference types="cypress" />
const admin = require('firebase-admin')
const cypressFirebasePlugin = require('cypress-firebase').plugin

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  const extendedConfig = cypressFirebasePlugin(on, config, admin)
  return extendedConfig
}
