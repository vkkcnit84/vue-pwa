<template>
  <div>
    <message
      v-for="message in msgData"
      :message="message"
      :key="message.id"
      v-on:change-Msg="changeMsg"
    ></message>
  </div>
</template>

<script>
import Message from "./Message.vue";
export default {
  components: { Message },
  props: ["msgData"],
  emits: ["change-data"],
  created() {
    // console.log('hi how',this.msgData)
  },

  methods: {
    changeMsg({ data, type, updateData = null }) {
      this.$emit("change-data", { data, type, updateData });
    },
  },
};
</script>
