<template>
  <div id="armingSite">
    <el-tabs v-model="activeName">
      <el-tab-pane label="WIFI提示音" name="first">
        <WIFIbeep />
      </el-tab-pane>
      <el-tab-pane label="镜头遮蔽状态" name="second">
        <Shadow />
      </el-tab-pane>
      <el-tab-pane label="声源定位" name="third">
        <Sound />
      </el-tab-pane>
      <el-tab-pane label="摄像机指示灯" name="fourth">
        <Light />
      </el-tab-pane>
      <el-tab-pane label="全天录像" name="fifth">
        <Video />
      </el-tab-pane>
      <el-tab-pane label="麦克风" name="sixth">
        <Mike />
      </el-tab-pane>
      <el-tab-pane label="移动跟踪" name="seventh">
        <Track />
      </el-tab-pane>
      <el-tab-pane label="智能检测" name="eigth">
        <Smart />
      </el-tab-pane>
      <el-tab-pane label="布防时间" name="ninth">
        <Time />
      </el-tab-pane>
      <el-tab-pane label="移动侦测灵敏度" name="tenth">
        <Moving />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import WIFIbeep from "../components/ArmingSite/WIFIbeep";
import Video from "../components/ArmingSite/Video";
import Track from "../components/ArmingSite/Track";
import Time from "../components/ArmingSite/Time";
import Sound from "../components/ArmingSite/Sound";
import Smart from "../components/ArmingSite/Smart";
import Shadow from "../components/ArmingSite/Shadow";
import Moving from "../components/ArmingSite/Moving";
import Mike from "../components/ArmingSite/Mike";
import Light from "../components/ArmingSite/Light";

export default {
  name: "armingSite",
  components: {
    Light,
    Mike,
    Moving,
    Shadow,
    Smart,
    Sound,
    Time,
    Track,
    Video,
    WIFIbeep
  },
  data() {
    return { activeName: "first" };
  }
};
</script>
<style scoped>
#armingSite {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
