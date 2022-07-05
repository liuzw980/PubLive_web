<template>
  <div>
    <el-container>
      <el-header>
        Chat Currently logged in: {{ msg_1
        }}<span @click="quit" class="tuichu"> Quit</span></el-header
      >
      <el-container>
        <el-aside width="200px">
          <div
            class="test004"
            :class="index == 1 ? 'sen' : ''"
            v-if="'test001' != msg_1"
            @click="msgtoplioaotian(1)"
          >
            test001
          </div>
          <div
            class="test004"
            :class="index == 2 ? 'sen' : ''"
            v-if="'test002' != msg_1"
            @click="msgtoplioaotian(2)"
          >
            test002
          </div>
          <div
            class="test004"
            :class="index == 3 ? 'sen' : ''"
            v-if="'test003' != msg_1"
            @click="msgtoplioaotian(3)"
          >
            test003
          </div>
          <div
            class="test004"
            :class="index == 4 ? 'sen' : ''"
            v-if="'test004' != msg_1"
            @click="msgtoplioaotian(4)"
          >
            test004
          </div>
        </el-aside>
        <el-main>
          <div class="bgc">
            <div class="boxmh">
              <div class="bbx" v-for="(item, index) in charList" :key="index">
                {{ item.from }}:{{ item.data }}
              </div>
            </div>
            <div class="boxwarp">
              <el-input
                class="oping"
                :rows="2"
                placeholder="Please enter inside"
                v-model="textarea"
              >
              </el-input>
              <el-button type="primary" class="sendmsg" @click="huoquliaotian()"
                >Send</el-button
              >
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import publive from "../../utils/WebIMConfig";
import WebIM from "easemob-websdk";
import {Base64} from "js-base64"
export default {
  name: "ShenwangHuanxinThereisaway",
  data() {
    return {
      charList: [],
      textarea: "",
      msg_1: localStorage.getItem("username"),
      index: "",
      typeuserid: "",
    };
  },

  mounted() {
    this.sendmsg();
  },

  methods: {
    //接受信息
    msgtoplioaotian(item) {
      if (item == 1) {
        this.typeuserid = "test001";
      } else if (item == 2) {
        this.typeuserid = "test002";
      } else if (item == 3) {
        this.typeuserid = "test003";
      } else {
        this.typeuserid = "test004";
      }
      this.index = item;
    },
    sendmsg() {
      publive.listen({
        onOpened: () => {
          //连接成功回调
          console.log("The connection was successful");
        },
        //文本消息
        onTextMessage: (text) => {
          console.log("A text message was received", text);
          this.charList.push(text);
        },
      });
    },
    quit() {
      publive.close();
      localStorage.removeItem("password");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      this.$router.push("/home");
    },
    huoquliaotian() {
      if (this.index != "") {
        this.sendPrivateText();
      } else {
        this.$message({
          message: "Please select who you want to chat with",
          type: "warning",
        });
      }
    },

    // 发送信息
    sendPrivateText() {
      //加密
      const url = Base64.encode("//im-api.easemob.com");
      console.log(url);
      //解密
      let jiemi = Base64.decode(url);
      console.log(jiemi);
      let _that = this;
      let id = publive.getUniqueId(); // 生成本地消息id
      let msg = new WebIM.message("txt", id); // 创建文本消息
      msg.set({
        msg: this.textarea, // 消息内容
        to: this.typeuserid, // 接收消息对象（用户id）
        chatType: "singleChat", // 设置为单聊
        success: function (id, serverMsgId) {
          _that.$message("Send successfully");
          _that.charList.push({ data: _that.textarea, from: _that.msg_1 });
        },
        fail: function (e) {
          console.log(e, 11111);
          console.log("Send private text error");
        },
      });
      console.log(msg.body, "dsdkshdkhsdkhsk");
      publive.send(msg.body);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  //   line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container {
  height: 100vh;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.test004 {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.bgc {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.boxwarp {
  width: 500px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.sendmsg {
  width: 100px;
  height: 40px;
  margin-left: 20px;
}
.boxmh {
  height: 80%;
  width: 100%;
  border: 1px solid #ccc;
}
.bbx {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.sen {
  background-color: blue;
  color: #fff;
}
.tuichu {
  margin-left: 60%;
}
</style>