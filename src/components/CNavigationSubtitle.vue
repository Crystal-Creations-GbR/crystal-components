<template>
  <h4 class="c-navigation-subtitle mb-3 ml-5 text-grey-darken-2">
    {{ title }}
  </h4>
</template>

<script setup lang="ts">
/**
 * This component is a subtitle that can be used in navigation lists.
 *
 * Can be used to visually group list-items.
 */
defineProps<{
  /**
   * The title.
   */
  title: string;
}>();
</script>

<style lang="scss">
.v-list .c-navigation-subtitle:not(:first-child) {
  margin-top: 16px;
}
</style>
