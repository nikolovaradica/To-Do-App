<template>
  <div class="bigContainer">
    <div class="login">
      <Login />
    </div>
    <div class="reg">
      <Register />
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login";
import Register from "@/components/Register";

export default {
  name: "AppAuthentication",
  components: {
    Login,
    Register,
  }
}
</script>

<style>
  body{
    margin: 0;
    background: linear-gradient(to right, #5fc3e4, #e55d87) ;
  }

  .bigContainer, .login, .reg{
    margin: 0;
  }

  .bigContainer{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  @media screen and (max-width: 600px){
    .bigContainer{
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
    .login{
      margin-top: auto;
    }
    .reg{
      margin-bottom: auto;
    }
    body{
      min-height: 100%;
    }
  }

</style>