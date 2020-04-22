<template>
  <div id="xiaLingShi">
    <el-form label-position="left" label-width="80px">
      <el-form-item>
        <el-checkbox v-model="checked">启用夏令时</el-checkbox>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-select v-model="startTime.month" v-bind:disabled="!checked">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="startTime.rank" v-bind:disabled="!checked">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="startTime.week" v-bind:disabled="!checked">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="startTime.day" v-bind:disabled="!checked">
          <el-option v-for="item in list" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-select v-model="endTime.month" v-bind:disabled="!checked">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="endTime.rank" v-bind:disabled="!checked">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="endTime.week" v-bind:disabled="!checked">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="endTime.day" v-bind:disabled="!checked">
          <el-option v-for="item in list" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="偏移时间">
        <el-select v-model="offsetTime" v-bind:disabled="!checked">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary" @click="changeMessage">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "xiaLingShi",
  data() {
    return {
      checked: true,
      startTime: {
        month: 0,
        rank: 0,
        week: 0,
        day: 0
      },
      endTime: {
        month: 0,
        rank: 0,
        week: 0,
        day: 0
      },
      offsetTime: 30,
      options1: [
        {
          value: 1,
          label: "一月"
        },
        {
          value: 2,
          label: "二月"
        },
        {
          value: 3,
          label: "三月"
        },
        {
          value: 4,
          label: "四月"
        },
        {
          value: 5,
          label: "五月"
        },
        {
          value: 6,
          label: "六月"
        },
        {
          value: 7,
          label: "七月"
        },
        {
          value: 8,
          label: "八月"
        },
        {
          value: 9,
          label: "九月"
        },
        {
          value: 10,
          label: "十月"
        },
        {
          value: 11,
          label: "十一月"
        },
        {
          value: 12,
          label: "十二月"
        }
      ],
      options2: [
        {
          value: 1,
          label: "首个"
        },
        {
          value: 2,
          label: "第二个"
        },
        {
          value: 3,
          label: "第三个"
        },
        {
          value: 4,
          label: "第四个"
        },
        {
          value: 5,
          label: "末个"
        }
      ],
      options3: [
        {
          value: 1,
          label: "星期一"
        },
        {
          value: 2,
          label: "星期二"
        },
        {
          value: 3,
          label: "星期三"
        },
        {
          value: 4,
          label: "星期四"
        },
        {
          value: 5,
          label: "星期五"
        },
        {
          value: 6,
          label: "星期六"
        },
        {
          value: 7,
          label: "星期日"
        }
      ],
      options4: [
        {
          value: 30,
          label: "30分钟"
        },
        {
          value: 60,
          label: "60分钟"
        },
        {
          value: 90,
          label: "90分钟"
        },
        {
          value: 120,
          label: "120分钟"
        }
      ],
      list: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ]
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/getSummerTime",
        method: "post",
        data: {
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          this.checked = res.data.summerTime.dst == 0 ? true : false;
          this.startTime.month = res.data.summerTime.startMonth;
          this.startTime.week = res.data.summerTime.startNo;
          this.startTime.day = res.data.summerTime.startDate;
          this.startTime.rank = res.data.summerTime.startTime;
          this.endTime.month = res.data.summerTime.endMonth;
          this.endTime.week = res.data.summerTime.endNo;
          this.endTime.day = res.data.summerTime.endDate;
          this.endTime.rank = res.data.summerTime.endTime;
          this.offsetTime =
            res.data.summerTime.offset == 0 ? 30 : res.data.summerTime.offset;
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    changeMessage: function() {
      if (this.defined.auth.deviceConfig === 0) {
        console.log("没有配置权限!");
        return;
      }
      this.$axios({
        url: this.defined.serviceURL + "/updateSummerTime",
        method: "post",
        data: {
          deviceSerial: this.defined.deviceSerial,
          dst: this.checked ? 0 : 1,
          startMonth: this.startTime.month,
          startNo: this.startTime.week,
          startDate: this.startTime.day,
          startTime: this.startTime.rank,
          endMonth: this.endTime.month,
          endNo: this.endTime.week,
          endDate: this.endTime.day,
          endTime: this.endTime.rank,
          offset: this.offsetTime,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == 0) console.log("保存成功");
          else console.log("保存失败！");
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    }
  },
  mounted: function() {
    this.showMessage();
  }
};
</script>
<style  scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>