<template>
  <v-list-item
    :prepend-icon="prependIcon"
    :append-icon="clickable ? mdiChevronRight : undefined"
    :ripple="clickable || type === 'switch'"
    :to="to"
    min-height="64"
    class="px-md-8 px-5"
    @click="click"
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

    <template v-if="type === 'switch'" #append>
      <v-switch v-model="managedValue" color="primary" hide-details></v-switch>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { mdiChevronRight } from "@mdi/js";
import { RouteLocationRaw } from "vue-router";

/**
 * The managed value is a value which will be managed by the settings item itself.
 *
 * It will be changed accordingly for some types like the `switch`.
 */
const managedValue = defineModel<boolean>();

/**
 * This component displays a list-item to display and manage settings.
 */
const props = withDefaults(
  defineProps<{
    /**
     * The type of this settings-item.
     *
     * Changes the behaviour of this item. If a type is used, that adds input-like functionality (like a switch),
     * the `managedValue` as the input-value.
     */
    type?: "default" | "switch";

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
    value?: string | boolean | null;

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

    /**
     * Denotes the target route of the link. You can find more information about the `to` prop on the vue-router documentation.
     */
    to?: RouteLocationRaw;
  }>(),
  {
    type: "default",
    label: undefined,
    labelColumns: 3,
    prependIcon: undefined,
    value: null,
    clickable: false,
    to: undefined,
  },
);

const emit = defineEmits<{
  /**
   * Event emitted when the user clicks on this list-item.
   */
  (e: "click"): void;
}>();

/**
 * Emits the click-event and changes the `managedValue`, if required.
 */
function click() {
  if (props.type === "switch") {
    managedValue.value = !managedValue.value;
  }

  // Emit event
  emit("click");
}
</script>

<style scoped lang="scss">
.chevron-placeholder {
  padding-right: 56px;
}
</style>
