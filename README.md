![build](https://github.com/alvadda/time-tracker/actions/workflows/main.yml/badge.svg)

<div align='center'>
  <h1 align="center">EasyTrack - simple time and work tracker</h1>
</div>

## Getting Started
This projects uses Firebase as a serverless backend. To run the App local, using the Firebase Emulator, there are a few staps to follow. 

1. Install the Firebase CLI globally.

    `npm install -g firebase-tools`

2. Login to the Firebase CLI with your Google account. After the login, you will receive a **Token**, save this Token, you will need it later!

    `firebase login:ci`
    
3. Clonse the Git Repo.

    `git clone https://github.com/Alvadda/time-tracker.git`
    
4. Install all the dependencies

    `npm install`
    
5. Set up your **.env** file, to get access to your Firebase Project.
  
    - Visit to your Project [Settings](https://console.firebase.google.com/u/0/project/time-tracker-4d8a7/settings/general/)
    - Copy the firebaseConfig values in your **.env** file like in the example below 
        ```
        FIREBASE_API_KEY= apiKey
        FIREBASE_AUTH_DOMAIN= authDomain
        FIREBASE_PROJECT_ID= projectId
        FIREBASE_STORAGE_BUCKET= storageBucket
        FIREBASE_MESSAGING_SENDER_ID= messagingSenderId
        FIREBASE_APP_ID= appId
        FIREBASE_TOKEN= *Token from stap 2*
        ```

6. Set up the Emulator for testing with continues data
