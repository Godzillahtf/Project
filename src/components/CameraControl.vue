<template>
  <div id="CameraControl">
    <el-form label-position="left" label-width="150px" size="mini" :model="formLabelAlign">
      <el-form-item label="移动方向">
        <el-select v-model="formLabelAlign.direction" :style="style">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="移动速度">
        <el-select v-model="formLabelAlign.speed" :style="style">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="start">
          {{
          isStart ? "停止" : "开始"
          }}
        </el-button>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="镜像翻转">
        <el-select v-model="formLabelAlign.mirror" :style="style" placeholder="选择对称方式">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="changeMirror">翻转</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "CameraControl",
  components: {},
  data() {
    return {
      formLabelAlign: {
        direction: 0,
        speed: 0,
        mirror: ""
      },
      style: "width:400px",
      isStart: false,
      options1: [
        {
          value: 0,
          label: "上"
        },
        {
          value: 1,
          label: "下"
        },
        {
          value: 2,
          label: "左"
        },
        {
          value: 3,
          label: "右"
        },
        {
          value: 4,
          label: "左上"
        },
        {
          value: 5,
          label: "左下"
        },
        {
          value: 6,
          label: "右上"
        },
        {
          value: 7,
          label: "右下"
        },
        {
          value: 8,
          label: "放大"
        },
        {
          value: 9,
          label: "缩小"
        },
        {
          value: 10,
          label: "近焦距"
        },
        {
          value: 11,
          label: "远焦距"
        }
      ],
      options2: [
        {
          value: 0,
          label: "慢"
        },
        {
          value: 1,
          label: "适中"
        },
        {
          value: 2,
          label: "快"
        }
      ],
      options3: [
        {
          value: 0,
          label: "上下"
        },
        {
          value: 1,
          label: "左右"
        },
        {
          value: 2,
          label: "中心"
        }
      ]
    };
  },
  methods: {
    start: function() {
      if (this.isStart === false) {
        this.$axios({
          url: "https://open.ys7.com/api/lapp/device/ptz/start",
          method: "post",
          params: {
            accessToken: this.defined.accessToken,
            deviceSerial: this.defined.deviceSerial,
            channelNo: 1,
            direction: this.formLabelAlign.direction,
            speed: this.formLabelAlign.speed
          }
        })
          .then(res => {
            if (res.data.code == "200") {
              // console.log("操作成功");
              this.$message({
                message: "操作成功！",
                type: "success",
                duration: 1000
              });
              this.isStart = !this.isStart;
            } else {
              // console.log(res.data.msg);
              this.$message({
                message: res.data.msg,
                type: "error",
                duration: 1000
              });
            }
          })
          .catch(error => {
            // console.log("err+++++", error);
            this.$message({
              message: "系统错误！",
              type: "error00000000000000",
              duration: 1000
            });
          });
      } else {
        this.$axios({
          url: "https://open.ys7.com/api/lapp/device/ptz/stop",
          method: "post",
          params: {
            accessToken: this.defined.accessToken,
            deviceSerial: this.defined.deviceSerial,
            channelNo: 1
          }
        })
          .then(res => {
            if (res.data.code == "200") {
              // console.log("操作成功");
              this.$message({
                message: "操作成功！",
                type: "success",
                duration: 1000
              });
              this.isStart = !this.isStart;
            } else {
              // console.log(res.data.msg);
              this.$message({
                message: res.data.msg,
                type: "error",
                duration: 1000
              });
            }
          })
          .catch(error => {
            // console.log("err+++++", error);
            this.$message({
              message: "系统错误",
              type: "error",
              duration: 1000
            });
          });
      }
    },
    changeMirror() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/ptz/mirror",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          channelNo: 1,
          command: this.formLabelAlign.mirror
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            // console.log("操作成功");
            this.$message({
              message: "操作成功！",
              type: "success",
              duration: 1000
            });
          } else {
            // console.log(res.data.msg);
            this.$message({
              message: res.data.msg,
              type: "error",
              duration: 1000
            });
          }
        })
        .catch(error => {
          // console.log("err+++++", error);
          this.$message({
            message: "系统错误",
            type: "error",
            duration: 1000
          });
        });
    }
  }
};
</script>
<style scoped>
#CameraControl {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
