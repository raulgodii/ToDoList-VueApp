
import { createApp } from 'vue'
import App from './Index.vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'
import personalArea from './components/personal.vue';
import admin from './components/admin.vue';
import landing from './components/landingPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import signUp from './components/signUp.vue';
import { ref } from 'vue';
import identify from './components/identify.vue';

let auth = getAuth();
let usuario = getAuth().currentUser;

// Rutas
const routes = [
  { path: '/', component: landing },
  { path: '/personal', component: personalArea },
  { path: '/admin', component: admin },
  { path: '/signUp', component: signUp },
  { path: '/identify', component: identify }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})


router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  if(to.path=="/personal" && !usuario){
    return false;
  } else if(to.path=="/admin"){
    if(!usuario){
      return false;
    } else if(usuario.uid != "hNx48OsZn3NKzLJCLD2nTu7tZlG2"){
      return false;
    } else{
      return true
    }
  } else {
    return true;
  }

});

router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  if((to.path=="/identify" || to.path=="/signUp") && usuario){
    return false;
  } else {
    return true;
  }

});

// let loged = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    usuario = user;
    router.push("/personal");
    // ...
  } else {
    // User is signed out
    // ...
    router.push("/");
  }
});

const app = createApp(App)
app.use(router)
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})

app.mount('#app');