<template>
  <div id="passage">
    <el-form label-position="left" label-width="150px" size="mini" :model="formLabelAlign">
      <el-form-item label="设备序列号">
        <el-input v-model="formLabelAlign.deviceSerial" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="IPC序列号">
        <el-input v-model="formLabelAlign.ipcSerial" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="通道号">
        <el-input v-model="formLabelAlign.channelNo" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="设备名">
        <el-input v-model="formLabelAlign.deviceName" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="通道名">
        <el-input v-model="formLabelAlign.channelName" @blur="setChannelName"></el-input>
      </el-form-item>
      <el-form-item label="在线状态">
        <el-input v-model="formLabelAlign.status" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="是否加密">
        <el-select v-model="formLabelAlign.isEncrypt" :style="style" @change="setIsEncrypt">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频质量">
        <el-select v-model="formLabelAlign.videoLevel" :style="style">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否关联IPC">
        <el-input v-model="formLabelAlign.relatedIpc" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "passage",
  data() {
    return {
      formLabelAlign: {
        deviceSerial: "",
        ipcSerial: "",
        channelNo: "",
        deviceName: "",
        channelName: "",
        status: "",
        isEncrypt: 0,
        videoLevel: 0,
        relatedIpc: ""
      },
      channelName: "",
      isEncrypt: "",
      style: "width:500px;",
      options1: [
        {
          value: 1,
          label: "加密"
        },
        {
          value: 0,
          label: "不加密"
        }
      ],
      options2: [
        {
          value: 0,
          label: "流畅"
        },
        {
          value: 1,
          label: "均衡"
        },
        {
          value: 2,
          label: "高清"
        },
        {
          value: 3,
          label: "超清"
        }
      ]
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/camera/list",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            this.formLabelAlign.deviceSerial = res.data.data[0].deviceSerial;
            this.formLabelAlign.ipcSerial = res.data.data[0].ipcSerial;
            this.formLabelAlign.channelNo = res.data.data[0].channelNo;
            this.formLabelAlign.deviceName = res.data.data[0].deviceName;
            this.formLabelAlign.channelName = res.data.data[0].channelName;
            this.formLabelAlign.status =
              res.data.data[0].status == 1 ? "在线" : "不在线";
            this.formLabelAlign.isEncrypt = res.data.data[0].isEncrypt;
            this.formLabelAlign.videoLevel = res.data.data[0].videoLevel;
            this.formLabelAlign.relatedIpc = res.data.data[0].relatedIpc
              ? "是"
              : "否";
            this.channelName = this.formLabelAlign.deviceName;
            this.isEncrypt = this.formLabelAlign.isEncrypt;
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    setChannelName: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/camera/name/update",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          name: this.formLabelAlign.channelName
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            console.log("通道名修改成功");
          } else {
            this.formLabelAlign.channelName = this.channelName;
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          this.formLabelAlign.channelName = this.channelName;
          console.log("err+++++", error);
        });
    },
    setIsEncrypt: function() {
      console.log(this.formLabelAlign.isEncrypt);
      this.$axios({
        url:
          "https://open.ys7.com/api/lapp/device/encrypt/" +
          (this.formLabelAlign.isEncrypt == 1 ? "on" : "off"),
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          validateCode: this.defined.validateCode
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            console.log("加密方式修改成功");
          } else {
            this.formLabelAlign.isEncrypt = this.isEncrypt;
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          this.formLabelAlign.isEncrypt = this.isEncrypt;
          console.log("err+++++", error);
        });
    }
    // changeMessage: function() {
    //   this.$axios
    //     .all([
    //       this.$options.methods.setChannelName(),
    //       this.$options.methods.setIsEncrypt()
    //     ])
    //     .then(
    //       axios.spread(function(acct, perms) {
    //         console.log("acct  is++", acct);
    //         console.log("perms is ++ ", perms);
    //       })
    //     );
    // }
  },
  mounted: function() {
    this.showMessage();
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>
