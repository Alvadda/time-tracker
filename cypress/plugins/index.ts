import { plugin as cypressFirebasePlugin } from 'cypress-firebase'
import admin from 'firebase-admin'

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  const extendedConfig = cypressFirebasePlugin(on, config, admin)
  return extendedConfig
}
