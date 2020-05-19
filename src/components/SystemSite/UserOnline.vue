<template>
  <div id="userOnline">
    <el-form label-position="left" label-width="80px">
      <el-table style="width:100%" :data="tableData">
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="alarmName" label="告警源名称" width="150"></el-table-column>
        <el-table-column fixed prop="alarmTime" :formatter="dataFormat" label="告警时间" width="250"></el-table-column>
        <el-table-column fixed prop="alarmType" :formatter="dataFormat1" label="告警类型" width="150"></el-table-column>
        <el-table-column label="告警图片" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="showPicture(scope.$index, scope.row)">点击查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="mini" style="margin-top:10px;" @click="renewMessage">刷新</el-button>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "userOnline",
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    showMessage: function(that) {
      that
        .$axios({
          url: "https://open.ys7.com/api/lapp/alarm/list",
          method: "post",
          params: {
            accessToken: that.defined.accessToken,
            startTime: "1457420771029"
          }
        })
        .then(res => {
          if (res.data.code == "200") {
            that.tableData = res.data.data;
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    showPicture: function(index, row) {
      // console.log(row);
      window.open(row.alarmPicUrl);
    },
    dataFormat(row, column) {
      var moment = require("moment");
      var date = row[column.property];
      return moment(date).format("YYYY-MM-DD H:mm:ss");
    },
    dataFormat1(row, column) {
      switch (row.alarmType) {
        case 10079:
          return "智能检测告警";
        //         10000:人体感应事件
        // 10001:紧急遥控按钮事件
        // 10002:移动侦测告警
        // 10003:婴儿啼哭告警
        // 10004:门磁告警
        // 10005:烟感告警
        // 10006:可燃气体告警
        // 10008:水浸告警
        // 10009:紧急按钮告警
        // 10010:人体感应告警
      }
    },
    renewMessage: function() {
      this.$options.methods.showMessage(this);
      this.$message({
        message: "刷新成功",
        type: "success",
        duration: 1000
      });
    }
  },
  mounted: function() {
    this.showMessage(this);
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 50px 20px;
}
/* .el-table::before {
  z-index: inherit;
} */
.table::before {
  z-index: inherit !important;
}
</style>
