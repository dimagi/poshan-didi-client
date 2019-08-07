<template>
  <!-- TODO: Add support for pagination so this doesn't blow up when we have hundreds of messages -->
  <!-- https://buefy.org/documentation/pagination/ or perhaps should build on https://buefy.org/documentation/table -->
  <section>
    <p class="content">
      <b>Current Chat ID:</b>
      {{ chatID }}
    </p>
    <b-field grouped>
      <b-field label="Enter TelegramID" horizontal expanded>
        <b-autocomplete
          rounded
          v-model="typedChatID"
          :open-on-focus="true"
          :data="filteredDataObj"
          :loading="isFetching"
          field="id"
          placeholder="e.g., 8945288"
          icon="magnify"
          @select="option => selected_user = option"
        >
          <template slot="empty">No results found</template>
          <template slot-scope="props">
            <div>
              <div
                class="has-text-weight-bold"
              >{{props.option.first_name}} {{props.option.last_name}}</div>
              <small>{{props.option.id}}</small>
            </div>
          </template>
        </b-autocomplete>
      </b-field>
      <b-field>
        <b-button icon-left="sync" icon-pack="fa" @click="reload"></b-button>
      </b-field>
      <b-field>
        <b-switch v-model="orderToggle">{{orderToggle ? 'Oldest first' : 'Newest first'}}</b-switch>
      </b-field>
    </b-field>

    <section v-if="userMessages.length">
      <Message v-for="message in orderedMessages" v-bind:key="message.id" :msg="message" />
    </section>
    <div class="box no-messages" v-else>No messages, please select another user.</div>
  </section>
</template>

<script>
import axios from "axios";
import Message from "./Message";

export default {
  name: "MessageList",
  data() {
    return {
      data: [],
      typedChatID: "",
      isFetching: false,
      selected_user: null,
      orderToggle: false
    };
  },
  methods: {
    reload() {
      this.$asyncComputed.userMessages.update();
      // TODO: add reloading of users as well?
    }
  },
  computed: {
    filteredDataObj() {
      return this.data.filter(option => {
        return (
          option.id
            .toString()
            .toLowerCase()
            .indexOf(this.typedChatID.toLowerCase()) >= 0 ||
          option.first_name
            .toString()
            .toLowerCase()
            .indexOf(this.typedChatID.toLowerCase()) >= 0
        );
      });
    },
    chatID() {
      if (this.selected_user != null) {
        return this.selected_user.id;
      } else {
        return "";
      }
    },
    orderedMessages() {
      if (this.userMessages == null) {
        return [];
      }
      return this.userMessages.slice(0).sort((a, b) => {
        let order = this.orderToggle ? -1 : 1;
        return a.id < b.id ? order : -order;
      });
    }
  },
  asyncComputed: {
    userMessages: {
      get() {
        if (this.chatID != "") {
          return axios
            .get(
              "https://poshan-didi.commcarehq.org/api/v1/messages/" +
                this.chatID
            )
            .then(response => response.data);
        }
        return [];
      },
      default() {
        return [];
      }
    }
  },
  mounted() {
    this.isFetching = true;
    axios
      .get("https://poshan-didi.commcarehq.org/api/v1/users")
      .then(response => {
        this.data = response.data;
        this.isFetching = false;
      });
  },
  components: {
    Message
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.no-messages {
  background-color: #fff5f7;
  color: #cd0930;
}
</style>
