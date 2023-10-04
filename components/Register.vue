<template>
  <div class="registerDiv">
    <h2>Need an account?</h2>
    <h4>Register here!</h4>
    <form @submit.prevent="Register">
      <input type="text" placeholder="Email" v-model="email" class="em" >
      <input type="password" placeholder="Password" v-model="password" class="pass">
      <p v-if="errMsg">{{ errMsg }}</p>
      <input type="submit" value="Register">
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { db } from "@/main";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "RegisterUser",
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errMsg = ref()

    const Register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((newUser) => {
          setDoc(doc(db, 'users', newUser.user.uid), {
          })
        })
            .then(() => router.push('/'))
            .catch(error => {
              switch (error.code) {
                case 'auth/invalid-email':
                  errMsg.value = 'Invalid email';
                  break;
                case 'auth/email-already-in-use':
                  errMsg.value = 'Email already in use';
                  break;
                case 'auth/weak-password':
                  errMsg.value = 'Password is too weak';
                  break;
                default:
                  errMsg.value = 'An error occurred';
                  break;
              }
            })
    }

    return{
      Register,
      email,
      password,
      errMsg,
    }
  }
}
</script>

<style scoped>
  .registerDiv{
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
    color: rgb(79,150,176);
    font-weight: bold;
    font-size: 1.45em;
  }

  h4{
    color: rgb(79,150,176);
    font-weight: bold;
    font-size: 1.15em;
    margin-top: -1em;
    margin-bottom: 0;
  }

  p{
    color: rgb(79,150,176);
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
    background: linear-gradient(to left, #5fc3e4, rgba(95,195,228,0.7));
    border: 0;
    padding: 1em 2.5em;
    font-size: 0.8em;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
  }

  @media screen and (max-width: 920px){
    .registerDiv{
      min-width: 40vw;
    }
    .em, .pass{
      width: 30vw;
    }
  }

  @media screen and (max-width: 600px){
    .registerDiv{
      min-width: 90vw;
      margin-top: 1em;
      margin-bottom: 1em;
    }
    .em, .pass{
      width: 70vw;
    }
  }
</style>