<template>
  <div class="box">
    <div class="home" id="home_v3">
      <div class="title">Enroll</div>
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
      <el-input
        v-model="nickname"
        placeholder="Please enter a name"
        class="input"
      ></el-input>
      <el-button type="primary" class="input" @click="natop">enroll</el-button>
      <div class="ospan"><span @click="tologlin">Go to Sign In</span></div>
    </div>
  </div>
</template>

<script>
import publive from "../../utils/WebIMConfig";
export default {
  name: "DomeGatherHome",
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
    };
  },
  mounted() {},
  methods: {
    natop() {
        let _that =this
      var options = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
        appKey: publive.appkey,
        success: function () {
          _that.$message("注册成功");
          _that.$router.push("/home");
        },
        error: function (err) {
          let errorData = JSON.parse(err.data);
          if (errorData.error === "duplicate_unique_property_exists") {
            _that.$message("用户已存在！");
          } else if (errorData.error === "illegal_argument") {
            if (errorData.error_description === "USERNAME_TOO_LONG") {
              _that.$message("用户名超过64个字节");
            } else {
              _that.$message("用户名不合法！");
            }
          } else if (errorData.error === "unauthorized") {
            _that.$message("注册失败，无权限！");
          } else if (errorData.error === "resource_limited") {
            _that.$message("您的App用户注册数量已达上限,请升级至企业版！");
          }
        },
      };
      publive.registerUser(options);
    },
    tologlin() {
      this.$router.push("/home");
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
  height: 350px;
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