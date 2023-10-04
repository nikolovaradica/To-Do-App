<template>
  <div class="loginDiv">
    <h2>Log in here!</h2>
    <form @submit.prevent="Login">
      <input type="text" placeholder="Email" v-model="email" class="em">
      <input type="password" placeholder="Password" v-model="password" class="pass" >
      <p v-if="errMsg">{{ errMsg }}</p>
      <input type="submit" value="Login">
    </form>
  </div>

</template>

<script>
import { ref } from "vue";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router'

export default {
  name: "LogIn",
  setup: function () {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errMsg = ref()

    const Login = () => {
      signInWithEmailAndPassword(getAuth(), email.value, password.value)
          .then(() => {
            router.push('/')
          })
          .catch(error => {
            switch (error.code){
              case 'auth/invalid-email':
                errMsg.value = 'Invalid email';
                break;
              case 'auth/user-not-found':
                errMsg.value = 'No account with that email was found';
                break;
              case 'auth/wrong-password':
                errMsg.value = 'Incorrect password';
                break;
              default:
                errMsg.value = 'Email or password was incorrect';
                break;
            }
          });
    }

    return {
      Login,
      email,
      password,
      errMsg
    }
  }
}
</script>

<style scoped>
  .loginDiv{
    background-color: #FFFFFF;
    width: 26vw;
    height: 25em;
    border-radius: 1.5em;
    box-shadow: 0 11px 35px 2px rgba(0, 0, 0, 0.14);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  h2{
    color: #e55d87;
    font-weight: bold;
    font-size: 1.45em;
  }

  p{
    color: #e55d87;
    margin-top: -1em;
  }

  .em, .pass{
    width: 20vw;
    color: rgb(38, 50, 56);
    font-weight: 700;
    font-size: 0.88em;
    letter-spacing: 0.06em;
    background: rgba(136, 126, 126, 0.15);
    padding: 0.6em 1.2em;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: .13em solid rgba(0, 0, 0, 0.02);
    text-align: center;
    margin-bottom: 1.7em;
  }

  form{
    padding-top: 3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .em:focus, .pass:focus {
    border: .13em solid rgba(0, 0, 0, 0.18) !important;
  }

  input[type="submit"]{
    cursor: pointer;
    border-radius: 5em;
    color: #fff;
    background: linear-gradient(to left, #e55d87, rgba(229,93,135,0.62));
    border: 0;
    padding: 1em 2.5em;
    font-size: 0.8em;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
  }

  @media screen and (max-width: 920px){
    .loginDiv{
      min-width:40vw;
    }
    .em, .pass{
      width: 30vw;
    }
  }

  @media screen and (max-width: 600px){
    .loginDiv{
      min-width: 90vw;
      margin-top: 1em;
    }
    .em, .pass{
      width: 70vw;
    }
  }
</style>