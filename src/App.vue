<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">Dimagi Chatbot example</h1>
        <p>Access full message history for participants here.</p>
        <MessageList/>
      </div>
    </section>
  </div>
</template>

<script>
import MessageList from "./components/MessageList.vue";

export default {
  name: "app",
  components: {
    MessageList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
