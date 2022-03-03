
<template>
  <div>123</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import axios from 'axios'
onMounted(async () => {
  const res = await axios.get('/api/parsesnapshot')
  console.log(res.data.closure)
})
</script>
