<template>
  <div id="MapSite">
    <canvas id="scaleDragCanvas" width="544" height="300" style="border: thin solid #aaaaaa;"></canvas>
  </div>
</template>
<script>
export default {
  name: "MapSite",
  components: {},
  data() {
    return {
      x: "",
      y: ""
    };
  },
  methods: {
    initCanvas: function() {
      var canvas, context;
      var img,
        imgX = 0, //画布上的图像的X坐标
        imgY = 0, //画布上图像的Y坐标
        //当前画布左上角的位置，默认为0,0
        imgScale = 1; //图片的放大倍数
      var MINIMUM_SCALE = 1.0, //起始倍数 为1
        pos = {}, //当前鼠标所在的位置
        posl = {}, //
        dragging = false; //是否在拖拽图片
      (function int() {
        canvas = document.getElementById("scaleDragCanvas"); //画布对象
        context = canvas.getContext("2d"); //画布显示二维图片
        loadImg(); //加载图片
        canvasEventsInit();
      })(); //创建一个canvas 对象
      function loadImg() {
        img = new Image();
        img.onload = function() {
          drawImage();
        };
        img.src = require("../assets/1234.jpg"); //加载一个img图片
      }
      function drawImage() {
        context.clearRect(0, 0, canvas.width, canvas.height); //在给定矩形内清空一个矩形 （左上角x坐标 左上角y坐标  矩形宽度  矩形高度）
        // 保证  imgX  在  [img.width*(1-imgScale),0]   区间内
        if (imgX < img.width * (1 - imgScale)) {
          imgX = img.width * (1 - imgScale);
        } else if (imgX > 0) {
          imgX = 0;
        }
        // 保证  imgY   在  [img.height*(1-imgScale),0]   区间内
        if (imgY < img.height * (1 - imgScale)) {
          imgY = img.height * (1 - imgScale);
        } else if (imgY > 0) {
          imgY = 0;
        }
        context.drawImage(
          img, //规定要使用的图像、画布或视频。
          0,
          0, //开始剪切的 x，y 坐标位置。(sx,sy)
          img.width,
          img.height, //画布的长宽
          imgX,
          imgY, //在画布上放置图像的 x 、y坐标位置。
          img.width * imgScale,
          img.height * imgScale //要使用的图像的宽度、高度
        );
      }
      /*事件注册----拖动图片*/
      function canvasEventsInit() {
        canvas.onmousedown = function(event) {
          dragging = true;
          pos = windowToCanvas(event.clientX, event.clientY); //坐标转换，将窗口坐标转换成canvas的坐标,clientX 鼠标相对于页面框的位置
        }; //
        canvas.onmousemove = function(evt) {
          //鼠标按下
          //移动
          if (dragging) {
            posl = windowToCanvas(evt.clientX, evt.clientY); //鼠标的位置
            var x = posl.x - pos.x, //鼠标横坐标移动距离
              y = posl.y - pos.y; //鼠标纵坐标移动距离
            imgX += x;
            imgY += y; //图片左上角  x，y移动
            pos = JSON.parse(JSON.stringify(posl)); //将鼠标松开的位置从新绘制
            drawImage(); //重新绘制图片
          }
        };
        canvas.onmouseup = function() {
          dragging = false;
        }; //停止移动
        canvas.ondblclick = function() {
          var pos = windowToCanvas(event.clientX, event.clientY);
          this.x = ((pos.x - imgX) / imgScale).toFixed(2);
          this.y = ((pos.y - imgY) / imgScale).toFixed(2);
          console.log(this.x);
          console.log(this.y);
          // console.log("x:", ;
          // console.log("y", );
        };
        // canvas.canvas.onmousewheel =
        canvas.onwheel = function(event) {
          //滚轮放大缩小
          var pos = windowToCanvas(event.clientX, event.clientY); //鼠标的位置  相对于 canvas
          var wheelDelta = event.wheelDelta
            ? event.wheelDelta
            : event.deltalY * -40; //鼠标滑轮的方向   兼容fire fox 和 Chrome 对于wheelDela的不同兼容
          var newPos = {
            //点击位置 相对于原图大小的位置
            x: ((pos.x - imgX) / imgScale).toFixed(2),
            y: ((pos.y - imgY) / imgScale).toFixed(2)
          };
          if (wheelDelta > 0) {
            // 放大
            imgScale += 0.3;
            imgX = (1 - imgScale) * newPos.x + (pos.x - newPos.x);
            imgY = (1 - imgScale) * newPos.y + (pos.y - newPos.y);
          } else {
            //  缩小
            imgScale -= 0.3;
            if (imgScale < MINIMUM_SCALE) {
              //最小缩放1
              imgScale = MINIMUM_SCALE;
            }
            imgX = (1 - imgScale) * newPos.x + (pos.x - newPos.x);
            imgY = (1 - imgScale) * newPos.y + (pos.y - newPos.y);
            // console.log(imgX, imgY);
          }
          drawImage(); //重新绘制图片
        };
      }
      /*坐标转换   返回点击位置相对于canvas的画布的位置*/
      function windowToCanvas(x, y) {
        var box = canvas.getBoundingClientRect(); //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
        return {
          x: x - box.left - (box.width - canvas.width) / 2,
          y: y - box.top - (box.height - canvas.height) / 2
        };
      }
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
</style>
