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
        <el-table-column fixed type="index" label="序号" width="40"></el-table-column>
        <el-table-column fixed prop="mapName" label="地图名" width="100"></el-table-column>
        <el-table-column fixed prop="markNumber" label="标记个数" width="80"></el-table-column>
        <el-table-column label="操作" width="217">
          <template slot-scope="scope">
            <el-button size="mini" @click="mapClick(scope.$index, scope.row, tableData1)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="mapDelete(scope.$index, scope.row, tableData1)"
            >删除</el-button>
            <el-button size="mini" @click="changeSave(scope.$index, scope.row, tableData1)">保存</el-button>
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
          <el-input v-model="formLabelAlign.rowMark" readonly="readonly" :style="style"></el-input>
        </el-form-item>
        <el-form-item label="标记纵坐标">
          <el-input v-model="formLabelAlign.columnMark" readonly="readonly" :style="style"></el-input>
        </el-form-item>
        <el-form-item label="设备序列号">
          <el-input v-model="formLabelAlign.deviceSerial" readonly="readonly" :style="style"></el-input>
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
          <el-input v-model="markForm.deviceSerial" auto-complete="off"></el-input>
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

export default {
  name: "MapSite",
  components: {},
  data() {
    return {
      tableData1: [],
      tableData2: [],
      fileList: [],
      formLabelAlign: {
        markName: "",
        rowMark: null,
        columnMark: null,
        deviceSerial: "",
        deviceName: "",
        id: ""
      },
      mapForm: {
        mapName: "",
        mapURL: ""
      },
      markForm: {
        markName: "",
        deviceSerial: "",
        deviceName: "",
        x: "",
        y: ""
      },
      mapId: "",
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
      dragging: false, //是否拖拽
      markDragging: false
    };
  },
  methods: {
    addMap() {
      let that = this;
      let cos = new COS({
        SecretId: this.defined.SecretId,
        SecretKey: this.defined.SecretKey
      });
      // console.log(this.fileList[0]);
      if (this.fileList[0] === undefined) {
        this.$message({
          message: "请选择上传图片",
          type: "warning",
          duration: 1000
        });
      } else {
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
              that.mapForm.mapURL = "https://" + data.Location;
              if (that.mapForm.mapName === "")
                that.$message({
                  message: "地图名不能为空",
                  type: "warning",
                  duration: 1000
                });
              else {
                that
                  .$axios({
                    url: that.defined.serviceURL + "/addMap",
                    method: "post",
                    data: {
                      userId: that.defined.userId,
                      mapName: that.mapForm.mapName,
                      mapUrl: that.mapForm.mapURL
                    }
                  })
                  .then(res => {
                    that.tableData1 = res.data.map;
                    that.dialogFormVisible1 = false;
                    that.$message({
                      message: "添加成功",
                      type: "success",
                      duration: 1000
                    });
                  })
                  .catch(error => {
                    // console.log("err++", error);
                    that.$message({
                      message: "系统错误",
                      type: "error",
                      duration: 1000
                    });
                  });
              }
            }
          }
        );
      }
    },
    addMark() {
      if (this.markForm.markName === "") {
        this.$message({
          message: "标记名不能为空",
          type: "warning",
          duration: 1000
        });
      } else if (this.markForm.deviceSerial === "") {
        this.$message({
          message: "设备序列号不能为空",
          type: "warning",
          duration: 1000
        });
      } else if (this.markForm.deviceName === "") {
        this.$message({
          message: "设备名不能为空",
          type: "warning",
          duration: 1000
        });
      } else if (this.mapId === "") {
        this.$message({
          message: "请先选择地图",
          type: "warning",
          duration: 1000
        });
      } else {
        this.$axios({
          url: this.defined.serviceURL + "/addMark",
          method: "post",
          data: {
            mapId: this.mapId,
            markName: this.markForm.markName,
            rowMark: 0.1,
            columnMark: 0.1,
            deviceSerial: this.markForm.deviceSerial,
            deviceName: this.markForm.deviceName
          }
        })
          .then(res => {
            this.tableData2 = res.data.mark;
            let index = this.tableData1.findIndex(d => d.id === this.mapId);
            this.tableData1[index].marks = res.data.mark;
            this.$options.methods.drawMark(this);
          })
          .catch(error => {
            // console.log("err++", error);
          });

        this.dialogFormVisible2 = false;
      }
    },
    fileChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    mapDelete(index, row, tableData) {
      this.$axios({
        url: this.defined.serviceURL + "/deleteMap",
        method: "post",
        data: {
          userId: this.defined.userId,
          id: row.id
        }
      })
        .then(res => {
          // console.log(res.data.map);
          this.tableData1 = res.data.map;
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
        })
        .catch(error => {
          // console.log("err++", error);
          this.$message({
            message: "系统错误",
            type: "error",
            duration: 1000
          });
        });
    },
    changeSave(index, row, tableData) {
      if (this.mapId !== row.id) {
        // console.log("只能保存当前图层标记");
        this.$message({
          message: "只能保存当前图层标记",
          type: "warning",
          duration: 1000
        });
      } else {
        // console.log(this.tableData2);
        this.$axios({
          url: this.defined.serviceURL + "/updateMark",
          method: "post",
          data: {
            mark: this.tableData2
          }
        })
          .then(res => {
            // console.log(res);
            this.tableData2 = res.data.mark;
            this.$options.methods.drawMark(this);
            // console.log("保存成功！");
            this.$message({
              message: "保存成功",
              type: "success",
              duration: 1000
            });
          })
          .catch(error => {
            // console.log("err++", error);
            this.$message({
              message: "系统错误",
              type: "error",
              duration: 1000
            });
          });
      }
    },
    markDelete(index, row, tableData) {
      // console.log(row.id);
      this.$axios({
        url: this.defined.serviceURL + "/deleteMark",
        method: "post",
        data: {
          id: row.id
        }
      })
        .then(res => {
          this.tableData2 = res.data.mark;
          let index = this.tableData1.findIndex(d => d.id === this.mapId);
          this.tableData1[index].marks = res.data.mark;
          this.$options.methods.drawMark(this);
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
        })
        .catch(error => {
          // console.log("err++", error);
          this.$message({
            message: "系统错误",
            type: "error",
            duration: 1000
          });
        });
    },
    drawMark(that) {
      var div = that.$refs["borderDiv"];
      var divs = div.getElementsByTagName("div");
      if (divs.length > 0) {
        for (var i = divs.length - 1; i >= 0; i--) {
          //清除所有的div
          divs[i].remove();
        }
      }
      that.tableData2.map((item, index) => {
        var i = document.createElement("div");
        var dx, dy;
        i.className = "iclass";
        i.style.left = item.rowMark + "px";
        i.style.top = item.columnMark + "px";
        i.onmousedown = function(event) {
          that.markDragging = true;
          dx = event.clientX - i.offsetLeft;
          dy = event.clientY - i.offsetTop;
        };
        i.onmousemove = function(event) {
          if (that.markDragging) {
            i.style.left = event.clientX - dx + "px";
            i.style.top = event.clientY - dy + "px";
            if (
              parseFloat(i.style.left) >=
              that.img1.width * that.imgScale + that.imgX - 10
            ) {
              i.style.left =
                that.img1.width * that.imgScale + that.imgX - 10 + "px";
            }
            if (
              parseFloat(i.style.top) >=
              that.img1.height * that.imgScale + that.imgY - 10
            ) {
              i.style.top =
                that.img1.height * that.imgScale + that.imgY - 10 + "px";
            }
          }
        };
        i.onmouseup = function(event) {
          that.markDragging = false;
          var pos = that.$options.methods.windowToCanvas(
            event.clientX - dx + 230,
            event.clientY - dy + 60,
            that
          );
          var newPos = {
            x: ((pos.x - that.imgX) / that.imgScale).toFixed(4),
            y: ((pos.y - that.imgY) / that.imgScale).toFixed(4)
          };
          that.tableData2[index].rowMark = parseFloat(newPos.x) + 0.001;
          that.tableData2[index].columnMark = parseFloat(newPos.y) + 0.001;
        };
        i.onclick = function() {
          that.formLabelAlign.markName = item.markName;
          that.formLabelAlign.rowMark = item.rowMark + 1;
          that.formLabelAlign.columnMark = item.columnMark + 1;
          that.formLabelAlign.deviceSerial = item.deviceSerial;
          that.formLabelAlign.deviceName = item.deviceName;
          that.formLabelAlign.id = item.id;
        };
        div.appendChild(i);
      });
    },
    mapClick: function(index, row, tableData) {
      this.img1.src = row.mapUrl;
      this.mapId = row.id;
      this.tableData2 = row.marks;
      this.$options.methods.drawMark(this);
    },
    markClick: function(row) {
      this.formLabelAlign.markName = row.markName;
      this.formLabelAlign.rowMark = row.rowMark;
      this.formLabelAlign.columnMark = row.columnMark;
      this.formLabelAlign.deviceSerial = row.deviceSerial;
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
        let div = this.$refs["borderDiv"];
        let divs = div.getElementsByTagName("div");
        if (divs.length > 0) {
          if (
            this.imgX === 0 ||
            this.imgX === this.img1.width * (1 - this.imgScale)
          )
            x = 0;
          if (
            this.imgY === 0 ||
            this.imgY === this.img1.height * (1 - this.imgScale)
          )
            y = 0;
          for (var i = divs.length - 1; i >= 0; i--) {
            let l = parseFloat(divs[i].style.left);
            let r = parseFloat(divs[i].style.top);
            divs[i].style.left = l + x + "px";
            divs[i].style.top = r + y + "px";
          }
        }
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
      let div = this.$refs["borderDiv"];
      let divs = div.getElementsByTagName("div");
      if (divs.length > 0) {
        for (var i = divs.length - 1; i >= 0; i--) {
          //清除所有的div
          divs[i].style.left =
            this.tableData2[i].rowMark * this.imgScale + this.imgX + "px";
          divs[i].style.top =
            this.tableData2[i].columnMark * this.imgScale + this.imgY + "px";
        }
      }
    },
    showMessage() {
      this.$axios({
        url: this.defined.serviceURL + "/getMap",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          this.tableData1 = res.data.map;
          // console.log(res.data.map);
        })
        .catch(error => {
          console.log("err++", error);
        });
    }
  },
  mounted: function() {
    this.initCanvas();
    this.showMessage();
    // cos.getObjectUrl(
    //   {
    //     Bucket: "mypicture-1301942721",
    //     Region: "ap-beijing" /* 存储桶所在地域，必须字段 */,
    //     Key: "1234.jpg",
    //     Sign: true
    //   },
    //   function(err, data) {
    //     if (err) return console.log(err);
    //     var downloadUrl =
    //       data.Url +
    //       (data.Url.indexOf("?") > -1 ? "&" : "?") +
    //       "response-content-disposition=attachment"; // 补充强制下载的参数
    //     window.open(downloadUrl); // 这里是新窗口打开 url，如果需要在当前窗口打开，可以使用隐藏的 iframe 下载，或使用 a 标签 download 属性协助下载
    //   }
    // );
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
<style>
.iclass {
  width: 6px;
  height: 6px;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 2px #6666ff;
  position: absolute;
  top: 0px;
  left: 100px;
  cursor: pointer;
}
</style>
