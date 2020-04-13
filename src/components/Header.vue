<template>
  <div id="header">
    <img src="../assets/logo.png" />
    <router-link to="/">
      <a @click="logout" class="iconfont icon-zhuxiaologout10">注销</a>
    </router-link>
    <a @click="help" class="iconfont icon-bangzhu">帮助</a>
    <a @click="user" class="iconfont icon-yonghu">{{username}}</a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      username: "admin"
    };
  },
  methods: {
    logout: function() {
      console.log("1312313");
    },
    help: function() {},
    user: function() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/icon/iconfont.css";
#header {
  top: 0;
  height: 50px;
  width: 100%;
  position: relative;
  background-color: rgb(47, 50, 62);
}
#header a {
  float: right;
  width: 100px;
  line-height: 50px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
}
#header a:hover {
  background-color: #ffffff;
  color: rgb(104, 104, 104);
}
#header > img {
  height: 50px;
  width: 150px;
  padding-left: 80px;
}
</style>
