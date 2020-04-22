<template>
  <div id="groupSite">
    <div class="block">
      <el-tree
        :data="data"
        :props="props"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      ></el-tree>
    </div>
    <el-dialog title="设备信息" :visible.sync="dialogFormVisible1" :append-to-body="true">
      <el-form :model="deviceForm" label-position="left" label-width="100px">
        <el-form-item label="设备序列号">
          <el-input v-model="deviceForm.deviceSerial" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="deviceForm.deviceName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="appendNode()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分组信息" :visible.sync="dialogFormVisible2" :append-to-body="true">
      <el-form :model="groupForm" label-position="left" label-width="100px">
        <el-form-item label="分组名称">
          <el-input v-model="deviceForm.groupName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="appendGroup()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let id = 1000;
export default {
  data() {
    return {
      props: {
        children: "sons"
      },
      dataNode: "",
      deviceForm: {
        deviceSerial: "",
        deviceName: ""
      },
      groupForm: {
        groupName: ""
      },
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      data: [
        {
          id: 4,
          userId: 1,
          nodeType: 0,
          nodeLevel: 1,
          parentId: 3,
          nodeName: "device-1",
          deviceSerial: "blablaxx-1",
          canDelete: 0,
          sons: [
            {
              id: 6,
              userId: 1,
              nodeType: 1,
              nodeLevel: 2,
              parentId: 4,
              nodeName: "node-1-1-1",
              deviceSerial: "blablaxxx",
              canDelete: 1,
              sons: []
            },
            {
              id: 7,
              userId: 1,
              nodeType: 0,
              nodeLevel: 2,
              parentId: 4,
              nodeName: "node-1-1-2",
              deviceSerial: "",
              canDelete: 0,
              sons: [
                {
                  id: 8,
                  userId: 1,
                  nodeType: 0,
                  nodeLevel: 3,
                  parentId: 7,
                  nodeName: "node-1-1-2-1",
                  deviceSerial: "",
                  canDelete: 1,
                  sons: []
                },
                {
                  id: 9,
                  userId: 1,
                  nodeType: 1,
                  nodeLevel: 3,
                  parentId: 7,
                  nodeName: "node-1-1-2-2",
                  deviceSerial: "blablaxxxx",
                  canDelete: 1,
                  sons: []
                }
              ]
            }
          ]
        }
      ]
    };
  },

  methods: {
    addGroup(data) {
      if (this.defined.auth.groupConfig === 0) {
        console.log("没有配置权限!");
        return;
      }
      this.dialogFormVisible2 = true;
      this.dataNode = data;
    },
    appendGroup(data) {
      const newChild = {
        id: id++,
        nodeName: this.groupForm.groupName,
        userId: this.defined.userId,
        nodeType: 0,
        parentId: this.dataNode.id,
        deviceSerial: "",
        sons: []
      };
      this.$axios({
        url: this.defined.serviceURL + "/addGroup",
        method: "post",
        data: {
          id: newChild.parentId,
          nodeType: newChild.nodeType,
          nodeName: newChild.nodeName,
          deviceSerial: newChild.deviceSerial
        }
      })
        .then(res => {
          this.data = res.data.node.sons;
          this.dialogFormVisible2 = false;
        })
        .catch(error => {
          console.log("err++", error);
        });
    },
    addNode(data) {
      if (this.defined.auth.groupConfig === 0) {
        console.log("没有配置权限!");
        return;
      }
      this.dialogFormVisible1 = true;
      this.dataNode = data;
    },
    appendNode() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/info",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.deviceForm.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            if (this.deviceForm.deviceName === res.data.data.deviceName) {
              const newChild = {
                id: id++,
                nodeName: this.deviceForm.deviceName,
                userId: this.defined.userId,
                nodeType: 1,
                parentId: this.dataNode.id,
                deviceSerial: this.deviceForm.deviceSerial,
                sons: []
              };
              this.$axios({
                url: this.defined.serviceURL + "/addGroup",
                method: "post",
                data: {
                  id: newChild.parentId,
                  nodeType: newChild.nodeType,
                  nodeName: newChild.nodeName,
                  deviceSerial: newChild.deviceSerial
                }
              })
                .then(res => {
                  this.data = res.data.node.sons;
                  this.dialogFormVisible1 = false;
                })
                .catch(error => {
                  console.log("err++", error);
                });
            } else console.log("设备名和序列号不对应");
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    remove(node, data) {
      if (this.defined.auth.groupConfig === 0) {
        console.log("没有配置权限!");
        return;
      }
      const parent = node.parent; //父节点
      const children = parent.data.sons; //父节点的所有子节点
      const index = children.findIndex(d => d.id === data.id); //找到data的index
      if (data.sons.length === 0) {
        this.$axios({
          url: this.defined.serviceURL + "/deleteLeafGroup",
          method: "post",
          data: {
            id: data.id
          }
        })
          .then(res => {
            if (res === 0) children.splice(index, 1);
            else console.log("未找到分组");
          })
          .catch(error => {
            console.log("err++", error);
          });
      } else console.log("只能删除空分组！");
    },
    deleteNode(node, data) {
      if (this.defined.auth.groupConfig === 0) {
        console.log("没有配置权限!");
        return;
      }
      const parent = node.parent;
      const children = parent.data.sons;
      const index = children.findIndex(d => d.id === data.id);
      this.$axios({
        url: this.defined.serviceURL + "/deleteLeafGroup",
        method: "post",
        data: {
          id: data.id
        }
      })
        .then(res => {
          if (res === 0) children.splice(index, 1);
          else console.log("未找到节点");
        })
        .catch(error => {
          console.log("err++", error);
        });
    },
    renderContent(h, { node, data, store }) {
      if (data.nodeType == 1)
        return (
          <span class="custom-tree-node">
            <span>{data.nodeName}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.deleteNode(node, data)}
              >
                删除设备
              </el-button>
            </span>
          </span>
        );
      else
        return (
          <div class="custom-tree-node">
            <span>{data.nodeName}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.addGroup(data)}
              >
                添加子分组
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.addNode(data)}
              >
                添加设备
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除分组
              </el-button>
            </span>
          </div>
        );
    },
    showMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/getRootGroup",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          this.data = res.data.node.sons;
        })
        .catch(error => {
          console.log("err++", error);
        });
    }
  },
  mounted: function() {
    // this.showMessage();
  }
};
</script>

<style >
#groupSite {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>