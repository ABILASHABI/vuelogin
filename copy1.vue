<template>
       <div class="auth-continer">
           <div class="whitebg content-inner p-3">
               <h2 class="auth-hd text-center">Login</h2>
                <div class="px-4 pb-2 pt-4">
                   <form @submit.prevent="submit">
                     <div class="form-group pb-2" :class="{ 'form-group--error': $v.username.$error }">
                          <input type="text" class="form-control"
                              aria-describedby="emailHelp"
                              placeholder="Username" v-model.trim="$v.username.$model"/>
                      </div>
                      <div class="error" v-if="!$v.username.required">Please enter your username</div>
                      <div class="error" v-if="!$v.username.minLength">Username must have at least 5 letters.</div>
                      <!--<div class="error" v-if="!$v.username.ValidatePhoneOrEmail">Please enter valid username</div>-->
                      <div class="form-group pb-2" :class="{ 'form-group--error': $v.password.$error }">
                          <input type="password" class="form-control"
                              v-model.trim="$v.password.$model"
                              placeholder="Password">
                      </div>
                      <div class="error" v-if="!$v.password.required">Please enter your password</div>
                      <div class="error" v-if="!$v.password.minLength">Password must have at least 4 letters.</div>
                      <button type="submit" class="btn btn-primary
                          d-block w-100">Sign In</button>
                   </form>
                </div>
           </div>
       </div>
</template>

<style>
.auth-continer .form-group__message,
.auth-continer .error {
  font-size: 0.75rem;
  /*line-height: 1;*/
  display: none;
  /*margin-left: 14px;*/
  margin-top: 100px;
  margin-bottom: 15px;
}
.login-cont-view .form-group--error input {
  border: 0px none !important;
  border-bottom: 1px solid #f79483 !important;
}
.auth-continer .form-group--error input,
.auth-continer .form-group--error textarea,
.auth-continer .form-group--error input:focus,
.auth-continer .form-group--error input:hover {
  border: 0px none !important;
  border-bottom: 1px solid #f79483 !important;
}
.auth-continer .form-group--error + .form-group__message,
.auth-continer .form-group--error + .error {
  display: block;
  color: #f57f6c;
}
</style>

<script>
import Vue from 'vue';
import { validationMixin } from "vuelidate";
import { required, minLength, between } from "vuelidate/lib/validators";


export default {
  name: "TestLoginIndex",
  data() {
    return {
      username: null,
      password: null,
      submitStatus: null
    };
  },
  validations: {
    username: {
      required,
      //ValidatePhoneOrEmail,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    submit() {
       this.$v.$touch();
       if (!this.$v.$invalid) {
         console.log("hiiii");
      this.$router.push(`/dashboard?username=${this.username}&password=${this.password}`).catch(() => {});
      }
     
      
    }
  },
};
</script>
