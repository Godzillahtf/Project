<template>
  <div id="xiaLingShi">
    <el-form label-position="left"
             label-width="80px">
      <el-form-item>
        <el-checkbox v-model="checked">启用夏令时</el-checkbox>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-select v-model="startTime.month"
                   v-bind:disabled="!checked">
          <el-option v-for="item in options1"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="startTime.rank"
                   v-bind:disabled="!checked">
          <el-option v-for="item in options2"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="startTime.week"
                   v-bind:disabled="!checked">
          <el-option v-for="item in options3"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="startTime.day"
                   v-bind:disabled="!checked">
          <el-option v-for="item in list"
                     :key="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-select v-model="endTime.month"
                   v-bind:disabled="!checked">
          <el-option v-for="item in options1"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="endTime.rank"
                   v-bind:disabled="!checked">
          <el-option v-for="item in options2"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="endTime.week"
                   v-bind:disabled="!checked">
          <el-option v-for="item in options3"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="endTime.day"
                   v-bind:disabled="!checked">
          <el-option v-for="item in list"
                     :key="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="偏移时间">
        <el-select v-model="offsetTime"
                   v-bind:disabled="!checked">
          <el-option v-for="item in options4"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "xiaLingShi",
  data () {
    return {
      checked: true,
      startTime: {
        month: "1",
        rank: "1",
        week: "1",
        day: "1"
      },
      endTime: {
        month: "1",
        rank: "1",
        week: "1",
        day: "1"
      },
      offsetTime: "30",
      options1: [{
        value: '1',
        label: '一月'
      }, {
        value: '2',
        label: '二月'
      }, {
        value: '3',
        label: '三月'
      }, {
        value: '4',
        label: '四月'
      }, {
        value: '5',
        label: '五月'
      },
      {
        value: '6',
        label: '六月'
      }, {
        value: '7',
        label: '七月'
      }, {
        value: '8',
        label: '八月'
      }, {
        value: '9',
        label: '九月'
      }, {
        value: '10',
        label: '十月'
      }, {
        value: '11',
        label: '十一月'
      }, {
        value: '12',
        label: '十二月'
      }],
      options2: [
        {
          value: '1',
          label: '首个'
        },
        {
          value: '2',
          label: '第二个'
        }, {
          value: '3',
          label: '第三个'
        }, {
          value: '4',
          label: '第四个'
        }, {
          value: '5',
          label: '末个'
        }
      ],
      options3: [
        {
          value: '1',
          label: '星期一'
        },
        {
          value: '2',
          label: '星期二'
        }, {
          value: '3',
          label: '星期三'
        }, {
          value: '4',
          label: '星期四'
        }, {
          value: '5',
          label: '星期五'
        },
        {
          value: '6',
          label: '星期六'
        }, {
          value: '7',
          label: '星期日'
        }
      ],
      options4: [
        {
          value: '30',
          label: '30分钟'
        },
        {
          value: '60',
          label: '60分钟'
        }, {
          value: '90',
          label: '90分钟'
        }, {
          value: '120',
          label: '120分钟'
        }
      ],
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    }
  }
}
</script>
<style  scoped>
#xiaLingShi {
  width: 1050px;
  position: relative;
  left: 200px;
  top: 20px;
}
.el-form {
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 30px;
}
</style>