<template>
  <v-card
    rounded="xl"
    elevation="0"
    border
    :width="width"
    :max-width="maxWidth"
    class="c-card pt-6 pt-md-8"
    :class="
      slots['content-full-width'] ||
      slots['actions'] ||
      slots['prepend-actions']
        ? ''
        : 'pb-6 pb-md-8'
    "
    :loading="loading"
  >
    <template #loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="primary"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <div class="c-card-sections">
      <v-card-title
        v-if="title"
        class="pt-0 pb-0 px-6 px-md-8 text-h6"
        :class="titleClass"
      >
        {{ title }}
      </v-card-title>

      <v-card-subtitle
        v-if="subtitle"
        class="c-card-subtitle px-6 px-md-8 text-wrap"
      >
        {{ subtitle }}
      </v-card-subtitle>

      <!-- Content -->
      <div v-if="slots['default']" class="px-6 px-md-8">
        <slot></slot>
      </div>

      <!-- Full Width Content -->
      <div v-if="slots['content-full-width']">
        <slot name="content-full-width" :padding="'px-6 px-md-8'"></slot>
      </div>

      <v-card-actions
        v-if="slots['actions'] || slots['prepend-actions']"
        class="mt-2 mb-3 px-3 px-md-6 d-flex"
      >
        <slot name="prepend-actions"></slot>
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

const slots = useSlots();

/**
 * This component is a wrapper for vuetify card
 * following the material design 3 specifications.
 *
 * @see https://m3.material.io/components/cards/overview
 */
const props = withDefaults(
  defineProps<{
    /**
     * The title of the card.
     */
    title?: string;

    /**
     * The position of the title.
     */
    titlePosition?: "center" | "left" | "right";

    /**
     * The size of the title.
     */
    titleSize?: "normal" | "large";

    /**
     * The subtitle of the card.
     */
    subtitle?: string;

    /**
     * The width of the card.
     */
    width?: string;

    /**
     * The max width of the card.
     */
    maxWidth?: string;

    /**
     * Whether the loading bar should be shown or not.
     */
    loading?: boolean;
  }>(),
  {
    title: undefined,
    titlePosition: "left",
    titleSize: "normal",
    subtitle: undefined,
    width: "100%",
    maxWidth: "850px",
  },
);

/**
 * Computes the classes for the title component.
 */
const titleClass = computed<string>(() => {
  let classes = "text-" + props.titlePosition;

  if (props.titleSize && props.titleSize !== "normal")
    classes += " " + props.titleSize;

  return classes;
});
</script>

<style scoped lang="scss">
@import "vuetify/lib/styles/settings/variables";

.c-card {
  .c-card-sections > * {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  .v-card-title.large {
    line-height: normal;

    @media (max-width: map-get($grid-breakpoints, "md")) {
      font-size: 26px !important;
    }

    @media (min-width: map-get($grid-breakpoints, "md")) {
      font-size: 30px !important;
    }
  }
}
</style>
