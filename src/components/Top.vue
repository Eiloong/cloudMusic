<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input type="text"
          v-model="inputValue"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          @keyup.enter="toSearch"
        >
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Top',
    data() {
      return {
        inputValue: ''
      }
    },
    methods: {
      toSearch() {
        if(this.inputValue == '') return this.$message('waning', '请输入内容')
        this.$router.push('/result?wd='+this.inputValue)
        // if (inputValue === '') {
        //   this.$message('waning', '请输入内容')
        // } else {
        //   this.$router.push('/result?q='+this.inputValue)
        // }
        // this.inputValue = ''
        // console.log(inputValue);
      },
    },
  }
</script>

<style scoped></style>
