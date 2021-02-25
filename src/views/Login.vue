<template>
  <div class="section">
    <div class="container">

      <div class="card-0">
        <h3>Login</h3>
        <form @submit.prevent="Login">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Email" v-model="email" />
            </div>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </div>

            <div class="control">
              <input type="submit" value="Login" class="button" />
            </div>
          </div>
        </form>
        <p>Need an account? <router-link to="/register"> Register Here</router-link></p>
      </div>


    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import firebase from "firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const state = reactive({
      username: '',
      messages: []
    })

    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((data) => {
        console.log(data, email.value + "is successfully logged in")
        })
        .catch((err) => alert(err.message));
    };

    return {
      Login,
      email,
      password,
      name,
      state
    };
  },
};
</script>

<style>
p {
  color: #fff;
  margin-bottom: 1rem;
}
.container {
  height: 100vh;
  margin: 0 auto;
}
form {
  margin-bottom: 2rem;
}
.field {
  display: flex;
  flex-direction: column;
}
.control {
  margin-bottom: 1rem;
}
.card-0 {
  margin: 0 auto;
  max-width: 350px;
}
</style>
