<template>
<div class="home">
    <div class="section">
      <div class="container" v-if="state.username === '' ||  state.username === null">
        <form @submit.prevent="addUsername" class="card-0">
          <h3>Add Username to Begin Chat</h3>
          <input class="input" type="text" v-model="name" placeholder="Add Username" />
          <input class="button" type="submit" value="addUsername" />
        </form>
      </div>

      <div class="container" v-else>
        <div>
          <div class="card-0">
            <h3> Welcome, {{ state.username }}</h3>
            <section class="chat">
              <div v-for="message in state.messages" :key="message.key">
                <div class="username">{{ message.username }}</div>
                <div class="content">{{ message.content }}</div>
              </div>
            </section>

            <form @submit.prevent="sendMessage">
              <input class="input" v-model="inputMessage" type="text" placeholder="Write" />
              <input class="button is-link" type="submit" value="Send"  />
            </form>
          </div>

      </div>
        <button class="button is-link logout" @click="Logout">Logout</button>
      </div>
  </div>
  </div>
</template>

<script>
// :class="(message.name == state.username ? 'message current-user' : 'message')"
import { onBeforeMount, ref, reactive, onMounted } from "vue";
import firebase from "firebase";
import db from '../main.js'

export default {
  setup() {
    const name = ref('');
    const inputMessage = ref('')

    const state = reactive({
      username: '',
      messages: []
    })

    onBeforeMount(() => {
      const user = firebase.auth().currentUser
      if (user) {
        name.value = user.email.split('@')[0]
      }
    });

    const addUsername = () => {
      if (name.value != '' || name.value != null) {
        state.username = name.value
        name.value = ''
      }
    }

    const sendMessage = () => {
      const messagesRef = db.database().ref('messages')

      if (inputMessage.value === '' || inputMessage.value === null) {
        return 
      }

      const message = {
        username: state.username,
        content: inputMessage.value 
      }

      messagesRef.push(message)
      inputMessage.value = ''
    }

    onMounted(() => {
      const messagesRef = db.database().ref('messages')

      messagesRef.on('value', snapshot => {
        const data = snapshot.val()
        let messages = []

        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          })
        })
        state.messages = messages 
      })
    })

    const Logout = () => {
      firebase.auth()
      .signOut()
      .then(() => state.username, console.log('Signed Out'))
      .catch(err => alert(err.message))
    }

    return {
      name,
      Logout,
      state,
      addUsername,
      inputMessage,
      sendMessage
    };
  },
};
</script>
