<template>
  <div id="CameraControl">
    <el-form label-position="left" label-width="200px" size="mini" :model="formLabelAlign">
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
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="start">
          {{
          isStart ? "停止" : "开始"
          }}
        </el-button>
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
        speed: 0
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
      ]
    };
  },
  methods: {
    start: function() {
      this.isStart = !this.isStart;
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
