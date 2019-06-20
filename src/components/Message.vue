<template>
  <div
    :class="[msg.source == 'nurse' ? 'nurse-msg' : '', 
             msg.source == 'user' ? 'user-msg' : '', 
             msg.source == 'system' ? 'system-msg' : '', 
             'box']"
  >
    <article class="media">
      <!-- Using these media blocks as spacers. I know it's not ideal -->
      <div class="media-left">
        <figure class="image is-64x64"></figure>
      </div>
      <div
        :class="[msg.source == 'user' ? 'has-text-left' : 'has-text-right', 
             'media-content']"
      >
        <div class="content">
          <div>
            <strong>{{msg.source}}</strong>
            |
            <em>{{msg.state}}</em>
            |&nbsp;
            <strong>{{msg.server_time | formatDate}}</strong>
            <br>
            <div class="has-text-left pre">{{msg.text}}</div>
          </div>
        </div>
      </div>
      <div v-if="msg.source != 'user'" class="media-right">
        <figure class="image is-64x64"></figure>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    msg: Object
  }
};
</script>

<style lang="scss" scoped>
.nurse-msg,
.system-msg {
  margin-left: 10%;
}
.nurse-msg {
  background-color: rgb(225, 246, 203);
}
.system-msg {
  background-color: rgb(242, 243, 247);
}
.user-msg {
  background-color: rgb(225, 241, 255);
  margin-right: 10%;
}
.pre {
  white-space: pre-wrap;
}
</style>
