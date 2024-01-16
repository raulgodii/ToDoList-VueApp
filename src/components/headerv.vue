<script setup>

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();

function iniciarSesion() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      usuario.value = result.user;
      router.push({ path: '/personal' })
      console.log("user name: " + usuario.value.displayName)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function cerrarSesion() {
  let auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    usuario.value=null;
    esAdmin.value = false;
    router.push("/");
  }).catch((error) => {
    // An error happened.
  });
}

const auth = getAuth();
let usuario = ref(auth.currentUser);
let esAdmin = ref(false);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("Loged")
    usuario.value = user;
    if(user.uid == "hNx48OsZn3NKzLJCLD2nTu7tZlG2"){
      esAdmin.value = true;
    }
    //loged.value = true;
    //console.log("LOGED: " + loged)

    // ...
  } else {
    // User is signed out
    // ...
    console.log("No log")
    //loged.value = false;
  }
});

</script>

<template>
  <header>

    <div> </div>

    <div>
      <i class="fa-solid fa-check" style="color: rgb(184, 114, 17)"></i>
      <h1><router-link class="router-link title" to="/">To-Do List</router-link></h1>
    </div>

    <div>
      <router-link class="router-link linked" to="/personal" v-if="usuario">Personal Area</router-link>
      <router-link class="router-link linked" to="/admin" v-if="esAdmin">Admin</router-link>
      <button @click="iniciarSesion" class="btnLogin linked" v-if="!usuario">Iniciar Sesión</button>
      <button @click="cerrarSesion" class="btnLogin linked" v-if="usuario">Cerrar Sesión</button>
    </div>
  
  </header>
</template>