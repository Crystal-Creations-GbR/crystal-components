<template>
  <v-menu :target="buttonGroup">
    <template #activator="{ props: activatorProps }">
      <v-btn-group
        ref="buttonGroup"
        block
        :color="color"
        :variant="variant"
        :density="density"
        rounded="xl"
      >
        <v-btn
          :to="primaryButton.to"
          :disabled="disabled || loading"
          :loading="loading"
          @click="primaryButton.onClick"
        >
          {{ primaryButton.label }}
        </v-btn>

        <v-btn
          v-bind="activatorProps"
          :icon="mdiChevronDown"
          :disabled="disabled || loading"
          class="pr-1 pl-0"
          style="min-width: 35px; margin-left: 2px"
        >
        </v-btn>
      </v-btn-group>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(button, i) of additionalButtons"
        :key="i"
        :to="button.to"
        :disabled="disabled || loading"
        @click="button.onClick"
      >
        <v-list-item-title> {{ button.label }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiChevronDown } from "@mdi/js";
import type { RouteLocationRaw } from "vue-router";
import { computed, ref } from "vue";

/**
 * This ref is used to attach the menu to the whole button group.
 */
const buttonGroup = ref();

/**
 * Data of a button to display.
 */
type ButtonData = {
  /**
   * The key of this button.
   *
   * This key should be unique since it is used to decide which button will be the primary button.
   */
  key: string;

  /**
   * The label of this button.
   */
  label: string;

  /**
   * Emitted when the user clicks on this button.
   */
  onClick?: () => {};

  /**
   * Denotes the target route of the link. You can find more information about the `to` prop on the vue-router documentation.
   */
  to?: RouteLocationRaw;
};

/**
 * This component builds a button group with a default button and an arrow to reveal more options as alternatives to the default button.
 */
const props = withDefaults(
  defineProps<{
    /**
     * Available buttons.
     *
     * Use `primaryButton` with the buttons key to decide which button will be chosen to be the primary button.
     */
    buttons: ButtonData[];

    /**
     * The key of the primary button to use.
     *
     * If the key does not exist, the first button will be used.
     */
    primaryButton: string;

    /**
     * Applies specified color to the button - supports utility colors (for example `success` or `purple`) or css color (#033 or rgba(255, 0, 0, 0.5)).
     */
    color?: string;

    /**
     * Applies a distinct style to the component.
     */
    variant?: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";

    /**
     * Adjusts the vertical height used by the component.
     */
    density?: "default" | "comfortable" | "compact";

    /**
     * Whether this button should be loading or not.
     */
    loading?: boolean;

    /**
     * Whether this button should be disabled or not.
     */
    disabled?: boolean;
  }>(),
  {
    color: "primary",
    variant: "tonal",
    density: "default",
  },
);

/**
 * Computes the primary button in the list of buttons.
 */
const primaryButton = computed<ButtonData>(() => {
  const primary = props.buttons.find(
    (button) => button.key === props.primaryButton,
  );

  return primary ?? props.buttons[0];
});

/**
 * Computes the additional buttons to show in the popup menu.
 */
const additionalButtons = computed<ButtonData[]>(() => {
  const primary = primaryButton.value;

  return props.buttons.filter((button) => button.key !== primary.key);
});
</script>

<style scoped lang="scss"></style>
