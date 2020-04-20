<template>
  <div id="mike" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭" @change="changeValue"></el-switch>
    <div class="message">
      <img src="../../assets/mike.jpg" />
      <div class="messageText">
        <h3>麦克风开启时：</h3>
        <p>麦克风开启时，摄像头的实时预览画面和历史回放将会录入声音</p>
        <h3>麦克风关闭时：</h3>
        <p>摄像头的录入的视频只会有画面而没有声音</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mike",
  data() {
    return {
      value: true
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/camera/video/sound/status",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            this.value = res.data.data.enable == 1 ? true : false;
          } else {
            console.log(res.data.msg);
            this.value = false;
          }
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    changeValue: function() {
      var value1 = this.value ? 1 : 0;
      if (this.defined.auth.defenceConfig === 0) {
        console.log("没有配置权限!");
        this.value = !this.value;
        return;
      }
      this.$axios({
        url: "https://open.ys7.com/api/lapp/camera/video/sound/set",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          enable: value1
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.code != "200") {
            this.value = !this.value;
            console.log(res.data.msg);
          } else {
            console.log("更改成功！");
          }
        })
        .catch(error => {
          console.log("err+++++", error.data);
          this.value = !this.value;
        });
    }
  },
  mounted: function() {
    this.showMessage();
  }
};
</script>
<style scoped>
.message {
  width: 100%;
  height: 200px;
  text-align: left;
}
.message > img {
  width: 40%;
  height: 100%;
}
.message > div {
  box-sizing: border-box;
  float: right;
  padding: 10px;
  height: 100%;
  width: 50%;
}
</style>
