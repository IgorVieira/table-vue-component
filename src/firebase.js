import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: "AIzaSyDFVJ7BG0tVECcFgoQRAa1XbseRn40LXRc",
  authDomain: "my-awesome-project-6430e.firebaseapp.com",
  databaseURL: "https://my-awesome-project-6430e.firebaseio.com",
  projectId: "my-awesome-project-6430e",
  storageBucket: "my-awesome-project-6430e.appspot.com",
  messagingSenderId: "349394094508"
})

export const db = app.database()
export const paymentRef = db.ref('payments')
