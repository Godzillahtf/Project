<template>
  <div id="timeSite">
    <el-form
      label-position="left"
      label-width="120px"
      size="mini"
      :model="formLabelAlign"
    >
      <el-form-item label="时区">
        <el-select v-model="formLabelAlign.timeZone" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-radio-group v-model="formLabelAlign.radio">
        <el-radio-button label="NTP校时"></el-radio-button>
        <el-radio-button label="手动校时"></el-radio-button>
      </el-radio-group>
      <div style="margin:20px;"></div>
      <el-form
        label-position="left"
        label-width="120px"
        size="mini"
        :model="formLabelAlignNTP"
        v-if="isNTP"
      >
        <el-form-item label="服务器地址">
          <el-input v-model="formLabelAlignNTP.address"></el-input>
        </el-form-item>
        <el-form-item label="NTP端口">
          <el-input v-model="formLabelAlignNTP.NTPPort"></el-input>
        </el-form-item>
        <el-form-item label="校时间隔(分钟)">
          <el-input v-model="formLabelAlignNTP.interval"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        label-position="left"
        label-width="120px"
        size="mini"
        :model="formLabelAlignManual"
        v-if="!isNTP"
      >
        <el-form-item label="设备时间">
          <el-input v-model="formLabelAlignManual.equipmentTime"></el-input>
        </el-form-item>
        <el-form-item label="设置时间">
          <el-date-picker
            v-model="formLabelAlignManual.siteTime"
            type="datetime"
            style="width:538px;"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form-item style="text-align:right">
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "timeSite",
  data() {
    return {
      formLabelAlign: {
        timeZone: "+8",
        radio: "NTP校时"
      },
      formLabelAlignNTP: {
        address: "time.windows.com",
        NTPPort: "123",
        interval: "1440"
      },
      formLabelAlignManual: {},
      options: [
        {
          value: "-12",
          label: "(GMT-12:00)日界线西"
        },
        {
          value: "-11",
          label: "(GMT-11:00)中途岛，萨摩亚群岛"
        },
        {
          value: "-10",
          label: "(GMT-10:00)夏威夷"
        },
        {
          value: "-9",
          label: "(GMT-09:00)阿拉斯加"
        },
        {
          value: "-8",
          label: "(GMT-08:00)太平洋时间(美国和加拿大)"
        },
        {
          value: "-7",
          label: "(GMT-07:00)山地时间(美国和加拿大)"
        },
        {
          value: "-6",
          label: "(GMT-06:00)中部时间(美国和加拿大)"
        },
        {
          value: "-5",
          label: "(GMT-05:00)东部时间(美国和加拿大)"
        },
        {
          value: "-4.5",
          label: "(GMT-04:30)加拉加斯"
        },
        {
          value: "-4",
          label: "(GMT-04:00)大西洋时间(加拿大)"
        },
        {
          value: "-3.5",
          label: "(GMT-03:30)纽芬兰"
        },
        {
          value: "-3",
          label: "(GMT-03:00)乔治敦、巴西利亚"
        },
        {
          value: "-2",
          label: "(GMT-02:00) 中大西洋"
        },
        {
          value: "-1",
          label: "(GMT-01:00) 佛得角群岛、亚速尔群岛"
        },
        {
          value: "0",
          label: "(GMT+00:00) 都柏林、爱丁堡、伦敦"
        },
        {
          value: "+1",
          label: "(GMT+01:00) 阿姆斯特丹、柏林、罗马、巴黎"
        },
        {
          value: "+2",
          label: "(GMT+02:00) 雅典、耶路撒冷"
        },
        {
          value: "+3",
          label: "(GMT+03:00) 巴格达、科威特、莫斯科、伊斯坦布尔"
        },
        {
          value: "+3.5",
          label: "(GMT+03:30) 德黑兰"
        },
        {
          value: "+4",
          label: "(GMT+04:00) 高加索标准时间"
        },
        {
          value: "+4.5",
          label: "(GMT+04:30) 喀布尔"
        },
        {
          value: "+5",
          label: "(GMT+05:00) 伊斯兰堡、卡拉奇、塔什干"
        },
        {
          value: "+5.5",
          label: "(GMT+05:30) 马德拉斯、孟买、新德里"
        },
        {
          value: "+5.75",
          label: "(GMT+05:45) 加德满都"
        },
        {
          value: "+6",
          label: "(GMT+06:00) 阿拉木图、达卡"
        },
        {
          value: "+6.5",
          label: "(GMT+06:30) 仰光"
        },
        {
          value: "+7",
          label: "(GMT+07:00) 曼谷、河内、雅加达、新西伯利亚"
        },
        {
          value: "+8",
          label: "(GMT+08:00) 北京、乌鲁木齐、新加坡、珀斯"
        },
        {
          value: "+9",
          label: "(GMT+09:00) 首尔、东京、大阪、札幌"
        },
        {
          value: "+9.5",
          label: "(GMT+09:30) 阿德莱德、达尔文"
        },
        {
          value: "+10",
          label: "(GMT+10:00) 墨尔本、悉尼、堪培拉、布里斯班"
        },
        {
          value: "+11",
          label: "(GMT+11:00) 马加丹、索罗门群岛"
        },
        {
          value: "+12",
          label: "(GMT+12:00) 奥克兰、惠灵顿"
        },
        {
          value: "+13",
          label: "(GMT+13:00) 努库阿洛法"
        }
      ]
    };
  },
  computed: {
    isNTP: function() {
      return this.formLabelAlign.radio == "NTP校时" ? true : false;
    }
  }
};
</script>
<style scoped>
#timeSite > .el-form {
  padding: 30px 100px 20px;
}
#timeSite > .el-form .el-select {
  width: 538px !important;
}
</style>
