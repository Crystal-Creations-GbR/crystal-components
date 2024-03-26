<template>
  <div
    class="c-navigation-subtitle mb-3 ml-5 text-grey-darken-2 font-weight-bold"
    :class="classes"
  >
    {{ title }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const classes = computed(() => {
  return props.size === "normal"
    ? "text-subtitle-2"
    : props.size === "large"
      ? "text-title"
      : "";
});

/**
 * This component is a subtitle that can be used in navigation lists.
 *
 * Can be used to visually group list-items.
 */
const props = withDefaults(
  defineProps<{
    /**
     * The title.
     */
    title: string;

    /**
     * The size of the subtitle
     */
    size?: "normal" | "large";
  }>(),
  {
    size: "large",
  },
);
</script>

<style lang="scss">
.c-navigation-subtitle {
  &.text-subtitle-2 {
    height: 20px;
  }
  &.text-title {
    height: 25px;
  }
}

.v-list .c-navigation-subtitle:not(:first-child) {
  margin-top: 16px;
}
</style>
