<template>
  <div class="displaywarp">
    <div>
      <el-button type="primary" class="btn" @click="btn1">WebIM</el-button>
      <el-button type="primary" class="btn" @click="btn2">Live interactions</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShenwangHuanxinIndex",
  data() {
    return {};
  },

  mounted() {},

  methods: {
    btn1() {
        this.$router.push('/home')
    },
    btn2(){
        this.$router.push('/publiveVideo')
    }
  },
};
</script>

<style lang="scss" scoped>
.displaywarp {
  width: 1200px;
  height: 500px;
  border: 1px solid #ccc;
  margin: 0 auto;
  margin-top: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    width: 200px;
    height: 50px;
  }
}
</style>