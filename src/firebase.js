import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAyXde1AUIVb_ERBkWJiEa9BDcwChsLxbY",
    authDomain: "todolist-vueapp.firebaseapp.com",
    projectId: "todolist-vueapp",
    storageBucket: "todolist-vueapp.appspot.com",
    messagingSenderId: "919131164362",
    appId: "1:919131164362:web:3927352d730f14df842e33",
    measurementId: "G-XE5DS4PCKQ"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'list')