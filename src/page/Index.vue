<template>
  <div id="index">
    <Header></Header>
    <ul class="asideMenu">
      <li v-for="(item,index) in menuList" v-bind:key="item.id">
        <div class="oneMenu" @click="showToggle(item,index)">
          <span>{{item.name}}</span>
        </div>
        <ul v-show="item.isSubShow">
          <li v-for="(subItem,index) in item.subItems" v-bind:key="subItem.id">
            <div class="oneMenuChild" @click="componentName = 'component'+index">{{subItem.name}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <component v-bind:is="componentName"></component>
  </div>
</template>

<script scoped>
import Header from "../components/Header";
import component1 from "../components/Header copy";
import component2 from "../components/Header copy 2";

export default {
  name: "index",
  components: {
    Header,
    component1,
    component2
  },
  data() {
    return {
      componentName: "component1",
      menuList: [
        {
          name: "字符录入",
          isSubShow: false,
          subItems: [
            {
              name: "字符录入"
            },
            {
              name: "白话文录入"
            },
            {
              name: "文言文录入"
            },
            {
              name: "小写数字录入"
            }
          ]
        },
        {
          name: "票据数据录入",
          isSubShow: false,
          subItems: [
            {
              name: "票据录入"
            },
            {
              name: "翻打传票"
            }
          ]
        },
        {
          name: "交易码录入",
          isSubShow: false,
          subItems: [
            {
              name: "交易码录入"
            },
            {
              name: "交易名称录入"
            }
          ]
        },
        {
          name: "操作码录入",
          isSubShow: false,
          subItems: [
            {
              name: "操作码录入"
            },
            {
              name: "操作名称录入"
            }
          ]
        },
        {
          name: "票据学习",
          isSubShow: false,
          subItems: []
        },
        {
          name: "内部凭证学习",
          isSubShow: false,
          subItems: []
        },
        {
          name: "现金管理学习",
          isSubShow: false,
          subItems: []
        }
      ]
    };
  },
  methods: {
    showToggle: function(item, ind) {
      this.menuList.forEach(i => {
        // 判断如果数据中的menuList[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
        if (i.isSubShow !== this.menuList[ind].isSubShow) {
          i.isSubShow = false;
        }
      });
      item.isSubShow = !item.isSubShow;
      console.log(item.name);
    },
    created() {}
  },
  mounted() {}
};
</script>

<style>
@import "../assets/icon/iconfont.css";
* {
  margin: 0;
  padding: 0;
}
.asideMenu {
  background-color: rgba(0, 0, 0, 0.5);
  width: 150px;
  height: 100%;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
  position: fixed;
  top: 35px;
}
.oneMenu {
  margin-top: 10px;
  border: 1px solid #000000;
}
.oneMenuChild {
  margin-top: 5px;
}
</style>
