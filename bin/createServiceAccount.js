require('dotenv').config({ path: '../.env' })
const fs = require('fs')
const path = require('path')

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT

if (!serviceAccountString) {
  console.error('FIREBASE_SERVICE_ACCOUNT not found!')
  process.exit(1)
}

if (serviceAccountString) {
  fs.writeFile(path.join(__dirname, '../', 'serviceAccount.json'), serviceAccountString, function (err) {
    if (err) return console.log(err)
    console.log('serviceAccount.json created!')
  })
}
