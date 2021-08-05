<template>
  <div>
    <!--<Particles id="tsparticles" :options="particlesConfig" />-->

    <main class="box">
      <h2>Register</h2>
      <form>
        <div
          class="inputBox" :class="{ 'form-group--error': userName.$error }"
          
        >
          
          <label for="userName">Username</label>
          <input
            type="text"
            name="userName"
            v-model.trim="userName"
            placeholder="type your username"
            required
          />
        </div>
        <div class="inputBox">
          <label for="userPassword">Password</label>
          <input
            type="password"
            name="userPassword"
            v-model="userPassword"
            placeholder="type your password"
            required
          />
        </div>
        <div class="inputBox">
          <label for="userConfirmPassword">Confirm Password</label>
          <input
            type="password"
            name="userPassword"
            v-model="userconfirmPassword"
            placeholder="confirm your password"
            required
          />
        </div>
        <div class="inputBox">
          <label for="userEmailID">Email ID</label>
          <input
            type="EmailID"
            name="userEmailID"
            v-model="userEmailID"
            placeholder="Enter Your EmailID"
            required
          />
        </div>
        <input
          type="button"
          value="Submit"
          @click="submit"
          style="float: left; width: 100px"
        />
        <router-link class="button" style="float: left" to="/login"
          >Login</router-link>
                  <router-link class="button" style="float: left" to="/login/form"
          >form</router-link>
      </form>
    </main>
    <footer></footer>
  </div>
</template>

<script>
//import particlesConfig from "../assets/particles.json";

import TheFooter from "@/components/TheFooter";
import $ from "jquery";
import {
  required,
  minLength,
  maxLength,
  email,
  alpha,
  numeric,
  alphaNum,
  helpers,
  regex,
} from "vuelidate/lib/validators";
export default {
  name: "Register",
  components: {
    TheFooter,
  },
  data: function () {
    return {
      userName:"",
      userPassword:"",
      userconfirmPassword:"",
      userEmailID:"",
    };
  },

  validations: {
    userName: {
      required,
      maxLength: maxLength(20)
    },
  },

  methods: {
    submit() {
      console.log("hiiii");
      this.$router
        .push(
          `/login?username=${this.userName}&userpassword=${this.userPassword}&userconfirmpassword=${this.confirmpassword}&EmailID=${this.userEmailID}`
        )
        .catch(() => {});
      message: "register succesfully";
    },
    handleSubmit() {
      console.log("check2", this.partnerId);
      if (this.isFormValid()) {
        //  this.isLoading = true;

        let postJson = {
          username: this.userName,
          password: this.userPassword,
          confirmpassword: this.userconfirmPassword,
          emailID: this.emailID,
        };
        let part;
        console.log("check", this.partnerId);
        //let storeAction = "";
        let cachescope = this;
        postJson.id = this.partnerId;
        //storeAction = "merchant/completeprofile";
        let surl = `${process.env.VUE_APP_API_LOCATION}create`;
        //let slisturl = "/partner/?partnerId=" + partnerId;

        this.myDebug("JSON:", JSON.stringify(postJson));
        let formobj = new FormData();
        formobj.append("json", JSON.stringify(postJson));
        axios
          .post(surl, formobj, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (res) {
            cachescope.isLoading = false;
            cachescope.$toast.open({
              message: "Success",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top",
            });
            cachescope.$router.push({ path: `/register` });
          });

        this.$store
          .dispatch(surl, formobj)
          .then(function (res) {
            cachescope.$toast.open({
              message: "customer updated successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top",
            });
            // cachescope.isLoading = false;
            cachescope.$router.push({ path: `/register` });
            //cacheScope.$router.push({ path: slisturl});
          })
          .catch(function (err) {
            cachescope.$toast.open({
              message: "Merchant updation failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: "top",
            });

            // cachescope.isLoading = false;
            cachescope.$router.push({ path: `/register` });
          });
      }
    },
    handleCancel() {
      this.$router.push({ path: `/register` });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
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
  background-color: rgba(0, 0, 0, 0.8);
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