<template>
  <div id="time1">
    <el-form label-position="left" label-width="200px" size="mini" :model="formLabelAlign">
      <el-form-item label="布防日期">
        <el-select
          v-model="formLabelAlign.week"
          multiple
          placeholder="请选择一周有哪几天布防"
          style="width:550px;"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-time-select
          is-range
          v-model="formLabelAlign.startTime"
          style="width:550px;"
          :picker-options="{
          start: '00:00',
          step: '00:15',
          end: '24:00'
          }"
        ></el-time-select>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-time-select
          is-range
          v-model="formLabelAlign.stopTime"
          style="width:550px;"
          :picker-options="{
          start: '00:00',
          step: '00:15',
          end: '24:00'
          }"
        ></el-time-select>
      </el-form-item>
      <el-form-item style="text-align:left">
        <el-button type="primary" @click="changeValue">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "time1",
  data() {
    return {
      formLabelAlign: {
        week: [1, 2],
        startTime: "",
        stopTime: ""
      },
      options: [
        {
          value: 0,
          label: "周一"
        },
        {
          value: 1,
          label: "周二"
        },
        {
          value: 2,
          label: "周三"
        },
        {
          value: 3,
          label: "周四"
        },
        {
          value: 4,
          label: "周五"
        },
        {
          value: 5,
          label: "周六"
        },
        {
          value: 6,
          label: "周日"
        }
      ]
    };
  },
  methods: {
    showDate(date) {
      if (date == "n00:00") return "24:00";
      else return date;
    },
    unshowDate(date) {
      if (date == "24:00") return "n00:00";
      else return date;
    },
    showMessage: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/defence/plan/get",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            var arr = res.data.data.period.split(",").map(Number);
            this.formLabelAlign.week = arr;
            this.formLabelAlign.startTime = this.$options.methods.showDate(
              res.data.data.startTime
            );
            this.formLabelAlign.stopTime = this.$options.methods.showDate(
              res.data.data.stopTime
            );
          } else {
            // console.log(res.data.msg);
            this.value = false;
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
    },
    changeValue: function() {
      if (this.defined.auth.defenceConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        this.value = !this.value;
        return;
      }
      if (this.formLabelAlign.startTime < this.formLabelAlign.stopTime) {
        this.$axios({
          url: "https://open.ys7.com/api/lapp/device/defence/plan/set",
          method: "post",
          params: {
            accessToken: this.defined.accessToken,
            deviceSerial: this.defined.deviceSerial,
            startTime: this.$options.methods.unshowDate(
              this.formLabelAlign.startTime
            ),
            stopTime: this.$options.methods.unshowDate(
              this.formLabelAlign.stopTime
            ),
            period: this.formLabelAlign.week.join(",")
          }
        })
          .then(res => {
            if (res.data.code != "200") {
              this.value = !this.value;
              // console.log(res.data.msg);
              this.$message({
                message: res.data.msg,
                type: "warning",
                duration: 1000
              });
            } else {
              // console.log("更改成功！");
              this.$message({
                message: "更改成功",
                type: "success",
                duration: 1000
              });
            }
          })
          .catch(error => {
            // console.log("err+++++", error.data);
            this.$message({
              message: "系统错误",
              type: "error",
              duration: 1000
            });
            this.value = !this.value;
          });
      }
      //  console.log("结束时间不能小于等于开始时间！");
      else
        this.$message({
          message: "结束时间不能小于等于开始时间",
          type: "warning",
          duration: 1000
        });
    }
  },
  mounted: function() {
    this.showMessage();
  }
};
</script>
<style scoped></style>
