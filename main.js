import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAFPULs6tyo3CycyRUVR4to6Bi2x22dFyg",
    authDomain: "to-do-app-auth-eaadf.firebaseapp.com",
    projectId: "to-do-app-auth-eaadf",
    storageBucket: "to-do-app-auth-eaadf.appspot.com",
    messagingSenderId: "59842798112",
    appId: "1:59842798112:web:b786be9dcd4fcdceef5245"
};

// eslint-disable-next-line no-unused-vars
const application = initializeApp(firebaseConfig)
const app = createApp(App);
const db = getFirestore(application);
export { db }

app.use(router)
app.mount('#app')
