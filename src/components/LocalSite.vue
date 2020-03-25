<template>
  <div id="localSite">
    <el-form label-position="left" label-width="200px" size="mini" :model="formLabelAlign">
      <el-form-item label="协议类型">
        <el-select v-model="formLabelAlign.value1" :style="style">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="播放性能">
        <el-select v-model="formLabelAlign.value2" :style="style" allow-create filterable>
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="抓图文件格式">
        <el-select v-model="formLabelAlign.value3" :style="style">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规则信息">
        <el-select v-model="formLabelAlign.value4" :style="style">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="POS信息叠加">
        <el-select v-model="formLabelAlign.value5" :style="style">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录像文件打包大小">
        <el-select v-model="formLabelAlign.radio" :style="style">
          <el-option v-for="item in options5" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录像文件保存路径">
        <el-input v-model="formLabelAlign.webVersion" :style="style"></el-input>
      </el-form-item>
      <el-form-item label="回放下载路径">
        <el-input v-model="formLabelAlign.pluginVersion" :style="style"></el-input>
      </el-form-item>
      <el-form-item label="预览抓图保存路径">
        <el-input v-model="formLabelAlign.aisleCount" :style="style"></el-input>
      </el-form-item>
      <el-form-item label="回放抓图保存路径">
        <el-input v-model="formLabelAlign.hardDiskCount" :style="style"></el-input>
      </el-form-item>
      <el-form-item label="回放剪辑保存路径">
        <el-input v-model="formLabelAlign.alarmInputCount" :style="style"></el-input>
      </el-form-item>
      <el-button type="primary">保存</el-button>
    </el-form>
  </div>
</template>

<script scoped>
export default {
  name: "localSite",
  data() {
    return {
      formLabelAlign: {
        value1: "TCP",
        value2: "short",
        value3: "JPEG",
        value4: "on",
        value5: "on",
        radio: "256M",
        filename: "E:Test"
      },
      style: "width:400px",
      options1: [
        {
          value: "TCP",
          label: "TCP"
        },
        {
          value: "UDP",
          label: "UDP"
        },
        {
          value: "MULTICAST",
          label: "MULTICAST"
        },
        {
          value: "HTTP",
          label: "HTTP"
        }
      ],
      options2: [
        {
          value: "short",
          label: "最短时延"
        },
        {
          value: "long",
          label: "流畅性好"
        },
        {
          value: "middle",
          label: "均衡"
        }
      ],
      options3: [
        {
          value: "JPEG",
          label: "JPEG"
        },
        {
          value: "BMP",
          label: "BMP"
        }
      ],
      options4: [
        {
          value: "on",
          label: "开启"
        },
        {
          value: "off",
          label: "关闭"
        }
      ],
      options5: ["256M", "512M", "1G"]
    };
  },
  methods: {}
};
</script>
<style scoped>
#localSite {
  position: relative;
  padding: 50px 150px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
