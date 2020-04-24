<template>
  <div id="MapSite">
    <div class="borderDiv" ref="borderDiv">
      <canvas
        class="canvas"
        ref="scaleDragCanvas"
        width="800"
        height="650"
        @mousedown="onMouseDown($event)"
        @mousemove="onMouseMove($event)"
        @mouseup="onMouseUp($event)"
        @mousewheel="onMouseWheel($event)"
      ></canvas>
    </div>
    <div id="message">
      <el-divider>
        地图列表&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" @click="dialogFormVisible1 = true">添加</el-button>
      </el-divider>

      <el-table style="width:100%" :data="tableData1" border size="mini">
        <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
        <el-table-column fixed prop="mapName" label="地图名" width="100"></el-table-column>
        <el-table-column fixed prop="mapCount" label="标记个数" width="80"></el-table-column>
        <el-table-column label="操作" width="177">
          <template slot-scope="scope">
            <el-button size="mini" @click="mapClick(scope.$index, scope.row, tableData1)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="mapDelete(scope.$index, scope.row, tableData1)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider>
        标记列表&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button size="mini" @click="dialogFormVisible2 = true">添加</el-button>
      </el-divider>
      <el-table style="width:100%" :data="tableData2" border size="mini" @row-click="markClick">
        <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
        <el-table-column fixed prop="markName" label="标记名" width="257"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="markDelete(scope.$index, scope.row, tableData2)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider>标记信息</el-divider>
      <el-form label-position="left" label-width="90px" size="mini" :model="formLabelAlign" inline>
        <el-form-item label="标记名">
          <el-input v-model="formLabelAlign.markName" readonly="readonly" :style="style"></el-input>
        </el-form-item>
        <el-form-item label="设备名">
          <el-input v-model="formLabelAlign.deviceName" readonly="readonly" :style="style"></el-input>
        </el-form-item>
        <el-form-item label="标记横坐标">
          <el-input v-model="formLabelAlign.positionX" readonly="readonly" :style="style"></el-input>
        </el-form-item>
        <el-form-item label="标记纵坐标">
          <el-input v-model="formLabelAlign.positionY" readonly="readonly" :style="style"></el-input>
        </el-form-item>
        <el-form-item label="设备序列号">
          <el-input v-model="formLabelAlign.deviceSerical" readonly="readonly" :style="style"></el-input>
        </el-form-item>
        <el-form-item label="标记ID">
          <el-input v-model="formLabelAlign.id" readonly="readonly" :style="style"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="添加地图" :visible.sync="dialogFormVisible1" :append-to-body="true">
      <el-form :model="mapForm" label-position="left" label-width="100px">
        <el-form-item label="地图名">
          <el-input v-model="mapForm.mapName" auto-complete="off"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          action="https://mypicture-1301942721.cos.ap-beijing.myqcloud.com "
          :file-list="fileList"
          accept=".jpg"
          :show-file-list="true"
          :on-change="fileChange"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2MB,在上传会覆盖上一个文件。</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addMap">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加坐标" :visible.sync="dialogFormVisible2" :append-to-body="true">
      <el-form :model="markForm" label-position="left" label-width="100px">
        <el-form-item label="坐标名">
          <el-input v-model="markForm.markName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名">
          <el-input v-model="markForm.deviceName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备序列号">
          <el-input v-model="markForm.deviceSerical" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import COS from "cos-js-sdk-v5";
var cos = new COS({
  SecretId: "AKIDiDVXLBi47tOcdNI2dy5yd3DByc1ARlGW",
  SecretKey: "FHAoEOJ8hz3wXx73mFTSFn57tQgldLp4"
});
export default {
  name: "MapSite",
  components: {},
  data() {
    return {
      tableData1: [
        {
          mapName: "一号教学楼",
          id: 1,
          mapCount: 2,
          mapSrc:
            "https://mypicture-1301942721.cos.ap-beijing.myqcloud.com/1234.jpg"
        },
        {
          mapName: "2号教学楼",
          id: 2,
          mapCount: 1,
          mapSrc:
            "https://mypicture-1301942721.cos.ap-beijing.myqcloud.com/timg.jpg"
        }
      ],
      tableData2: [
        {
          markName: "J-1-301",
          positionX: "123",
          positionY: "123",
          deviceSerical: "E135256833",
          deviceName: "摄像头1",
          id: 1
        },
        {
          markName: "J-1-302",
          positionX: "223",
          positionY: "234",
          deviceSerical: "A135256833",
          deviceName: "摄像头2",
          id: 2
        },
        {
          markName: "J-1-302",
          positionX: "323",
          positionY: "234",
          deviceSerical: "A135256833",
          deviceName: "摄像头3",
          id: 3
        }
      ],
      fileList: [],
      formLabelAlign: {
        markName: "",
        positionX: "",
        positionY: "",
        deviceSerical: "",
        deviceName: "",
        id: ""
      },
      mapForm: {
        mapName: "",
        mapURL: ""
      },
      markForm: {
        markName: "",
        deviceSerical: "",
        deviceName: "",
        x: "",
        y: ""
      },
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      icon: null,
      style: "width:100px",
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
    addMap() {
      let that = this;
      console.log(this.fileList[0].raw);
      cos.putObject(
        {
          Bucket: "mypicture-1301942721" /* 必须 */,
          Region: "ap-beijing" /* 存储桶所在地域，必须字段 */,
          Key: this.fileList[0].name /* 必须 */,
          StorageClass: "STANDARD",
          Body: this.fileList[0].raw // 上传文件对象
        },
        function(err, data) {
          if (data.statusCode === 200) {
            that.mapForm.mapURL = data.Location;
            console.log(data.Location);
            if (that.mapForm.mapName === "") console.log("地图名不能为空");
            else {
              that.tableData1.push({
                mapName: "3号教学楼",
                mapCount: 0,
                id: 3,
                mapSrc: "https://" + data.Location
              });
              that.dialogFormVisible1 = false;
            }
          }
        }
      );
    },
    addMark() {
      this.tableData2.push({
        markName: "J-1-304",
        positionX: "400",
        positionY: "400",
        deviceSerical: "E135256833",
        deviceName: "摄像头4",
        id: 4
      });
      this.dialogFormVisible2 = false;
    },
    fileChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    mapDelete(index, row, tableData) {
      tableData.splice(index, 1);
    },
    markDelete(index, row, tableData) {
      tableData.splice(index, 1);
    },
    mapClick: function(index, row, tableData) {
      var div = this.$refs["borderDiv"];
      div.this.img1.src = row.mapSrc;
      this.tableData2.map((item, index) => {
        var i = document.createElement("div");
        i.className = "iclass";
        i.style.left = item.positionX + "px";
        i.style.top = item.positionY + "px";
        div.appendChild(i);
      });
    },
    iconClick: function() {
      console.log(this.tableData2[0].positionX);
    },
    markClick: function(row) {
      this.formLabelAlign.markName = row.markName;
      this.formLabelAlign.positionX = row.positionX;
      this.formLabelAlign.positionY = row.positionY;
      this.formLabelAlign.deviceSerical = row.deviceSerical;
      this.formLabelAlign.deviceName = row.deviceName;
      this.formLabelAlign.id = row.id;
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
    // onDblClick: function(event) {
    //   var pos = this.$options.methods.windowToCanvas(
    //     event.clientX,
    //     event.clientY,
    //     this
    //   );
    //   var newPos = {
    //     x: ((pos.x - this.imgX) / this.imgScale).toFixed(2),
    //     y: ((pos.y - this.imgY) / this.imgScale).toFixed(2)
    //   };
    //   // if (this.img1.src) this.dialogFormVisible2 = true;
    //   this.icon = new Image();
    //   let that = this;
    //   this.icon.onload = function() {
    //     that.context.drawImage(that.icon, 0, 0, 30, 30, 400, 200, 50, 50);
    //   };
    //   this.icon.onclick = function() {
    //     console.log(1);
    //   };
    //   this.icon.src = require("../assets/logo.png");
    // },
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
.borderDiv {
  position: relative;
  overflow: hidden;
  width: 800px;
  height: 650px;
  left: 30px;
  top: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.canvas {
  position: absolute;
}
#message {
  position: absolute;
  padding: 0 20px;
  box-sizing: border-box;
  width: 480px;
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
<style >
.iclass {
  width: 10px;
  height: 10px;
  background-color: #000000;
  position: absolute;
  top: 0px;
  left: 100px;
  cursor: pointer;
}
</style>
