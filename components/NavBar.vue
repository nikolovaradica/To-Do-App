<template>
  <a href="#" @click="toggleMenu" class="bars">
    <i class="fas fa-bars"></i>
  </a>
  <div class="navbar" id="myNavbar">
    <div class="res-flex">
      <div>
        <a href="#" @click="toggleMenu" class="inBars">
          <i class="fas fa-bars"></i>
        </a>
        <div class="content">
          <div>
            <AddTask @add-task="onEmit" />
          </div>
        </div>
      </div>
      <footer>
        <p>Hi, {{ getUserEmail() }}</p>
        <button @click="handleSignOut">Sign out</button>
      </footer>
    </div>
  </div>
</template>

<script>
import AddTask from "@/components/AddTask"
import  { getAuth, signOut } from "firebase/auth"
import router from "@/router"

export default {
  name: "NavBar",
  components: {
    AddTask,
  },
  methods: {
    onEmit(newTask) {
      this.$emit('add-task', newTask)
    },
    toggleMenu() {
      const x = document.getElementById("myNavbar");
      if (x.className === "navbar") {
        x.className += " responsive";
      } else {
        x.className = "navbar";
      }
    },
    handleSignOut() {
      signOut(getAuth())
          .then(() => {
            router.push('/authentication');
          })
    },
    getUserEmail() {
      return getAuth().currentUser.email
    }
  },
  emits:['add-task'],
}
</script>

<style scoped>
  .navbar {
    width: 17vw;
    background-color: white;
    min-height: 100vh;
    padding: 1em;
    color: black;
    position: fixed;
    left: 0;
    top: 0;
  }

  .res-flex{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 98vh;
  }

  button {
    border: 0;
    border-radius: .5rem;
    color: white;
    font-size: .875rem;
    font-weight: 600;
    padding: .75rem 1rem;
    box-shadow: rgba(0, 0, 0, 0.3) 0 4px 12px;
    cursor: pointer;
    background: linear-gradient(to left, #e55d87, rgba(229,93,135,0.62));
  }

  button:hover {
    background: white !important;
    color: #e55d87;
  }

  footer{
    border-top: 2px solid black;
    padding: 1em;
  }

  .bars, .inBars{
    font-size: 2rem;
    cursor: pointer;
    display: none;
  }

  li{
    line-height: 1.6em;
  }

  h4{
    padding-top: 1.3em;
  }

  p{
    word-wrap: break-word;
  }

  @media screen and (max-width: 1200px){
    .navbar{
      width: 24vw;
    }
  }

  @media screen and (max-width: 1000px){
    .navbar{
      display: none;
      position: relative;
    }
    .bars{
      display: block;
      color: white;
      position: absolute;
      top: 0;
      left: 0;
      margin-left: 3vw;
      margin-top: .8em;
    }
    .responsive{
      position: fixed;
      display: block;
      width: 100vw;
      height: 100vh;
      z-index: 1;
    }
    .inBars{
      display: inline-block;
      color: black;
    }
  }

  @media screen and (max-width: 600px){
    .bars{
      margin-top: .4em;
    }
  }
</style>