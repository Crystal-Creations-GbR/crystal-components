<!--
Copyright (c) 2024 by Crystal Creations GbR and Johannes Huther

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 -->
<template>
  <v-list
    :base-color="baseColor"
    :color="color"
    :variant="variant"
    class="c-list-item-group"
  >
    <slot></slot>
  </v-list>
</template>

<script lang="ts"></script>

<script setup lang="ts">
/**
 * A component to create a group of vuetify list-items.
 *
 * The `v-list-item`s can be provided by the default slot.
 */
defineProps<{
  /**
   * The base color of the list-items.
   *
   * @see https://vuetifyjs.com/en/api/v-list/#props-base-color
   */
  baseColor: string;

  /**
   * The color of the list-items when active.
   *
   * @see https://vuetifyjs.com/en/api/v-list-item/#props-color
   */
  color: string;

  /**
   * The variant of the list-items.
   *
   * @see https://vuetifyjs.com/en/api/v-list-item/#props-variant
   */
  variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
}>();
</script>

<style lang="scss">
.c-list-item-group {
  .v-list-item__prepend .v-list-item__spacer {
    width: 16px !important;
  }

  .v-list-item {
    &:first-child {
      border-top-left-radius: 24px !important;
      border-top-right-radius: 24px !important;
    }
    &:last-child {
      border-bottom-left-radius: 24px !important;
      border-bottom-right-radius: 24px !important;
    }
    &:not(:last-child) {
      margin-bottom: 3px;
    }
  }
}
</style>
