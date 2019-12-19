<template>
  <div id="login">
    <img id="logo"
         src="../assets/logo.png">
    <div id="message">{{message}}</div>
    <div id="loginForm">
      <h1>智能监控系统</h1>
      <div class="username-div">
        <label class="iconfont icon-xingmingyonghumingnicheng"
               for="username-input"></label>
        <input type="text"
               id="username-input"
               v-model="username"
               placeholder="用户名">
      </div>
      <div class="password-div">
        <label class="iconfont icon-mima"
               for="password-input"></label>
        <input type="password"
               id="password-input"
               v-model="password"
               placeholder="密码">
        <a v-bind:class="{'iconfont icon-yanjing':isPassword,'iconfont icon-yanjing1':!isPassword}"
           @click="showPassword"></a>
      </div>
      <div class="loginbtn">
        <input type="button"
               value="登录"
               @click="login">
      </div>

      <router-link to=""><a>忘记密码</a></router-link>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'login',
  components: {
  },
  data () {
    return {
      username: '',
      password: '',
      message: '',
      isPassword: true
    }
  },
  methods: {
    login: function () {
      if (this.username == '') {
        this.message = '用户名不能为空！';
      }
      else if (this.password == '') {
        this.message = '密码不能为空';
      }
      else this.message = '';
      if (this.message !== '')
        document.getElementById("message").style.display = "block";
    },
    showPassword: function () {
      this.isPassword = !this.isPassword;
      document.getElementById('password-input').type = (this.isPassword ? "password" : "text");
    }
  }
}
</script>

<style>
@import "../assets/icon/iconfont.css";
* {
  margin: 0;
  padding: 0;
}
#logo {
  display: block;
  margin: 0px auto;
}
#login {
  background: url("../assets/123.jpg") center;
  width: 100%;
  height: 100%;
  position: fixed;
}
#loginForm {
  border-radius: 5px;
  background-color: black;
  height: 280px;
  width: 400px;
  margin: 0px auto;
  box-shadow: 0 0 5px black;
  padding-top: 20px;
  opacity: 0.5;
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
  background-color: black;
  outline: none;
  color: #ffffff;
  width: 318px;
  height: 30px;
  float: left;
  border: 1px solid #ffffff;
  border-left: 0;
}
#loginForm > div > input[type="button"] {
  border-left: 1px solid #ffffff;
  width: 348px;
}
#loginForm > div > label {
  color: #ffffff;
  display: block;
  text-align: center;
  line-height: 30px;
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
}
#loginForm > a {
  color: #ffffff;
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
}
#message {
  background-color: black;
  position: fixed;
  height: 50px;
  font-size: 30px;
  line-height: 50px;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  color: #ffffff;
  box-shadow: 0 0 5px black;
  opacity: 0.7;
  text-shadow: 0 0 5px #ffffff;
  display: none;
}
</style>
