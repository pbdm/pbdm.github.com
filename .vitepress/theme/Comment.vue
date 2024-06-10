<template>
  <div id="gitalk-container"></div>
</template>
<script lang="ts" setup>
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import { onMounted } from "vue";
const gitalk = new Gitalk({
  clientID: '9ff28fdcfa8dee48ec3b',
  clientSecret: '4dc116a4a8999d27258013f0b29af3ae902d199a',
  repo: 'comment',
  owner: 'pbdm',
  admin: ['pbdm'],
  id: '/INTRO.html',      // Ensure uniqueness and length less than 50
  distractionFreeMode: false  // Facebook-like distraction free mode
});
onMounted(() => {
  gitalk.render("gitalk-container");
});
</script>
<style scoped>
</style>