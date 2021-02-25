<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
  <div id="app">
  <router-view />
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import firebase from 'firebase'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/login')
        } else if (route.path == '/login' || route.path == '/register') {
          router.replace('/')
        }
      })
    })
  }
}
</script>

<style lang="scss">
body {
  background: #1b1b1b;
  // background: #2c3e50;
  color: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
  height: 100vh;
}

#nav {
  font-size: 14px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-weight: 700;
  color: #FFF;
  text-shadow: 0 0 10px white;
  margin-bottom: 4rem;
}

a {
  color: inherit;
}
a:hover {
  color: cornflowerblue;
}

span {
  margin-left: 1rem;
}
.container {
  height: 100vh;
  margin: 0 auto;
}

input {
  background-color: cornflowerblue;
}

h3 {
  margin: 40px 0 0;
  font-weight: 700;
  font-size: 22px;
  color: #fff;
  text-shadow: 0 0 10px white;
  margin-bottom: 4rem;
}
</style>
