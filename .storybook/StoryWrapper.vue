<template>
  <v-app :theme="themeName">
    <slot name="story"></slot>
  </v-app>
</template>

<script setup lang="ts">
defineProps({
  themeName: { type: String, required: true },
});
</script>

<style>
.docs-story {
  .v-application__wrap {
    min-height: fit-content;
  }
}
</style>
