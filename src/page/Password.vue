<template>
  <div id="Password">
    <img id="logo" src="../assets/logo.png" />
    <div id="loginForm">
      <h1>智能监控系统</h1>
      <div class="username-div">
        <label class="iconfont icon-yonghu" for="username-input"></label>
        <input type="text" id="username-input" v-model="username" placeholder="用户名" />
      </div>
      <div class="password-div">
        <label class="iconfont icon-mima" for="password-input1"></label>
        <input type="password" id="password-input1" v-model="password1" placeholder="密码" />
        <a
          v-bind:class="{'iconfont icon-biyan':isPassword1,'iconfont icon-jurassic_openeyes':!isPassword1}"
          @click="showPassword1"
        ></a>
      </div>
      <div class="password-div">
        <label class="iconfont icon-mima" for="password-input2"></label>
        <input type="password" id="password-input2" v-model="password2" placeholder="再次输入密码" />
        <a
          v-bind:class="{'iconfont icon-biyan':isPassword2,'iconfont icon-jurassic_openeyes':!isPassword2}"
          @click="showPassword2"
        ></a>
      </div>
      <div class="username-div">
        <label class="iconfont icon-yanzhengma54" for="captcha-input"></label>
        <input type="text" id="captcha-input" v-model="captcha" placeholder="验证码" />
      </div>
      <div class="loginbtn">
        <input type="button" value="重置密码" @click="login" />
      </div>

      <router-link to="/">
        <a>知道密码？去登录</a>
      </router-link>
    </div>
  </div>
</template>

<script >
export default {
  name: "password",
  components: {},
  data() {
    return {
      username: "",
      password1: "",
      password2: "",
      captcha: "",
      message: "",
      isPassword1: true,
      isPassword2: true
    };
  },
  methods: {
    login: function() {
      if (this.username == "") {
        this.message = "用户名不能为空！";
      } else if (this.password1 == "") {
        this.message = "密码不能为空";
      } else if (this.captcha == "") {
        this.message = "验证码不能为空";
      } else if (this.password1 !== this.password2) {
        this.message = "两次输入密码不一致";
      } else {
        this.$axios({
          url: this.defined.serviceURL + "/forgetpswd",
          method: "post",
          data: {
            authCode: this.captcha,
            userName: this.username,
            password: this.password1,
            passwordAgain: this.password2
          }
        })
          .then(res => {
            if (res.data.code == 0) {
              console.log("修改成功");
              this.$router.push({ path: "/" });
            } else if (res.data.code == 1) console.log("修改失败");
          })
          .catch(error => {
            console.log("err+++++", error);
          });
      }
    },
    showPassword1: function() {
      this.isPassword1 = !this.isPassword1;
      document.getElementById("password-input1").type = this.isPassword1
        ? "password"
        : "text";
    },
    showPassword2: function() {
      this.isPassword2 = !this.isPassword2;
      document.getElementById("password-input2").type = this.isPassword2
        ? "password"
        : "text";
    }
  }
};
</script>

<style scoped>
@import "../assets/icon/iconfont.css";
* {
  margin: 0;
  padding: 0;
}
#logo {
  display: block;
  margin: 0px auto;
}
#Password {
  background: url("../assets/123.jpg") center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: fixed;
  background-repeat: no-repeat;
}
#loginForm {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 400px;
  width: 400px;
  margin: 0px auto;
  box-shadow: 0 0 5px black;
  padding-top: 20px;
}
#loginForm > h1 {
  color: #ffffff;
  font-size: 20px;
  text-align: center;
}
#loginForm > div {
  width: 350px;
  height: 30px;
  margin: 30px auto;
  position: relative;
}
#loginForm > div > input {
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  color: #ffffff;
  width: 318px;
  height: 30px;
  float: left;
  border: 1px solid #ffffff;
  border-left: 0;
}
::-webkit-input-placeholder {
  color: #ffffff;
}
:-moz-placeholder {
  color: #ffffff;
}
::-moz-placeholder {
  color: #ffffff;
}
:-ms-input-placeholder {
  color: #ffffff;
}
#loginForm > div > input[type="button"] {
  border-left: 1px solid #ffffff;
  width: 348px;
  cursor: pointer;
}
#loginForm > div > label {
  color: #ffffff;
  display: block;
  text-align: center;
  line-height: 30.4px;
  width: 30px;
  float: left;
  border: 1px solid #ffffff;
  border-right: 0;
}
#loginForm > div > a {
  color: #ffffff;
  position: absolute;
  line-height: 30px;
  right: 15px;
  cursor: pointer;
}
#loginForm > a {
  color: #ffffff;
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
}
</style>
