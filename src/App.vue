<template>
  <div id="app">
    <Top />
    <keep-alive>
    <index />
    </keep-alive>
  </div>
</template>

<script>
import Top from './components/Top.vue'
import index from './components/index.vue';
export default {
  name: 'app',
  components: {
    Top,
    index
  },

};
</script>

<style >

</style>
