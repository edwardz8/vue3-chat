import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyAj9RUnWZ4fRemwpgnKAn3h_mMBsxykgyg",
    authDomain: "vue3-chat.firebaseapp.com",
    projectId: "vue3-chat",
    storageBucket: "vue3-chat.appspot.com",
    messagingSenderId: "736646944144",
    appId: "1:736646944144:web:9c0cf02cce062bf3594f15",
    measurementId: "G-WS1BJ5Y1CN"
};

const db = firebase.initializeApp(firebaseConfig)
export default db

createApp(App).use(store).use(router).mount('#app')