<template>
  <v-navigation-drawer
    v-model="showDrawer"
    :rail="rail"
    rail-width="72"
    mobile-breakpoint="md"
    class="c-navigation-drawer rounded-xl"
  >
    <div class="d-flex flex-column" style="height: 100%">
      <!-- Branding -->
      <v-list v-if="slots['branding']" nav class="my-3">
        <slot name="branding"></slot>
      </v-list>

      <div
        class="d-flex flex-column overflow-x-hidden overflow-y-auto"
        style="height: 100%"
      >
        <div class="c-navigation-drawer-items flex-grow-1">
          <!-- Navigation Items -->
          <slot></slot>
        </div>

        <!-- Footer -->
        <v-fade-transition>
          <div v-if="slots['footer'] && !rail" class="my-3 text-no-wrap">
            <slot name="footer"></slot>
          </div>
        </v-fade-transition>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, useSlots, watch } from "vue";
import { useDisplay } from "vuetify";

const slots = useSlots();
const { smAndDown } = useDisplay();

/**
 * The model, whether the navigation drawer should be expanded or not.
 */
const drawer = defineModel<boolean>({ required: true });

/**
 * Watches the {@link drawer} to update {@link showDrawer} and {@link rail}.
 */
watch(drawer, () => {
  if (smAndDown.value) {
    showDrawer.value = drawer.value;
    rail.value = false;
  } else {
    rail.value = !drawer.value;
  }
});

/**
 * The model of the navigation drawer.
 */
const showDrawer = ref<boolean>(drawer.value);

/**
 * Watches the {@link showDrawer} to sync the value to this components model {@link drawer}.
 */
watch(showDrawer, () => {
  drawer.value = showDrawer.value;
});

/**
 * Whether the navigation drawer should be in rail mode or not.
 */
const rail = ref<boolean>(false);
</script>

<style lang="scss">
.c-navigation-drawer {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;

  .c-navigation-drawer-items {
    .v-list-item {
      border-radius: 24px;

      .v-list-item__prepend .v-list-item__spacer {
        width: 16px !important;
      }

      .v-list-item__prepend {
        margin-left: 8px;
      }
    }
  }
}
</style>
