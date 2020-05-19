<template>
  <div id="login">
    <img id="logo" src="../assets/logo.png" />
    <div id="loginForm">
      <h1>智能监控系统</h1>
      <div class="username-div">
        <label class="iconfont icon-yonghu" for="username-input"></label>
        <input
          type="text"
          id="username-input"
          v-model="username"
          placeholder="用户名"
          autocomplete="off"
        />
      </div>
      <div class="password-div">
        <label class="iconfont icon-mima" for="password-input"></label>
        <input
          type="password"
          id="password-input"
          v-model="password"
          placeholder="密码"
          autocomplete="off"
        />
        <a
          v-bind:class="{'iconfont icon-biyan':isPassword,'iconfont icon-jurassic_openeyes':!isPassword}"
          @click="showPassword"
        ></a>
      </div>
      <div class="loginbtn">
        <input type="button" value="登录" @click="login" />
      </div>
      <router-link to="/password">
        <a>忘记密码</a>
      </router-link>
      <router-link to="/signup">
        <a>没有账号？去注册</a>
      </router-link>
    </div>
  </div>
</template>

<script >
export default {
  name: "login",
  components: {},
  data() {
    return {
      username: "admin",
      password: "",
      message: "",
      isPassword: true
    };
  },
  methods: {
    login: function() {
      // this.$router.push({ path: "/index/admin" });
      if (this.username == "") {
        // this.message = "用户名不能为空！";
        this.$message({
          message: "用户名不能为空！",
          type: "warning",
          duration: 1000
        });
      } else if (this.password == "") {
        // this.message = "密码不能为空";
        this.$message({
          message: "密码不能为空！",
          type: "warning",
          duration: 1000
        });
      } else {
        this.$axios({
          url: this.defined.serviceURL + "/login",
          method: "post",
          data: {
            userName: this.username,
            password: this.password
          }
        })
          .then(res => {
            if (res.data.code == 0) {
              let id = res.data.userId;
              // console.log("登录成功");
              this.$message({
                message: "登录成功！",
                type: "success",
                duration: 1000
              });
              if (res.data.parentId === 0) {
                this.defined.userId = res.data.userId;
                this.defined.sonId = res.data.userId;
              } else {
                this.defined.userId = res.data.parentId;
                this.defined.sonId = res.data.userId;
              }
              this.defined.accessToken = res.data.accessToken;
              this.defined.userName = this.username;
              this.defined.userMail = res.data.mailAddress;
              this.defined.userOnline = true;
              this.$axios({
                url: this.defined.serviceURL + "/getAuth",
                method: "post",
                data: {
                  userId: id
                }
              }).then(res => {
                this.defined.auth = res.data.auth;
                this.$router.push({ path: "/index/" + this.username });
              });
            } else if (res.data.code == 1)
              // console.log("用户名或密码不正确");
              this.$message({
                message: "用户名或密码错误！",
                type: "warning",
                duration: 1000
              });
          })
          .catch(error => {
            this.$message({
              message: "系统错误！",
              type: "error",
              duration: 1000
            });
          });
      }
    },
    showPassword: function() {
      this.isPassword = !this.isPassword;
      document.getElementById("password-input").type = this.isPassword
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
#login {
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
  height: 300px;
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
  cursor: pointer;
}
</style>
