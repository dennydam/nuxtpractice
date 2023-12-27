<template>
  <div>7877777</div>
  <notifications />
</template>

<script setup lang="ts">
const { $notify }: any = useNuxtApp()

onMounted(() => {
  $notify({
    type: 'success',
    title: 'Notification Title',
    text: 'Notification Text',
  })
})
</script>
