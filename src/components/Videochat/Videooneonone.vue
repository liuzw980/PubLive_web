<template>
  <div class="Videooneonone">
    <div>
      <div>
        <el-input
          placeholder="Please enter a channel"
          v-model="jsaon"
          class="input"
        ></el-input>
      </div>
      <div class="display">
        <div class="create" @click.once="natop">Join</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { startBasicCallPublive } from "../../utils/client.js";
export default {
  name: "ShenwangHuanxinVideooneonone",
  data() {
    return {
      jsaon: "",
    };
  },

  mounted() {
    // this.startBasicLiveStreaming();
  },

  methods: {
    // // 获取主播token

    gettoken() {
      let _that = this;
      axios({
        url: `http://13.57.133.175:8888/api/httplive/temp/v2/getAnchorToken?channel=${_that.jsaon}`,
        method: "post",
      })
        .then(function (response) {
          let options = {
            appId: "069ece12e6444dccab57f953eb661fe1",
            // 传入频道名
            channel: _that.jsaon,
            uid: response.data.retStr,
            // 设置用户为 host (可发流) 或 audience（仅可收流）
            role: "host",
            token: response.data.retStr,
          };

          startBasicCallPublive(options);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    natop() {
      this.gettoken();
    },
  },
};
</script>

<style lang="scss" scoped>
.Videooneonone {
  width: 500px;
  height: 300px;
  margin: 0 auto;
  display: flex;

  // align-items: center;
  .input {
    width: 400px;
    margin-top:50px;
  }
  .display {
    display: flex;
    justify-content: space-between;
  }
  .create {
    width: 150px;
    height: 40px;
    background-color: blue;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-top: 20px;
  }
  .join {
    width: 150px;
    height: 40px;
    background-color: blue;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-top: 20px;
  }
}
</style>