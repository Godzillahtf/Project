<template>
  <div id="localSite">
    <el-card class="box-card1" shadow="always" body-style="padding:5px">
      <div slot="header" class="clearfix">
        <span>播放参数</span>
      </div>
      <div>
        <el-row>
          <el-col :span="8">
            协议类型：
            <el-select v-model="value1">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            播放性能：
            <el-select v-model="value2">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            抓图文件格式：
            <el-select v-model="value3">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            规则信息：
            <el-switch
              v-model="value4"
              active-value="on"
              inactive-value="off"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
            {{value4}}
          </el-col>
          <el-col :span="8">
            POS信息叠加：
            <el-switch
              v-model="value5"
              active-value="on"
              inactive-value="off"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
            {{value5}}
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card2" body-style="padding:5px">
      <div slot="header" class="clearfix">
        <span>录像文件</span>
      </div>
      <div>
        录像文件打包大小：
        <el-radio-group v-model="radio">
          <el-radio label="256M">256M</el-radio>
          <el-radio label="512M">512M</el-radio>
          <el-radio label="1G">1G</el-radio>
        </el-radio-group>
      </div>
      <div>
        录像文件保存路径：
        <input type="text" />
        <input type="button" value="浏览" @click="selectFolder" />
        <input type="button" value="打开文件夹" />
      </div>
      <div>
        回放下载保存路径：
        <input type="text" />
        <input type="file" ref="file1" webkitdirectory directory />
        <input type="button" value="打开文件夹" />
      </div>
    </el-card>
    <el-card class="box-card3" body-style="padding:5px">
      <div slot="header" class="clearfix">
        <span>抓图和剪辑</span>
      </div>
      <div>
        预览抓图保存路径：
        <input type="file" />
        <input type="button" value="浏览" />
        <input type="button" value="打开文件夹" />
      </div>
      <div>
        回放抓图保存路径：
        <input type="text" />
        <input type="button" value="浏览" />
        <input type="button" value="打开文件夹" />
      </div>
      <div>
        回放剪辑保存路径：
        <input type="text" />
        <input type="button" value="浏览" />
        <input type="button" value="打开文件夹" />
      </div>
    </el-card>
    <el-button>保存</el-button>
  </div>
</template>

<script scoped>
export default {
  name: "localSite",
  data() {
    return {
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
      value1: "TCP",
      value2: "short",
      value3: "JPEG",
      value4: "on",
      value5: "on",
      radio: "256M",
      filename: "E:Test"
    };
  },
  methods: {
    selectFolder: function() {}
  }
};
</script>
<style scoped>
</style>
