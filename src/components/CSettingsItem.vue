<template>
  <v-list-item
    :prepend-icon="prependIcon"
    :append-icon="clickable ? mdiChevronRight : undefined"
    :ripple="clickable"
    min-height="64"
    class="px-md-8 px-5"
    @click="emit('click')"
  >
    <div class="d-flex" :class="clickable ? '' : 'chevron-placeholder'">
      <div class="flex-grow-1">
        <!-- Label and value -->
        <v-row no-gutters>
          <v-col
            v-if="label"
            :sm="labelColumns"
            cols="12"
            class="d-flex align-center text-subtitle-2 text-grey-darken-1 mr-2"
          >
            <p>{{ label }}</p>
          </v-col>
          <v-col class="d-flex align-center">
            <p v-if="value">{{ value }}</p>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
import { mdiChevronRight } from "@mdi/js";

/**
 * This component displays a list-item to display and manage settings.
 */
withDefaults(
  defineProps<{
    /**
     * The label of this settings item.
     */
    label?: string;

    /**
     * The grid-columns to use for the label column.
     */
    labelColumns?: number;

    /**
     * The current set value of this option.
     */
    value?: string | null;

    /**
     * The prepend-icon of this item.
     */
    prependIcon?: string;

    /**
     * Whether this settings item is clickable.
     *
     * Will show a chevron on the right side and emit the `click` event on click.
     */
    clickable?: boolean;
  }>(),
  {
    label: undefined,
    labelColumns: 3,
    prependIcon: undefined,
    value: null,
    clickable: false,
  },
);

const emit = defineEmits<{
  /**
   * Event emitted when the user clicks on this list-item.
   */
  (e: "click"): void;
}>();
</script>

<style scoped lang="scss">
.chevron-placeholder {
  padding-right: 56px;
}
</style>
