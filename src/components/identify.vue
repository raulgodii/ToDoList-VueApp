<script setup>

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';

let router = useRouter();

function iniciarSesionGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            usuario.value = result.user;
            //router.push({ path: '/personal' })
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

const auth = getAuth();
let usuario = ref(auth.currentUser);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("Loged")
        usuario.value = user;
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

let emailReq = ref(false);
let emailValid = ref(false);
let errorLog = ref(false);
let passReq = ref(false);
let email;
let pass;

function inicioSesionUsuario() {
    if (!email) {
        emailReq.value = true;
    } else if (!validarEmail(email)) {
        emailValid.value = true;
        emailReq.value = false;
    } else {
        emailValid.value = true;
        emailValid.value = false;
    }
    if (!pass) {
        passReq.value = true;
    } else {
        passReq.value = false;
    }
    if (!emailReq.value && !passReq.value && !emailValid.value) {

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                errorLog.value = false;
                const user = userCredential.user;
                console.log('Usuario autenticado:', user);
            })
            .catch((error) => {
                errorLog.value = true;
                console.error('Error al iniciar sesión:', error.message);
            });

    }
}

function validarEmail(email) {
    // Expresión regular para validar direcciones de correo electrónico
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Usamos test() para verificar si el email coincide con la expresión regular
    return regexEmail.test(email);
}

function iniciarSesionGithub() {

    const githubProvider = new GithubAuthProvider();

    signInWithPopup(auth, githubProvider)
        .then((result) => {
            // El usuario ha iniciado sesión correctamente
            errorLog.value = false;
            const user = result.user;
            console.log('Usuario autenticado con GitHub:', user);
        })
        .catch((error) => {
            errorLog.value = true;
            console.error('Error al iniciar sesión con GitHub:', error.message);
        });

}

</script>

<template>
    <div class="main">
        <form class="form">
            <div class="flex-column">
                <label>Email </label>
            </div>
            <div class="inputForm">
                <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                    <g id="Layer_3" data-name="Layer 3">
                        <path
                            d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z">
                        </path>
                    </g>
                </svg>
                <input type="text" class="input" placeholder="Enter your Email" v-model="email">
            </div>
            <div class="flex-column" v-if="emailReq">
                <label style="color: red;">Email required</label>
            </div>
            <div class="flex-column" v-if="emailValid">
                <label style="color: red;">Email not valid</label>
            </div>
            <br>

            <div class="flex-column">
                <label>Password </label>
            </div>
            <div class="inputForm">
                <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0">
                    </path>
                    <path
                        d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0">
                    </path>
                </svg>
                <input type="password" class="input" placeholder="Enter your Password" v-model="pass">
                <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z">
                    </path>
                </svg>
            </div>
            <div class="flex-column" v-if="passReq">
                <label style="color: red;">Password required</label>
            </div>
            <div class="flex-column" v-if="errorLog">
                <label style="color: red;">Invalid username or password</label>
            </div>

            <div class="flex-row">
                <div>
                    <input type="checkbox">
                    <label>Remember me </label>
                </div>
                <span class="span">Forgot password?</span>
            </div>
            <button class="button-submit" @click.prevent="inicioSesionUsuario()">Sign In</button>
            <p class="p">Don't have an account? <span class="span">
                    <RouterLink to="signUp">Sign Up</RouterLink>
                </span>

            </p>
            <p class="p line">Or With</p>

            <div class="flex-row">
                <button @click.prevent="iniciarSesionGoogle" class="btn google">
                    <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                        style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <path style="fill:#FBBB00;" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z"></path>
                        <path style="fill:#518EF8;" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"></path>
                        <path style="fill:#28B446;" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"></path>
                        <path style="fill:#F14336;" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
	C318.115,0,375.068,22.126,419.404,58.936z"></path>

                    </svg>

                    Google

                </button><button class="btn apple" @click.prevent="iniciarSesionGithub()">
                <svg width="20px" x="0px" y="0px" viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg> 

                    GitHub

                </button>
            </div>

        </form>
    </div>
</template>