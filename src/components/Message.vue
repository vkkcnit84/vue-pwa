<template>
  <base-card>
    <div class="">
      <div class="content" v-show="!isEditing">
        <div class="header">
          {{ message.user }}
        </div>
        <div class="meta">
          {{ message.message }}
        </div>

        <div class="extra content">
          <span class="right floated trash icon" v-on:click="change('delete')">
            <i class="trash icon"></i>
          </span>
        </div>

        <div class="extra content">
          <span class="right floated edit icon" v-on:click="change('update')">
            <i class="edit icon"></i>
          </span>
        </div>
      </div>
      <div class="content" v-show="isEditing">
        <div class="header">
          <label>UserName</label>
          <input type="text" v-model="username" />
        </div>
        <br />
        <div class="meta">
          <label>Message</label>
          <input type="text" v-model="msg" />
          <input type="hidden" v-model="id" />
        </div>
        <br />
        <button @click="updateMsg">Save</button>
      </div>
    </div>
  </base-card>
</template>

<script type="text/javascript">
import BaseCard from "./UI/BaseCard.vue";
export default {
  components: { BaseCard },

  props: ["message"],
  emits: ["change-Msg"],
  data() {
    return {
      messages: this.message,
      isEditing: false,
      username: this.message.user,
      msg: this.message.message,
    };
  },
  methods: {
    updateMsg() {
      const obj = {
        user: this.username,
        message: this.msg,
      };
      this.change("update", obj);
      this.isEditing = false;
    },

    hideForm() {
      this.isEditing = false;
    },
    change(action, updateData = null) {
      console.log(updateData, action);
      this.isEditing = action == "update" ? true : false;
      this.$emit("change-Msg", {
        data: this.message,
        type: action,
        updateData: updateData,
      });
    },
  },
};
</script>
