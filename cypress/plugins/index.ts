import { plugin as cypressFirebasePlugin } from 'cypress-firebase'
import admin from 'firebase-admin'
require('dotenv').config({ path: '.env' })

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  console.log('FIRESTORE_EMULATOR_HOST', process.env.FIRESTORE_EMULATOR_HOST)

  config.env.FIREBASE_API_KEY = process.env.FIREBASE_API_KEY
  config.env.FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN
  config.env.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
  config.env.FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET
  config.env.FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID
  config.env.FIREBASE_APP_ID = process.env.FIREBASE_APP_ID

  const extendedConfig = cypressFirebasePlugin(on, config, admin)
  return extendedConfig
}
