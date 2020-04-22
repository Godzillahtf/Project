<template>
  <div id="MapSite">
    <canvas
      class="scaleDragCanvas"
      id="scaleDragCanvas"
      ref="scaleDragCanvas"
      width="800"
      height="650"
      @mousedown="onMouseDown($event)"
      @mousemove="onMouseMove($event)"
      @mouseup="onMouseUp($event)"
      @mousewheel="onMouseWheel($event)"
      @dblclick="onDblClick($event)"
    ></canvas>
    <div id="message">
      <el-form :model="deviceForm" label-position="left" label-width="100px">
        <el-divider>设备信息</el-divider>
        <el-form-item label="设备序列号">
          <el-input v-model="deviceForm.deviceSerial" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="deviceForm.deviceName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-right:100px;">删除</el-button>
          <el-button type="primary">保存</el-button>
        </el-form-item>
        <el-divider>位置信息</el-divider>
        <el-form-item label="设备横坐标">
          <el-input v-model="deviceForm.positionX" auto-complete="off" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="设备纵坐标">
          <el-input v-model="deviceForm.positionY" auto-complete="off" readonly="readonly"></el-input>
        </el-form-item>
        <el-divider>地图信息</el-divider>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="123"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="onchange"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
    </div>
  </div>
</template>
<script>
export default {
  name: "MapSite",
  components: {},
  data() {
    return {
      deviceForm: {
        deviceSerial: "",
        deviceName: " ",
        positionX: "",
        positionY: ""
      },
      imageUrl: "",
      canvas: null,
      context: null,
      img1: null, //图片
      imgX: 0,
      imgY: 0, //图片左上角 和画布左上角的距离
      imgScale: 1.0, //缩放倍数1-100
      MINIMUM_SCALE: 1.0, //最小缩放倍数
      pos: {}, //鼠标点击位置
      pos1: {},
      dragging: false //是否拖拽
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onchange(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imageUrl = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
      console.log(this.imageUrl);
      this.img1.src = require("../assets/1234.jpg");
    },
    initCanvas: function() {
      this.canvas = this.$refs["scaleDragCanvas"];
      if (this.canvas.getContext) {
        this.context = this.canvas.getContext("2d");
      } else {
        console.log("浏览器不支持canvas");
      }
      this.img1 = new Image();
      let that = this;
      this.img1.onload = function() {
        that.$options.methods.drawImage(that);
      };
    },
    drawImage: function(that) {
      that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
      if (that.imgX < that.img1.width * (1 - that.imgScale)) {
        that.imgX = that.img1.width * (1 - that.imgScale);
      } else if (that.imgX > 0) {
        that.imgX = 0;
      }
      if (that.imgY < that.img1.height * (1 - that.imgScale)) {
        that.imgY = that.img1.height * (1 - that.imgScale);
      } else if (that.imgY > 0) {
        that.imgY = 0;
      }
      that.context.drawImage(
        that.img1,
        0,
        0,
        that.img1.width,
        that.img1.height,
        that.imgX,
        that.imgY,
        that.img1.width * that.imgScale,
        that.img1.height * that.imgScale
      );
    },
    windowToCanvas(x, y, that) {
      var box = that.canvas.getBoundingClientRect();
      return {
        x: x - box.left - (box.width - that.canvas.width) / 2,
        y: y - box.top - (box.height - that.canvas.height) / 2
      };
    },
    onDblClick: function(event) {
      var pos = this.$options.methods.windowToCanvas(
        event.clientX,
        event.clientY,
        this
      );
      var newPos = {
        x: ((pos.x - this.imgX) / this.imgScale).toFixed(2),
        y: ((pos.y - this.imgY) / this.imgScale).toFixed(2)
      };
      this.deviceForm.positionX = newPos.x;
      this.deviceForm.positionY = newPos.y;
    },
    onMouseDown: function(event) {
      this.dragging = true;
      this.pos = this.$options.methods.windowToCanvas(
        event.clientX,
        event.clientY,
        this
      );
    },
    onMouseMove: function(event) {
      if (this.dragging) {
        this.pos1 = this.$options.methods.windowToCanvas(
          event.clientX,
          event.clientY,
          this
        );
        var x = this.pos1.x - this.pos.x,
          y = this.pos1.y - this.pos.y;
        this.imgX += x;
        this.imgY += y;
        this.pos = JSON.parse(JSON.stringify(this.pos1));
        this.$options.methods.drawImage(this);
      }
    },
    onMouseUp: function() {
      this.dragging = false;
    },
    onMouseWheel: function(event) {
      var pos = this.$options.methods.windowToCanvas(
        event.clientX,
        event.clientY,
        this
      );
      event.wheelDelteY = event.wheelDelte
        ? evnet.wheelDelte
        : event.deltalY * -40;

      var newPos = {
        x: ((pos.x - this.imgX) / this.imgScale).toFixed(2),
        y: ((pos.y - this.imgY) / this.imgScale).toFixed(2)
      };
      if (event.wheelDelta > 0) {
        this.imgScale += 0.1;
        this.imgX = (1 - this.imgScale) * newPos.x + (pos.x - newPos.x);
        this.imgY = (1 - this.imgScale) * newPos.y + (pos.y - newPos.y);
      } else {
        this.imgScale -= 0.1;
        if (this.imgScale < this.MINIMUM_SCALE) {
          this.imgScale = this.MINIMUM_SCALE;
        }
        this.imgX = (1 - this.imgScale) * newPos.x + (pos.x - newPos.x);
        this.imgY = (1 - this.imgScale) * newPos.y + (pos.y - newPos.y);
      }
      this.$options.methods.drawImage(this);
    }
  },
  mounted: function() {
    this.initCanvas();
  }
};
</script>
<style scoped>
#MapSite {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 200px;
}
.scaleDragCanvas {
  position: absolute;
  left: 30px;
  top: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#message {
  position: absolute;
  padding: 20px;
  box-sizing: border-box;
  width: 400px;
  height: 650px;
  left: 850px;
  top: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
