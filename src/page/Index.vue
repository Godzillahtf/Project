<template>
  <div id="index">
    <Header></Header>
    <ul class="asideMenu">
      <li v-for="(item,index) in menuList"
          v-bind:key="item.id">
        <div class="oneMenu"
             @click="showToggle(item,index)">
          <span>{{item.name}}</span>
        </div>
        <ul v-show="item.isSubShow">
          <li v-for="subItem in item.subItems"
              v-bind:key="subItem.id">
            <div class="oneMenuChild"
                 @click="componentName = subItem.page">{{subItem.name}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <component v-bind:is="componentName"></component>
  </div>
</template>

<script >
import Header from "../components/Header";
import LocalSite from "../components/LocalSite";
import SystemSite from "../components/SystemSite";
import SystemMaintain from "../components/SystemMaintain";
import SafetyManagement from "../components/SafetyManagement";
import UserManagement from "../components/UserManagement";

export default {
  name: "index",
  components: {
    Header,
    LocalSite,
    SystemSite,
    SystemMaintain,
    SafetyManagement,
    UserManagement
  },
  data () {
    return {
      componentName: "SystemMaintain",
      menuList: [
        {
          name: "本地",
          page: "LocalSite",
          isSubShow: false,
          subItems: []
        },
        {
          name: "系统",
          isSubShow: false,
          subItems: [
            {
              name: "系统设置",
              page: "SystemSite"
            },
            {
              name: "系统维护",
              page: "SystemMaintain"
            },
            {
              name: "安全管理",
              page: "SafetyManagement"
            },
            {
              name: "用户管理",
              page: "UserManagement"
            }
          ]
        },
        {
          name: "网络",
          isSubShow: false,
          subItems: [
            {
              name: "基本配置",
              page: "BasicConfiguration"
            },
            {
              name: "高级配置",
              page: "AdvancedConfiguration"
            }
          ]
        },
        {
          name: "视音频",
          isSubShow: false,
          page: "VideoAndAudio",
          subItems: []
        },
        {
          name: "图像",
          isSubShow: false,
          page: "Image",
          subItems: []
        },
        {
          name: "事件",
          isSubShow: false,
          page: "Event",
          subItems: []
        }
      ]
    };
  },
  methods: {
    showToggle: function (item, ind) {
      this.menuList.forEach(i => {
        // 判断如果数据中的menuList[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
        if (i.isSubShow !== this.menuList[ind].isSubShow) {
          i.isSubShow = false;
        }
      });
      item.isSubShow = !item.isSubShow;
      if (item.page) this.componentName = item.page;
    },
    created () { }
  },
  mounted () { }
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
