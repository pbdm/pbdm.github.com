<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { renderPosts } from './lib/util';


const props = defineProps({
  path: { type: String, required: true }
})

const content = ref('0')
const created = ref('')
const updated = ref('')


watchEffect(async () => {
  content.value = (await renderPosts(props.path)).content
})


</script>

<template>
  <div class="info">
    创建时间：<span>{{ created }}</span>
    最后修改时间：<span>{{ updated }}</span>
    <a>修改历史</a><a>编辑</a>
  </div>
  <main class="markdown-body"  v-html="content" />
</template>

<style scoped>
:root {
  display: block;
}

a {
  color: #0366d6;
  text-decoration: none;
}

img {
  vertical-align: middle;
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

svg {
  max-width: 100%;
}

.custom-block {
  padding: .1rem 1.5rem;
  border-left-width: .5rem;
  border-left-style: solid;
  margin: 1rem 0;
}

.custom-block p {
  margin: 16px 0 ;
}

.custom-block.tip {
  background-color: #f3f5f7;
  border-color: #42b983;
}
.custom-block.warning {
  background-color: rgba(255,229,100,.3);
  border-color: #e7c000;
  color: #6b5900;
}
.custom-block.danger {
  background-color: #ffe6e6;
  border-color: #c00;
  color: #4d0000;
}

.info {
  color: #bababa;
  font-size: 12px;
  float: right;
}
.info #tags {
  color: #42b983;
}
@media (max-width: 768px) {
  .info {
    display: none;
  }
}
</style>