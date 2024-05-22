<template>
  <v-dialog
    v-model="model"
    :width="fullscreen ? undefined : width"
    :min-width="minWidth"
    :height="height"
    :persistent="persistent"
    :fullscreen="fullscreen"
    :activator="activator"
    :class="fullscreen ? '' : 'ma-2'"
    class="c-dialog"
    scrollable
  >
    <template v-if="slots['activator']" #activator="{ props }">
      <slot name="activator" :props="props"></slot>
    </template>

    <c-card
      :title="title"
      :title-size="titleSize"
      :subtitle="subtitle"
      :loading="loading"
      :color="color"
      :closable="closeButton"
      :mode="fullscreen ? 'fullscreen' : 'default'"
      :disabled="disabled"
      max-width=""
      @close="model = false"
    >
      <template v-if="slots['content-full-width']" #content-full-width>
        <slot name="content-full-width"></slot>
      </template>

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
import { ComponentPublicInstance, useSlots, watch } from "vue";
import CCard from "../CCard.vue";

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
     * The min width of the dialog.
     */
    minWidth?: string;

    /**
     * The height of the dialog
     */
    height?: string;

    /**
     * Whether clicking outside the element or pressing esc key will close the dialog.
     */
    persistent?: boolean;

    /**
     * Changes layout for fullscreen display.
     */
    fullscreen?: boolean;

    /**
     * Whether the loading bar should be shown or not.
     */
    loading?: boolean;

    /**
     * Applies specified color to the card - supports utility colors (for example `success` or `purple`) or css color (#033 or rgba(255, 0, 0, 0.5)).
     */
    color?: string;

    /**
     * If true, a close button will be added to the top right of the card which closes the dialog.
     */
    closeButton?: boolean;

    /**
     * Explicitly sets the overlay’s activator.
     *
     * For more information, see https://vuetifyjs.com/en/api/v-dialog/.
     */
    activator?: Element | "parent" | (string & {}) | ComponentPublicInstance;

    /**
     * Removes the ability to click or target the component.
     *
     * This also disables all buttons including the close-button, if shown.
     */
    disabled?: boolean;
  }>(),
  {
    title: undefined,
    titleSize: "large",
    subtitle: undefined,
    width: "500px",
    maxWidth: undefined,
    height: undefined,
    minWidth: undefined,
    persistent: false,
    color: undefined,
    activator: undefined,
  },
);

/**
 * Watches the model to emit the `close` event when the model changes to `false`.
 */
watch(model, () => {
  if (!model.value) emit("close");
});

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
