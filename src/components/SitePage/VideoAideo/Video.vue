<template>
  <div id="video">
    <el-form label-position="left"
             label-width="150px"
             size="mini"
             :model="formLabelAlign">
      <el-form-item label="码流类型">
        <el-select v-model="formLabelAlign.streamType"
                   style="width:250px;">
          <el-option v-for="item in options1"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频类型">
        <el-select v-model="formLabelAlign.videoType"
                   style="width:250px;"
                   disabled="disabled">
          <el-option v-for="item in options2"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分辨率">
        <el-select v-model="formLabelAlign.resolution"
                   style="width:250px;">
          <el-option v-for="item in options3"
                     :key="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="码率类型">
        <el-select v-model="formLabelAlign.bitRateType"
                   style="width:250px;">
          <el-option v-for="item in options4"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图像质量">
        <el-select v-model="formLabelAlign.imageQuality"
                   style="width:250px;"
                   disabled="disvabled">
          <el-option v-for="item in options5"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频帧率(fps)">
        <el-select v-model="formLabelAlign.videoFrameRate"
                   style="width:250px;">
          <el-option v-for="item in options7"
                     :key="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="码率上限(kbps)">
        <el-input v-model="formLabelAlign.maxBitRate"
                  style="width:250px;"></el-input>

      </el-form-item>
      <el-form-item label="视频编码">
        <el-select v-model="formLabelAlign.videoCoding"
                   style="width:250px;">
          <el-option v-for="item in options7"
                     :key="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Smart264">
        <el-select v-model="formLabelAlign.smart264"
                   style="width:250px;">
          <el-option v-for="item in options8"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编码复杂度">
        <el-select v-model="formLabelAlign.codingComplexity"
                   style="width:250px;">
          <el-option v-for="item in options9"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="帧间隔">
        <el-input v-model="formLabelAlign.videoFrameRate"
                  style="width:250px;"></el-input>
      </el-form-item>
      <el-form-item label="SVC">
        <el-select v-model="formLabelAlign.svc"
                   style="width:250px;">
          <el-option v-for="item in options10"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="码流平滑">
        <el-slider v-model="formLabelAlign.streamSmoothing"
                   show-input
                   style="width:250px;">
        </el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'video',
  data () {
    return {
      formLabelAlign: {
        streamType: "mainstream",
        videoType: 'videostream',
        resolution: '2560*1440P',
        bitRateType: 'fixed',
        imageQuality: 'mid',
        videoFrameRate: "25",
        videoCoding: 'H.264',
        smart264: "on",
        codingComplexity: 'mid',
        svc: "off",
      },
      options1: [
        {
          label: "主码流(定时)",
          value: "mainstream"
        },
        {
          label: "子码流",
          value: "substream"
        }
      ],
      options2: [{
        label: "视频流",
        value: "videostream"
      }],
      options3: ['1280*720P', '1920*1080P', '2560*1440P'],
      options4: [
        {
          label: "定码率",
          value: "fixed"
        },
        {
          label: "变码率",
          value: "variable"
        }
      ],
      options5: [
        {
          label: "最低",
          value: "lowest"
        },
        {
          label: "较低",
          value: "lower"
        }, {
          label: "低",
          value: "low"
        },
        {
          label: "中",
          value: "mid"
        }, {
          label: "较高",
          value: "higher"
        },
        {
          label: "最高",
          value: "highest"
        }
      ],
      options6: ['1/16', '1/8', '1/4', '1/2', '1', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'],
      options7: ['H.265', 'H.264'],
      options8: [{
        label: "关闭",
        value: "off"
      },
      {
        label: "开启",
        value: "on"
      }],
      options9: [
        {
          label: "中",
          value: "mid"
        },
        {
          label: "低",
          value: "low"
        }
      ],
      options10: [
        {
          label: "关闭",
          value: "off"
        },
        {
          label: "开启",
          value: "on"
        }, {
          label: "自动",
          value: "auto"
        }
      ]
    }
  }
}
</script>
<style  scoped>
#video {
  width: 500px;
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