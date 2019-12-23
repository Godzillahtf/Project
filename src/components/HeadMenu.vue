<template>
  <div id="headMenu">
    <div id="header">
      <span v-for="item in menu"
            v-bind:key="item.id"
            @click="toParent(item)">{{item.name}}
      </span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'headMenu',
  data () {
    return {
    }
  },
  props: ["menu"],
  methods: {
    toParent: function (item) {
      this.$emit('change-page', item.page);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#headMenu {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 170px;
}
#headMenu > #header {
  border-bottom: 1px solid #000;
}
#headMenu > div > span {
  margin-left: 30px;
  cursor: pointer;
}
#headMenu > div > span:hover {
  border-bottom: 2px solid blue;
}
</style>
