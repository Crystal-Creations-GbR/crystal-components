<template>
  <v-dialog
    v-model="model"
    :width="width"
    :min-width="minWidth"
    :persistent="persistent"
    class="c-dialog ma-2"
    scrollable
    @update:model-value="onUpdate"
  >
    <c-card
      :title="title"
      :title-size="titleSize"
      :subtitle="subtitle"
      :loading="loading"
      :max-width="maxWidth"
      class="mx-auto"
    >
      <template v-if="slots['prepend-actions']" #prepend-actions>
        <slot name="prepend-actions"></slot>
      </template>

      <template v-if="slots['actions']" #actions>
        <slot name="actions"></slot>
      </template>

      <slot></slot>
    </c-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import CCard from "./CCard.vue";

const slots = useSlots();

/**
 * The model, whether the dialog should be shown or not.
 */
const model = defineModel<boolean>({ required: true });

/**
 * This component is a wrapper for the vuetify dialog with a card following the material design 3 specifications.
 *
 * @see https://m3.material.io/components/dialogs/overview
 */
withDefaults(
  defineProps<{
    /**
     * The title of the dialog.
     */
    title?: string;

    /**
     * The size of the title.
     */
    titleSize?: "normal" | "large";

    /**
     * The subtitle of the dialog.
     */
    subtitle?: string;

    /**
     * The width of the dialog
     */
    width?: string;

    /**
     * The max width of the dialog.
     */
    maxWidth?: string;

    /**
     * The min width of the dialog.
     */
    minWidth?: string;

    /**
     * Whether clicking outside the element or pressing esc key will close the dialog.
     */
    persistent?: boolean;

    /**
     * Whether the loading bar should be shown or not.
     */
    loading?: boolean;
  }>(),
  {
    title: undefined,
    titleSize: "large",
    subtitle: undefined,
    width: "500px",
    maxWidth: undefined,
    minWidth: undefined,
    persistent: false,
  },
);

/**
 * Handles the update of the model-value and emits a closed event.
 *
 * @param value the new value.
 */
function onUpdate(value: boolean) {
  if (!value) emit("close");
}

const emit = defineEmits<{
  /**
   * Event that is emitted when the dialog is closed.
   */
  (e: "close"): void;
}>();
</script>

<style lang="scss">
.c-dialog {
  .v-overlay__content {
    margin: 0 !important;
    max-width: 100% !important;
  }
}
</style>
