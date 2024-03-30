<template>
  <v-text-field
    v-model="fieldValue"
    :append-inner-icon="mdiCurrencyEur"
    :label="label"
    :variant="variant"
    :disabled="disabled"
    :rules="rules"
    placeholder="0,00"
    color="primary"
    @input="onInputChange"
  ></v-text-field>
</template>

<script setup lang="ts">
import { mdiCurrencyEur } from "@mdi/js";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

/**
 * The currently entered price.
 */
const model = defineModel<number | undefined>({ required: true });

/**
 * The model for the input field.
 *
 * This field is just a ref and will only be updated from the field itself and the watcher of the `model`.
 *
 * A computed ref is not used because the parse functions will automatically remove any disallowed chars on change.
 * This causes the `model`s value to not change and therefore, the computed not to be updated, which leads to the problem
 * that disallowed chars are not removed anymore.
 */
const fieldValue = ref<string | undefined>();

/**
 * Watches the model to update `fieldValue`.
 */
watch(model, () => updateFieldValue(), { immediate: true });

/**
 * This component builds an input field for a price with simplified typing experience.
 *
 * The format of the price will always be `x,xx`.
 */
withDefaults(
  defineProps<{
    /**
     * The label of this field.
     */
    label: string;

    /**
     * The variant of this field.
     */
    variant?:
      | "underlined"
      | "outlined"
      | "filled"
      | "solo"
      | "solo-inverted"
      | "solo-filled"
      | "plain";

    /**
     * Whether the input fields should be disabled.
     */
    disabled?: boolean;

    /**
     * The rules to use to validate the password.
     */
    rules: ((password: string) => true | string)[];
  }>(),
  { variant: "outlined" },
);

/**
 * Parses the given string value into a price number value.
 *
 * This function is designed to support typing the price from start to end without caring about the comma
 * by dividing the number value by `100`.
 * This will for example convert the string `12` to `0.12` and `1234` to `12.34`
 *
 * @param value the value to parse
 */
function parsePrice(value?: string): number | undefined {
  if (!value) return undefined;

  // Remove `,` and `.`
  value = value.replace(",", "");
  value = value.replace(".", "");

  // Parse float to remove leading 0s
  const floatVal: number = parseFloat(value);

  if (isNaN(floatVal) || floatVal === 0) {
    return undefined;
  }

  return floatVal / 100;
}

/**
 * Updates the `fieldValue` with the `model`s value.
 *
 * Formats the number value of the `model` into a 2 digit decimal string.
 *
 * Also supports database formats like `12` to be parsed to `12,00` instead of `0,12`.
 */
function updateFieldValue(): void {
  fieldValue.value = model.value
    ? model.value.toLocaleString(i18n.locale.value, {
        minimumFractionDigits: 2,
      })
    : undefined;
}

/**
 * Parses the input on any change to fit the price format.
 */
function onInputChange(): void {
  const modelValue = parsePrice(fieldValue.value);

  if (model.value === modelValue) {
    // The models value did not change, but the field value probably did.
    // Example: Changing 12,00 to 12 will both result in a model value of 12, but in a changed fieldValue
    // If this happens, we need to update the fieldValue here, because the `model` watcher will not be triggered.
    updateFieldValue();
  } else {
    // When the model value changes, the fieldValue will be updated by the watcher
    model.value = modelValue;
  }
}
</script>

<style scoped lang="scss"></style>
