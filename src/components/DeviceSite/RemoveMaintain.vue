<template>
  <div id="removeMaintain">
    <el-form label-position="left" label-width="500px" size="mini">
      <el-form-item label="重新启动设备">
        <el-button :style="style" @click="rebootDevice">重启</el-button>
      </el-form-item>
      <el-form-item label="简单恢复参数">
        <el-button :style="style" @click="renewLocalConfig">简单恢复</el-button>
      </el-form-item>
      <el-form-item label="完全恢复参数到出厂设置">
        <el-button :style="style" @click="renewAllConfig">完全恢复</el-button>
      </el-form-item>
      <el-form-item label="设备参数">
        <el-button :style="style" @click="exportMessage">导出设备参数</el-button>
      </el-form-item>
      <!-- <el-form-item label="下载设备报警信息">
        <el-button :style="style" @click="runLog">报警信息</el-button>
      </el-form-item>-->
    </el-form>
    <div id="pdfDom1" v-show="isShow1" style="margin-top:350px;">
      <table class="table_style" border="1">
        <thead>
          <th colspan="2" style="font-size:30px">设备信息</th>
        </thead>
        <tbody>
          <tr>
            <td>设备序列号</td>
            <td>{{deviceSerial}}</td>
          </tr>
          <tr>
            <td>设备名称</td>
            <td>{{deviceName}}</td>
          </tr>
          <tr>
            <td>设备型号</td>
            <td>{{model}}</td>
          </tr>
          <tr>
            <td>设备在线状态</td>
            <td>{{status}}</td>
          </tr>
          <tr>
            <td>设备布防状态</td>
            <td>{{defence}}</td>
          </tr>
          <tr>
            <td>设备是否加密</td>
            <td>{{isEncrypt}}</td>
          </tr>
          <tr>
            <td>设备告警声音模式</td>
            <td>{{alarmSoundMode}}</td>
          </tr>
          <tr>
            <td>设备大类</td>
            <td>{{category}}</td>
          </tr>
          <tr>
            <td>设备IPC序列号</td>
            <td>{{ipcSerial}}</td>
          </tr>
          <tr>
            <td>设备通道号</td>
            <td>{{channelNo}}</td>
          </tr>
          <tr>
            <td>设备通道名</td>
            <td>{{channelName}}</td>
          </tr>
          <tr>
            <td>设备视频质量</td>
            <td>{{videoLevel}}</td>
          </tr>
          <tr>
            <td>设备版本</td>
            <td>{{currentVersion}}</td>
          </tr>
          <tr>
            <td>设备隐私状态</td>
            <td>{{privacyStatus}}</td>
          </tr>
          <tr>
            <td>设备红外状态</td>
            <td>{{pirStatus}}</td>
          </tr>
          <tr>
            <td>设备电池电量</td>
            <td>{{battryStatus}}</td>
          </tr>
          <tr>
            <td>设备硬盘数量</td>
            <td>{{diskNum}}</td>
          </tr>
          <tr>
            <td>设备云存储状态</td>
            <td>{{cloudStatus}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div id="pdfDom2" v-show="isShow2" style="margin-top:300px;"></div> -->
  </div>
</template>
<script>
export default {
  name: "removeMaintain",
  data() {
    return {
      style: "width:150px",
      deviceSerial: "",
      deviceName: "",
      model: "",
      status: "",
      defence: "",
      isEncrypt: "",
      alarmSoundMode: "",
      category: "",
      ipcSerial: "",
      channelNo: "",
      channelName: "",
      videoLevel: "",
      currentVersion: "",
      privacyStatus: "",
      pirStatus: "",
      battryStatus: "",
      diskNum: "",
      cloudStatus: "",
      isShow1: false
    };
  },
  methods: {
    renewLocalConfig: function() {
      //重置本地配置
      if (this.defined.auth.deviceConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.$axios({
        url: this.defined.serviceURL + "/renewLocalConfig",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          if (res.data.code == 0)
            // console.log("重置成功");
            this.$message({
              message: "重置成功",
              type: "success",
              duration: 1000
            });
          // console.log("重置失败");
          else
            this.$message({
              message: "重置失败",
              type: "warning",
              duration: 1000
            });
        })
        .catch(error => {
          // console.log("err+++++", error);
          this.$message({
            message: "系统错误",
            type: "error",
            duration: 1000
          });
        });
    },
    renewAllConfig: function() {
      //重置所有配置
      if (this.defined.auth.deviceConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.$axios({
        url: this.defined.serviceURL + "/renewAllConfig",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          if (res.data.code == 0)
            // console.log("重置成功");
            this.$message({
              message: "重置成功",
              type: "success",
              duration: 1000
            });
          // console.log("重置失败");
          else
            this.$message({
              message: "重置失败",
              type: "warning",
              duration: 1000
            });
        })
        .catch(error => {
          // console.log("err+++++", error);
          this.$message({
            message: "系统错误",
            type: "error",
            duration: 1000
          });
        });
    },
    rebootDevice: function() {
      //重启设备
      if (this.defined.auth.deviceConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.$message({
        message: "设备已经重启",
        type: "success",
        duration: 1000
      });
    },
    exportMessage: function() {
      if (this.defined.auth.deviceConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        return;
      }
      let that = this;
      this.isShow1 = true;
      let getVersion = function() {
        return that.$axios({
          url: "https://open.ys7.com/api/lapp/device/version/info",
          method: "post",
          params: {
            accessToken: that.defined.accessToken,
            deviceSerial: that.defined.deviceSerial
          }
        });
      };
      let getChannel = function() {
        return that.$axios({
          url: "https://open.ys7.com/api/lapp/device/camera/list",
          method: "post",
          params: {
            accessToken: that.defined.accessToken,
            deviceSerial: that.defined.deviceSerial
          }
        });
      };
      let getBasic = function() {
        return that.$axios({
          url: "https://open.ys7.com/api/lapp/device/info",
          method: "post",
          params: {
            accessToken: that.defined.accessToken,
            deviceSerial: that.defined.deviceSerial
          }
        });
      };
      let getStatus = function() {
        return that.$axios({
          url: "https://open.ys7.com/api/lapp/device/status/get",
          method: "post",
          params: {
            accessToken: that.defined.accessToken,
            deviceSerial: that.defined.deviceSerial
          }
        });
      };
      let getSound = function(index) {
        switch (index) {
          case 1:
            return "长叫";
          case 2:
            return "静音";
          case 0:
            return "短叫";
        }
      };
      that.$axios
        .all([getVersion(), getChannel(), getBasic(), getStatus()])
        .then(
          that.$axios.spread((res1, res2, res3, res4) => {
            that.deviceSerial = res2.data.data[0].deviceSerial;
            that.deviceName = res2.data.data[0].deviceName;
            that.model = res3.data.data.model;
            that.status = res2.data.data[0].status ? "在线" : "不在线";
            that.defence = res3.data.data.defence ? "布防" : "撤防";
            that.isEncrypt = res3.data.data.isEncrypt ? "加密" : "不加密";
            that.alarmSoundMode = getSound(res4.data.data.alarmSoundMode); //长短叫
            that.category = res3.data.data.category;
            that.ipcSerial = res2.data.data[0].ipcSerial;
            that.channelNo = res2.data.data[0].channelNo;
            that.channelName = res2.data.data[0].channelName;
            that.videoLevel =
              res2.data.data[0].videoLevel === 3 ? "超清" : "均衡";
            that.currentVersion = res1.data.data.currentVersion;
            that.privacyStatus = res4.data.data.privacyStatus ? "打开" : "关闭";
            that.pirStatus = res4.data.data.pirStatus ? "启用" : "禁用";
            that.battryStatus =
              res4.data.data.battryStatus === -1
                ? "设备没有电池"
                : res4.data.data.battryStatus;
            that.diskNum = res4.data.data.diskNum;
            that.cloudStatus = res4.data.data.cloudStatus ? "激活" : "未开通";
          })
        )
        .then(() => {
          that.getPdf("pdfDom1", that.defined.deviceSerial + "设备参数");
          that.isShow1 = false;
        });
    }
    // runLog: function() {
    //   if (this.defined.auth.deviceConfig === 0) {
    //     // console.log("没有配置权限!");
    //     this.$message({
    //       message: "没有配置权限",
    //       type: "warning",
    //       duration: 1000
    //     });
    //     return;
    //   }
    //   this.$axios({
    //     url: "https://open.ys7.com/api/lapp/alarm/device/list",
    //     method: "post",
    //     params: {
    //       accessToken: this.defined.accessToken,
    //       deviceSerial: this.defined.deviceSerial
    //     }
    //   }).then(res => {
    //     console.log(res.data.data);
    //   });
    // }
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
.table_style td,
th {
  padding: 10px;
  font-size: 15px;
}
.table_style td {
  width: 50%;
}
.table_style {
  margin: 0 10px;
  border-collapse: collapse;
  width: 90%;
  text-align: center;
}
</style>
