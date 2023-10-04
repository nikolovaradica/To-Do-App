<template>
  <header>
    <div>
      <h1>{{ title }}</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
  props: {
    title: String
  }
}
</script>

<style scoped>
  div {
    display: flex;
    justify-content: center;
  }

  h1 {
    letter-spacing: .3em;
    color: white;
    font-family: 'DM Serif Display', serif;
    font-size: 2.5em;
  }

  @media screen and (max-width: 1000px){
    h1{
      font-size: 2em;
    }
  }

  @media screen and (max-width: 600px){
    h1{
      font-size: 1.5em;
      margin-left: 8vw;
    }
  }
</style>