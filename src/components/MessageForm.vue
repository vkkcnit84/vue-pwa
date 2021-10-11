<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="userName">User Name</label>
      <input type="text" id="userName" v-model.trim="userName.val" />
      <p v-if="!userName.isValid">Enter the User name</p>
    </div>
    <div class="form-control">
      <label for="message">Message </label>
      <input type="text" id="message" v-model.trim="message.val" />
      <p v-if="!message.isValid">Enter the message</p>
    </div>
    <!-- <p v-if="!formIsValid">Please fix the above errors ans submit the form</p> -->
    <input type="submit" value="Save" />
  </form>
</template>
<script>
//  import BaseButton from './components/UI/BaseButton'
export default {
  emits: ["save-data"],
  data() {
    return {
      taskArray:[],
      userName: {
        val: "",
        isValid: true,
      },
        message: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    
    validateForm() {

      this.formIsValid = true;
      if (this.userName.val == "") {
        this.userName.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.val == "") {
        this.message.isValid = false;
        this.formIsValid = false;
      }

    },
    submitForm() {
      
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        id:Math.random().toString(36).substr(2, 9),
        user: this.userName.val,
        message: this.message.val,
        done:false
      };

      this.userName.val = '';
      this.message.val = '';

      // console.log(formData);
      this.$emit("save-data", formData);
    },
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
