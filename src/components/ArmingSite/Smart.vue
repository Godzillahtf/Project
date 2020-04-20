<template>
  <div id="smart" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭" @change="changeValue"></el-switch>
    <div class="message">
      <img src="../../assets/smart.jpg" />
      <div class="messageText">
        <h3>智能检测开启时：</h3>
        <p>设备开启智能检测，摄像机会进入布防状态</p>
        <p>
          注:智能检测开关依赖于布撤防状态,
          只有布撤防接口开启时,智能检测开关状态才会生效:
          开启布撤防状态后,智能检测接口均为关闭状态时为移动侦测
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "smart",
  data() {
    return {
      value: true
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url:
          "https://open.ys7.com/api/lapp/device/intelligence/detection/switch/status",
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
        url:
          "https://open.ys7.com/api/lapp/device/intelligence/detection/switch/set",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          enable: value1
        }
      })
        .then(res => {
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
  width: 50%;
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
