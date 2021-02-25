<template>
  <div class="section">
      <div class="container">
          <div class="card-0">
    <h1>register</h1>


    <form @submit.prevent="Register">
      <div class="field">
        <div class="control">
          <input class="input" type="text" placeholder="Email" v-model="email" />
        </div>
        <div class="control">
          <input class="input" type="password" placeholder="Password" v-model="password" />
        </div>
        
        <div class="control">
        <input type="submit" value="Register" class="button" />
        </div>
      </div>
      </form>
      <p>Have an account? <router-link to="/login">Login</router-link></p>
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(user => {
          alert(user);
        })
        .catch(err => alert(err.message));
    };

    return {
      Register,
      email,
      password,
      name
    };
  },
};
</script>

<style>
.container {
  height: 100vh;
}
</style>
