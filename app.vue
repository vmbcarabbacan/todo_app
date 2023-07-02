<template>
  <v-app class="main">
    <v-main>
      <NuxtPage />
    </v-main>
      <Floated />
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useStore } from 'vuex'

  onMounted(() => {
    const store = useStore()

    store.dispatch('LOAD')
  })
</script>

<style>
  .v-footer {
    justify-content: right;
  }

  .main {
    background: rgb(23,238,11);
background: linear-gradient(180deg, rgba(23,238,11,1) 0%, rgba(9,121,118,1) 61%, rgba(9,9,121,1) 100%);
  }
</style>