<template>
  <div class="box">
    <div class="home" id="home_v3">
      <div class="title">Log in</div>
      <el-input
        v-model="username"
        placeholder="Please enter a user name"
        class="input"
      ></el-input>
      <el-input
        v-model="password"
        type="password"
        placeholder="Please enter a password"
        class="input"
      ></el-input>
      <el-button type="primary" class="input" @click="natop">Log in</el-button>
      <div class="ospan">
        <span>No account,</span> <span @click="zhuce">Go to register</span>
      </div>
    </div>
  </div>
</template>

<script>
import publive from "../../utils/WebIMConfig";
export default {
  name: "DomeGatherHome",
  data() {
    return {
      username: "test001",
      password: "111",
      attb: "",
    };
  },

  mounted() {},

  methods: {
    natop() {
      let _that = this;
      var options = {
        user: this.username.toLowerCase(),
        pwd: this.password,
        appKey: _that.attb.appkey,
        success: function (res) {
          console.log(res);
          var token = res.access_token;
          localStorage.setItem("token", token);
          localStorage.setItem("username", this.user);
          localStorage.setItem("password", this.pwd);
          _that.$router.push("/Thereisaway");
          _that.$message("Login successful");
        },
      };
      publive.open(options); //登录
    },
    zhuce() {
      this.$router.push("/enroll");
    },
  },
};
</script>

<style scoped  lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#home_v3 {
  width: 500px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 20px;
  overflow: hidden;
  .ospan {
    margin-left: 10%;
    margin-top: 15px;
    font-size: 13px;
    span {
      color: #ccc;
    }
  }
  .input {
    width: 80%;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
  .title {
    height: 40px;
    line-height: 50px;
    padding-left: 10%;
    font-size: 20px;
    color: #ccc;
  }
}
</style>