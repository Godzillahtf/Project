<template>
  <div id="picture1">
    <el-image style="width: 100%; height: 500px " :src="url" ref="image" id="image">
      <div slot="error" class="image-slot">
        暂无抓图
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <!-- <img :src="url" alt id="image" style="width: 100%; height: 500px " /> -->
    <el-button size="mini" @click="screenshot">抓取相机图片</el-button>
    <el-button size="mini" @click="downloadImg" v-show="hasUrl">下载图片</el-button>
    <el-input
      size="mini"
      placeholder="请输入电子邮箱"
      style="width:580px"
      v-show="hasUrl"
      v-model="mailaddress"
    ></el-input>
    <el-button size="mini" v-show="hasUrl" @click="sendEmail">发送</el-button>
  </div>
</template>
<script>
import domtoimage from "dom-to-image";
import COS from "cos-js-sdk-v5";
export default {
  name: "picture1",
  components: {},
  data() {
    return {
      url: "",
      hasUrl: false,
      mailaddress: ""
    };
  },
  methods: {
    screenshot: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/capture",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          channelNo: 1
        }
      })
        .then(res => {
          this.url = res.data.data.picUrl;
          // console.log(res.data.data.picUrl);
          this.hasUrl = true;
        })
        .catch(error => {
          // console.log("err++", error);0
          this.$message({
            message: "系统错误",
            type: "error",
            duration: 1000
          });
        });
    },
    downloadImg: function() {
      // console.log(this.$refs.image);
      // domtoimage.toPng(this.$refs.image).then(dataUrl => {
      //   let img = new Image();
      //   img.src = dataUrl;
      //   document.body.appendChild(img);
      //   console.log("dataUrl :",dataUrl);
      // });
      // domtoimage.toBlob(this.$refs.image).then(blob => {
      //   console.log(blob);
      //   window.saveAs(blob, "123.png");
      // });
      // this.getPdf("picture1", "123");
      let cos = new COS({
        SecretId: this.defined.SecretId,
        SecretKey: this.defined.SecretKey
      });
      cos.getObjectUrl(
        {
          Bucket: "mypicture-1301942721",
          Region: "ap-beijing" /* 存储桶所在地域，必须字段 */,
          Key: "1e7p6ztograr8d64kxsvykq9s.jpg",
          Sign: true
        },
        function(err, data) {
          if (err) return console.log(err);
          var downloadUrl =
            data.Url +
            (data.Url.indexOf("?") > -1 ? "&" : "?") +
            "response-content-disposition=attachment"; // 补充强制下载的参数
          window.open(downloadUrl); // 这里是新窗口打开 url，如果需要在当前窗口打开，可以使用隐藏的 iframe 下载，或使用 a 标签 download 属性协助下载
        }
      );
    },
    sendEmail: function() {
      if (this.mailaddress === "") {
        this.$message({
          message: "邮箱不能为空",
          type: "warning",
          duration: 1000
        });
      } else {
        var reg = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/;
        var re = new RegExp(reg);
        if (!re.test(this.mailaddress)) {
          this.$message({
            message: "邮箱格式不正确",
            type: "warning",
            duration: 1000
          });
        } else {
          let time = new Date();
          let content =
            "设备：" +
            this.defined.deviceSerial +
            "---------时间：" +
            time +
            "--------抓图地址：" +
            this.url;
          this.$axios({
            url: this.defined.serviceURL + "/postEmail",
            method: "post",
            data: {
              mailAddress: this.mailaddress,
              content: content
            }
          })
            .then(res => {
              if (res.data.code == 0) {
                // console.log("修改成功");
                this.$message({
                  message: "抓图地址已经发送到邮箱",
                  type: "success",
                  duration: 1000
                });
                this.dialogFormVisible = false;
              }
              // console.log("修改失败");
              else
                this.$message({
                  message: "邮件发送失败！",
                  type: "error",
                  duration: 1000
                });
            })
            .catch(error => {
              // console.log("err+++++", error);
              this.$message({
                message: "系统错误！",
                type: "error",
                duration: 1000
              });
            });
        }
      }
    }
  }
};
</script>
<style scoped>
#picture1 {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
