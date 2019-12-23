<template>
  <div id="header">
    <router-link to="/"> <a @click="logout"
         class='iconfont icon-zhuxiaologout10'>注销</a>
    </router-link>
    <a @click="help"
       class="iconfont icon-bangzhu">帮助</a>
    <a @click='user'
       class="iconfont icon-user">{{username}}</a>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      username: 'admin'
    }
  },
  methods: {
    logout: function () {
      console.log("1312313");
    },
    help: function () {

    },
    user: function () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/icon/iconfont.css";
#header {
  top: 0;
  height: 35px;
  width: 100%;
  position: fixed;
  background-color: #000000;
  opacity: 0.5;
}
#header a {
  float: right;
  line-height: 35px;
  font-size: 16px;
  color: #ffffff;
  margin-right: 50px;
  cursor: pointer;
}
</style>
