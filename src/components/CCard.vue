<template>
  <v-card
    :rounded="mode === 'fullscreen' ? false : 'xl'"
    elevation="0"
    border
    :height="height"
    :width="width"
    :max-width="maxWidth"
    class="c-card pt-6 pt-md-8 d-flex flex-column"
    :class="cardClass"
    :loading="loading"
    :color="color"
    :disabled="disabled"
  >
    <template #loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="primary"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title
      v-if="title || slots['title-append'] || closable"
      class="pt-0 pb-0 px-6 px-md-8 text-h6 d-flex align-center"
      :class="vTitleClass"
    >
      <!-- Placeholder to make sure the title is centered if the closable icon is visible -->
      <div
        v-if="closable && titlePosition === 'center'"
        class="mr-2"
        style="width: 48px"
      ></div>

      <div
        v-if="title || slots['title-append']"
        class="d-flex align-center w-100"
        :class="titleClass"
      >
        <div v-if="title" :class="wrapTitle ? '' : 'text-truncate'">
          {{ title }}
        </div>

        <slot name="title-append"> </slot>
      </div>

      <template v-if="closable">
        <!-- Placeholder -->
        <div style="width: 48px" class="ml-2"></div>

        <!-- Close button -->
        <v-btn
          :icon="mdiWindowClose"
          variant="text"
          color="on-surface"
          class="position-absolute"
          style="right: 20px"
          @click="emit('close')"
        ></v-btn>
      </template>
    </v-card-title>

    <v-card-subtitle
      v-if="subtitle"
      class="c-card-subtitle px-6 px-md-8 text-wrap mb-3"
      style="white-space: pre-line !important"
    >
      {{ subtitle }}
    </v-card-subtitle>

    <div v-if="slots['header']" :class="hasTabsHeader ? '' : 'mb-3'">
      <slot name="header" :padding="'px-6 px-md-8'"></slot>
    </div>

    <v-divider
      v-if="
        (scrollingEnabled || hasTabsHeader) &&
        (title || subtitle || slots['header'])
      "
      class="mb-0"
    ></v-divider>

    <v-card-text
      ref="cardTextComponent"
      class="ma-0 px-0"
      :class="
        scrollingContentVerticalPadding && scrollingEnabled
          ? 'pt-4 pb-0'
          : 'py-0'
      "
      :style="forceScroll ? 'overflow-y: scroll' : 'overflow-y: auto'"
    >
      <!-- Content -->
      <div v-if="slots['default']" class="px-6 px-md-8">
        <slot></slot>
      </div>

      <!-- Full Width Content -->
      <div v-if="slots['content-full-width']">
        <slot name="content-full-width" :padding="'px-6 px-md-8'"></slot>
      </div>
    </v-card-text>

    <v-divider
      v-if="scrollingEnabled && (slots['actions'] || slots['prepend-actions'])"
      class="ma-0"
    ></v-divider>

    <v-card-actions
      v-if="slots['actions'] || slots['prepend-actions']"
      class="mb-3 px-2 px-md-6 d-flex flex-wrap justify-space-between"
    >
      <div v-if="slots['prepend-actions']">
        <slot name="prepend-actions"></slot>
      </div>

      <div
        v-if="slots['actions']"
        class="d-flex justify-end flex-grow-1 flex-wrap align-end"
      >
        <slot name="actions"></slot>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useSlots } from "vue";
import { VCardText } from "vuetify/components";
import { mdiWindowClose } from "@mdi/js";

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
    titlePosition?: "center" | "start" | "end";

    /**
     * The size of the title.
     */
    titleSize?: "normal" | "large";

    /**
     * Whether the title should wrap.
     */
    wrapTitle?: boolean;

    /**
     * The subtitle of the card.
     */
    subtitle?: string;

    /**
     * The mode how this `CCard` is used.
     */
    mode?: "default" | "bottom-sheet" | "fullscreen";

    /**
     * Whether vertical padding should be applied to the content inside the card when the content is scrollable.
     *
     * Defaults to `true`.
     */
    scrollingContentVerticalPadding?: boolean;

    /**
     * The height of the card.
     */
    height?: string;

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

    /**
     * If true, the card will always be in scrollable mode.
     *
     * This adds the dividers and always shows the scroll bar.
     */
    forceScroll?: boolean;

    /**
     * Applies specified color to the card - supports utility colors (for example `success` or `purple`) or css color (#033 or rgba(255, 0, 0, 0.5)).
     */
    color?: string;

    /**
     * If true, a close button will be added to the top right of the card.
     *
     * If this button is clicked, the `close` event is emitted.
     */
    closable?: boolean;

    /**
     * Removes the ability to click or target the component.
     *
     * This also disables all buttons including the close-button, if shown.
     */
    disabled?: boolean;

    /**
     * Whether this card has tabs in the header.
     *
     * Will always display the divider and remove the padding to it.
     */
    hasTabsHeader?: boolean;
  }>(),
  {
    title: undefined,
    titlePosition: "start",
    titleSize: "normal",
    wrapTitle: undefined,
    subtitle: undefined,
    mode: "default",
    scrollingContentVerticalPadding: true,
    height: undefined,
    width: "100%",
    maxWidth: "850px",
    color: undefined,
  },
);

/**
 * The reference to the `v-card-text` component.
 */
const cardTextComponent = ref<VCardText>();

const cardClass = computed<string>(() => {
  let classes = "";

  if (props.mode === "bottom-sheet")
    classes += " c-card--variant--bottom-sheet";

  if (
    !contentScrollable.value &&
    !slots["content-full-width"] &&
    !slots.actions &&
    !slots["prepend-actions"]
  ) {
    classes += " pb-6 pb-md-8";
  }

  return classes;
});

/**
 * Computes the classes for the v-card-title component.
 */
const vTitleClass = computed<string>(() => {
  let classes = "";

  if (props.titleSize && props.titleSize !== "normal")
    classes += " " + props.titleSize;

  if (props.wrapTitle) classes += " text-wrap";

  // Bottom margin - larger margin if only the title is available
  if (scrollingEnabled.value && !props.subtitle && !slots.header)
    classes += " mb-5 mb-md-7";
  else classes += " mb-3";

  return classes;
});

/**
 * Computes the classes for the title component. (in which the title and title-append are)
 */
const titleClass = computed<string>(() => {
  let classes = "justify-" + props.titlePosition;

  if (!props.wrapTitle) classes += " text-truncate";

  return classes;
});

/**
 * Whether scrolling of the content is currently enabled.
 *
 * Depends on `contentScrollable` or the property `forceScroll` being true.
 */
const scrollingEnabled = computed<boolean>(() => {
  return props.forceScroll || contentScrollable.value;
});

/**
 * Whether the content inside the `v-card-text` component is large enough to scroll
 */
const contentScrollable = ref<boolean>(false);

/**
 * Checks, if the content inside the `v-card-text` is scrollable.
 */
onMounted(() => {
  if (
    cardTextComponent.value &&
    cardTextComponent.value.$el.scrollHeight >
      cardTextComponent.value.$el.clientHeight
  ) {
    contentScrollable.value = true;
  }
});

const emit = defineEmits<{
  /**
   * Event emitted when the close button is clicked.
   */
  (e: "close"): void;
}>();
</script>

<style scoped lang="scss">
@import "vuetify/lib/styles/settings/variables";

.c-card {
  &.c-card--variant--bottom-sheet {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  & > .v-card-text > * {
    &:not(:last-child) {
      margin-bottom: 12px !important;
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

<style lang="scss">
// Apply margin to every element directly in the action divs to make sure there is space between when wrapping
.c-card .v-card-actions > div > * {
  margin: 8px 4px 0;
}
</style>
