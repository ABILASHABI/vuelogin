<template>
  <div>
    <main class="box">
      <h2>Login</h2>
      <form>
        <div
          class="form-group inputBox"
          :class="{ 'form-group--error': $v.username.$error }"
        >
          <label for="userName">Username</label>
          <input
            type="text"
            name="userName"
            v-model="$v.username.$model"
            placeholder="type your username"
          />
          <div class="error" v-if="$v.username.$error && !$v.username.required">
            Please enter your username
          </div>
          <div
            class="error"
            v-if="$v.username.$error && !$v.username.minLength"
          >
            Username must have at least 5 letters.
          </div>
        </div>

        <div
          class="form-group inputBox"
          :class="{ 'form-group--error': $v.username.$error }"
        >
          <label for="EmailID">Email ID</label>
          <input
            type="text"
            name="EmailID"
            v-model="$v.EmailID.$model"
            placeholder="type your username"
          />
          <div class="error" v-if="$v.EmailID.$error && !$v.EmailID.required">
            Please enter your EmailID
          </div>
          <div class="error" v-if="$v.EmailID.$error && !$v.EmailID.email">
            please Enter Valid EmailID
          </div>
        </div>

        <div
          class="form-group inputBox"
          :class="{ 'form-group--error': $v.password.$error }"
        >
          <label for="userPassword">Password</label>
          <input
            type="password"
            name="userPassword"
            v-model="$v.password.$model"
            placeholder="type your password"
          />
          <div
            class="error"
            v-if="$v.password.$error && !$v.password.minLength"
          >
            Password must have at least
            {{ $v.password.$params.minLength.min }} letters.
          </div>
          <div
            class="error"
            v-if="$v.password.$error && !$v.password.maxLength"
          >
            Password must have at most
            {{ $v.password.$params.maxLength.max }} letters.
          </div>
        </div>
        <div
          class="form-group inputBox"
          :class="{ 'form-group--error': $v.confirmpassword.$error }"
        >
          <label for="confirmPassword">confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            v-model="$v.confirmpassword.$model"
            placeholder="type your confirm password"
          />
          <div
            class="error"
            v-if="
              $v.confirmpassword.$error && !$v.confirmpassword.sameAsPassword
            "
          >
            password should be identical.
          </div>
        </div>
        <div>
          <button @click="$router.push('/login')">LOGIN</button>
          <input
            type="button"
            class="button"
            value="Submit"
            @click="getSearchRequest()"
            style="float: left; width: 100px"
          />
        </div>
      </form>
    </main>
    <footer></footer>
  </div>
</template>

<script>
//import particlesConfig from "../assets/particles.json";
import Vue from "vue";
import { validationMixin } from "vuelidate";

import {axios} from "axios";
import {
  required,
  minLength,
  email,
  sameAs,
  maxLength,
  between,
} from "vuelidate/lib/validators";
import TheFooter from "@/components/TheFooter";

export default {
  name: "Login",
  data: function () {
    return {
      TheFooter,
      username: "",
      EmailID: "",
      password: "",
      confirmpassword: "",
    };
  },
  validations: {
    username: {
      required,
      //ValidatePhoneOrEmail,
      minLength: minLength(4),
    },
    EmailID: {
      required,
      //ValidatePhoneOrEmail,
      email,
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(32),
    },
    confirmpassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("hiiii");
        this.$router
          .push(
            `/login?username=${this.userName}&userpassword=${this.userPassword}&userconfirmpassword=${this.confirmpassword}&EmailID=${this.EmailID}`
          )
          .catch(() => {});
      }
    },
    getSearchRequest() {
       
       {
        let postJson = {
          username: this.username,
          emailID: this.EmailID,
          password: this.password,
          confirmpassword: this.confirmpassword,
        };
        console.log(postJson)
        axios
          .post(
            "http://localhost:8081/Register/create",
            postJson,
            configDetails
          )
          .then((response) => {
            if (response.data.status_code == "200") {
              console.log("User Create Successfully");
            }
          })
          .catch(function (error) {});
      }
    },
    handlesubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let postJson = {
          username: this.username,
          emailID: this.EmailID,
          password: this.password,
          confirmpassword: this.confirmpassword,
        };
        console.log("PostJsonData", postJson);
        let storeAction = "";
        storeAction = "Register/add";
        let cachescope = this;
        console.log("JSON:", JSON.stringify(postJson));
        console.log(postJson);
        this.$store.dispatch(storeAction, postJson).then(function (res) {
          console.log("User Create Successfully");
        });
        cachescope.$router.push({ path: `/login` });
      }
    },
    submit1() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var dataarr = {
          username: this.username,
          password: this.password,
          rememberme: this.$refs.chkrememberme.checked,
        };
        this.submitStatus = "LOADING";
        let cachescope = this;
        this.$store
          .dispatch("auth/login", dataarr)
          .then(function (res) {
            /*Vue.router.push({
            name: 'home.index',
          });*/
          })
          .catch(function (err) {
            cachescope.submitStatus = "READY";
            cachescope.$toast.open({
              message: "The Username or Password is incorrect",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  height: 100vh;
  margin: 0;
  padding: 0;
}

header {
  display: none;
}

.box {
  background-color: rgba(114, 174, 231, 0.802);
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.8);
  margin: auto auto;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
}

.box h2 {
  margin: 0 0 30px 0;
  padding: 0;
  color: #fff;
  text-align: center;
}

.box .inputBox label {
  color: #fff;
}

.box .inputBox input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-size: 18px;
  letter-spacing: 2px;
  margin-bottom: 30px;
  outline: none;
  padding: 10px 0;
  width: 100%;
}

.box input[type="submit"],
.box button[type="submit"],
a.button {
  font-family: sans-serif;
  background: #03a9f4;
  font-size: 11px;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  padding: 10px 20px;
  letter-spacing: 2px;
  outline: none;
  text-transform: uppercase;
  text-decoration: none;
  margin: 2px 10px 2px 0;
  display: inline-block;
}

.box input[type="submit"]:hover,
.box button[type="submit"]:hover,
a.button:hover {
  opacity: 0.8;
}

#tsparticles {
  position: fixed;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
