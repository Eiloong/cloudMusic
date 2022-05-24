<template>
  <div id="app">
    <Top />
    <Index />
  </div>
</template>

<script>
import Top from './components/Top'
import Index from './components/Index.vue'
export default {
  components: { Top, Index },
  created() {
    // 空格暂停
    window.addEventListener('keyup', (event) => {
      // 32 空格
      if (event.ctrlKey) {
        if (event.keyCode == 32 || event.code == 'Space') {
          this.$Bus.$emit('toggle')
          e.preventDefault()
          e.stopPropagation()
          return false
        }
      }
    })
  },
}
</script>

<style></style>
