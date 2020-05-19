<template>
  <div id="Live"></div>
</template>
<script>
export default {
  name: "Live",
  components: {},
  data() {
    return {};
  },
  methods: {
    getSchedule() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/status/get",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    renewSchedule() {
      window.setInterval(() => {
        setTimeout(getSchedule, 0);
      }, 5000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Live {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 200px;
}
</style>
