<template>
  <div id="time1">
    <el-form
      label-position="left"
      label-width="200px"
      size="mini"
      :model="formLabelAlign"
    >
      <el-form-item label="布防日期">
        <el-select
          v-model="formLabelAlign.week"
          multiple
          placeholder="请选择一周有几天布防"
          style="width:550px;"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="起始时间">
        <el-time-picker
          is-range
          v-model="formLabelAlign.time"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          style="width:550px;"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item style="text-align:left">
        <el-button type="primary">保存</el-button>
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
        week: "",
        time: ""
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
  methods: {}
};
</script>
<style scoped></style>
