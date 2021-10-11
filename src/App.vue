<template>
  <Header />
  <base-card>
    <MessageForm @save-data="savaData" />
  </base-card>
 
  <MessageList :msgData="messages" v-on:change-data="changeMsgData" />
</template>

<script>
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";
import BaseCard from "./components/UI/BaseCard";
import Header from "./components/UI/Header";
import axios from "axios";

// import { DataStore, Predicates } from "@aws-amplify/datastore";
// import { DataStore } from "@aws-amplify/datastore";
import { Chatty } from "./models";
import { DataStore, Predicates } from "@aws-amplify/datastore";

const BASEURL = "http://localhost:3000/todos";

export default {
  name: "App",
  components: {
    MessageForm,
    BaseCard,
    Header,
    MessageList,
  },
  data() {
    return {
      messagesList: [],
      subscription: "undefined",
      user: {},
      messages: [],
    };
  },
  async created() {
    // this.subscription = DataStore.observe(Chatty).subscribe((msg) => {
    //   console.log("msg model:", msg.model, msg.opType, msg.element);
    //   // this.loadMessages();
    // });
    this.messages = await DataStore.query(Chatty, Predicates.ALL);
    this.messagesList = this.messages;
   
    try {
      const res = await axios.get(BASEURL);
      this.messagesList = res.data;
    } catch (error) {
      console.log(error);
    }
   
  },

  methods: {

    async savaData(data) {
      // const res = await axios.post(BASEURL, data);
      this.messages.push(data);
       console.log('save data:  ',data);
      await DataStore.save(
        new Chatty({
          user: data.user,
          message: data.message,
          createdAt: new Date().toISOString(),
        })
      );
      this.email = "";
    },

  async  changeMsgData({data,type,updateData=null}) {

   
  console.log('todelete data ',updateData);

      if(type == 'delete'){
        this.deleteMsg(data.id)
      } else
      {
         const original = await DataStore.query(Chatty, data.id);
          console.log('original data ',original);
          await DataStore.save(
            Chatty.copyOf(original, updated => {
              updated.user = updateData.user;
               updated.message = updateData.message;
            })
        );
        this.messages = this.messages.map( p => p.id === data.id ? { ...p, user: updateData.user,message: updateData.message } : p );
      }

    },

    async deleteMsg(msgId){
         
         
          const todelete = await DataStore.query(Chatty,msgId );
           DataStore.delete(todelete);
           console.log('todelete id ',todelete);
          this.messages = this.messages.filter((msgItem) => {
            return msgItem.id != msgId;
          });
    }

  },
  computed: {
    msgListData() {
      console.log("computed test ");
      return this.messagesList;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
