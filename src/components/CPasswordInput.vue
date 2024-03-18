<template>
  <div>
    <v-text-field
      v-model="model"
      color="primary"
      :label="i18n.t('crystal_components.password-input.labels.password')"
      :type="showPassword ? 'text' : 'password'"
      variant="outlined"
      :rules="[rules]"
      :disabled="disabled"
      :autocomplete="autocomplete"
    ></v-text-field>

    <v-checkbox
      v-model="showPassword"
      :label="i18n.t('crystal_components.password-input.labels.show_password')"
      :disabled="disabled"
      color="primary"
      class="show-password-checkbox"
      hide-details
    ></v-checkbox>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

/**
 * The currently entered password.
 */
const model = defineModel<string | undefined>({ required: true });

/**
 * This component contains a password input field as well as "show password"-checkbox.
 */
const props = withDefaults(
  defineProps<{
    /**
     * Whether the input fields should be disabled.
     */
    disabled?: boolean;

    /**
     * Whether the password is new or the current password. Used to enable autocomplete.
     */
    type: "current-password" | "new-password";

    /**
     * The rules to use to validate the password.
     */
    rules: (password: string) => true | string;
  }>(),
  {
    disabled: false,
  },
);

/**
 * Determines the autocomplete based on the type.
 */
const autocomplete = computed(() => {
  switch (props.type) {
    case "new-password":
      return "new-password";
    case "current-password":
      return "current-password";
    default:
      return "off";
  }
});

/**
 * Whether the password should be shown.
 */
const showPassword = ref<boolean>(false);
</script>

<style lang="scss">
.show-password-checkbox {
  .v-selection-control {
    min-height: 0 !important;
  }
}
</style>
