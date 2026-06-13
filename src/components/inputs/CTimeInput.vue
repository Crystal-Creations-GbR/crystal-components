<template>
  <v-text-field
    ref="inputField"
    v-model="fieldValue"
    :prepend-inner-icon="mdiClockOutline"
    :label="label"
    :variant="variant"
    :density="density"
    :disabled="disabled"
    :hide-details="hideDetails"
    :rules="rules"
    placeholder="00:00"
    color="primary"
    @input="onInputChange"
    @focus="onFocus"
    @click="onFocus"
    @keydown="onKeydown"
  >
    <template v-if="slots['append-inner'] || isNextDay" #append-inner>
      <slot name="append-inner">
        <div
          v-if="isNextDay"
          class="font-weight-bold position-absolute text-caption"
          style="top: 5px; right: 5px"
        >
          +1 {{ i18n.t("crystal_components.common.labels.day") }}
        </div>
      </slot>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { mdiClockOutline } from "@mdi/js";
import { ref, watch, nextTick, useSlots } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const slots = useSlots();

/**
 * The currently entered time.
 *
 * Does only support 24-hour format at the moment.
 */
const model = defineModel<string | undefined>({ required: true });

/**
 * The model for the input field.
 */
const fieldValue = ref<string | undefined>("00:00");

/**
 * Reference to the input field element, which should be of type HTMLInputElement.
 *
 * This allows us to use methods like setSelectionRange and access properties like selectionStart.
 */
const inputField = ref<HTMLInputElement | null>(null);

/**
 * This component builds an input field for time with simplified typing experience and without a time picker popup.
 *
 * The format of the time will always be `xx:xx`.
 *
 * Caution: Does only support 24-hour format at the moment.
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
     * Adjusts the vertical height used by the component.
     */
    density?: "default" | "comfortable" | "compact";

    /**
     * Whether the input fields should be disabled.
     */
    disabled?: boolean;

    /**
     * Hides hint and validation errors. When set to auto messages will be rendered only if there’s a message (hint, error message, counter value etc) to display.
     */
    hideDetails?: boolean | "auto";

    /**
     * The rules to use to validate the password.
     */
    rules?: ((password: string) => true | string)[];

    /**
     * Whether this time is for the following day. Adds a "+1 day" in the top right corner of the input field.
     */
    isNextDay?: boolean;
  }>(),
  {
    variant: "outlined",
    density: "default",
    hideDetails: false,
    rules: undefined,
  },
);

/**
 * Watches the model to update `fieldValue`.
 */
watch(model, () => updateFieldValue(), { immediate: true });

/**
 * Parses the given string value into a valid time string in the format HH:MM.
 *
 * This function also validates that the hours are between 00 and 23 and the minutes between 00 and 59.
 *
 * @param value the value to parse
 */
function parseTime(value?: string): string | undefined {
  if (!value) return "00:00";

  // Remove `:`
  value = value.replace(":", "");

  // Ensure the value is numeric
  if (isNaN(parseInt(value))) {
    return undefined;
  }

  // If the length is 1 or 2, assume it's just the hour and add ":00"
  if (value.length <= 2) {
    const hours = value.padStart(2, "0");
    if (parseInt(hours) > 23) return undefined;
    return hours + ":00";
  }

  // If the length is 3 or 4, assume it's the hour and minute
  if (value.length === 3 || value.length === 4) {
    const hours = value.slice(0, -2).padStart(2, "0");
    const minutes = value.slice(-2).padEnd(2, "0");
    if (parseInt(hours) > 23 || parseInt(minutes) > 59) return undefined;
    return hours + ":" + minutes;
  }

  // Any other length is invalid
  return undefined;
}

/**
 * Updates the `fieldValue` with the `model`s value.
 *
 * Formats the string value of the `model` into a `HH:MM` format.
 *
 * Also supports values like `12` to be parsed to `12:00`.
 */
function updateFieldValue(): void {
  fieldValue.value = model.value ? parseTime(model.value) : "00:00";
}

/**
 * Handles focus and click event to ensure the field is never empty and selects the first digit.
 */
function onFocus(): void {
  if (!fieldValue.value) {
    fieldValue.value = "00:00";
  }

  // Ensure that a digit is always selected
  nextTick(() => {
    if (inputField.value) {
      inputField.value.setSelectionRange(0, 1);
    }
  });
}

/**
 * Handles keydown events to prevent non-numeric input and manage backspace behavior.
 */
function onKeydown(event: KeyboardEvent): void {
  // Get the current cursor position
  let cursorPosition = inputField.value?.selectionStart || 0;

  // Handle left and right arrow keys
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    if (cursorPosition > 0) {
      cursorPosition -= 1;
      if (cursorPosition === 2) {
        cursorPosition -= 1; // Skip the colon
      }
      nextTick(() => {
        if (inputField.value) {
          inputField.value.setSelectionRange(
            cursorPosition,
            cursorPosition + 1,
          );
        }
      });
    }
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    if (cursorPosition < 4) {
      cursorPosition += 1;
      if (cursorPosition === 2) {
        cursorPosition += 1; // Skip the colon
      }
      nextTick(() => {
        if (inputField.value) {
          inputField.value.setSelectionRange(
            cursorPosition,
            cursorPosition + 1,
          );
        }
      });
    }
  } else if (!/[0-9]|Backspace/.test(event.key)) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    handleBackspace();
  }
}

/**
 * Handles the backspace functionality, setting the current position to '0' and moving the cursor left.
 */
function handleBackspace(): void {
  let cursorPosition = inputField.value?.selectionStart || 0;
  let value = fieldValue.value?.replace(":", "") || "0000";

  // Adjust cursor position to account for the colon
  if (cursorPosition > 2) {
    cursorPosition -= 1;
  }

  // Get current digit at cursor
  const currentDigit = value.at(cursorPosition);

  let indexToClear = cursorPosition;

  if (cursorPosition > 0 && (!currentDigit || currentDigit === "0")) {
    // If digit at this position is 0, we remove the digit to the left and move the cursor
    indexToClear = cursorPosition - 1;
  } // Else if digit at this position is not 0, we remove this one and don't move the cursor

  // Clear the digit and replace it with '0'
  value = value.slice(0, indexToClear) + "0" + value.slice(indexToClear + 1);

  // Reinsert the colon
  fieldValue.value = `${value.slice(0, 2)}:${value.slice(2)}`;

  // Move the cursor to the left after backspace
  nextTick(() => {
    let newCursorPos = cursorPosition - 1;
    if (newCursorPos >= 2) {
      newCursorPos += 1; // Adjust for the colon
    }
    newCursorPos = Math.max(0, newCursorPos);
    if (inputField.value && newCursorPos >= 0) {
      inputField.value.setSelectionRange(newCursorPos, newCursorPos + 1);
    }
  });
}

/**
 * Parses the input on any change to fit the time format and manage cursor position.
 */
function onInputChange(): void {
  const cursorPosition = inputField.value?.selectionStart || 0;
  const parsedValue = parseTime(fieldValue.value);

  if (parsedValue === undefined) {
    // Invalid input, revert to the current model value
    updateFieldValue();
    // Move cursor back to the initial position after invalid input
    nextTick(() => {
      inputField.value?.setSelectionRange(cursorPosition - 1, cursorPosition);
    });
    return;
  }

  // Update the model value and fieldValue
  model.value = parsedValue;
  updateFieldValue(); // Update the fieldValue to reflect the new model value

  // Move the cursor to the next digit after input
  nextTick(() => {
    if (inputField.value) {
      if (cursorPosition < 2) {
        inputField.value.setSelectionRange(1, 2);
      } else if (cursorPosition === 2) {
        inputField.value.setSelectionRange(3, 4);
      } else if (cursorPosition === 4) {
        inputField.value.setSelectionRange(4, 5);
      } else {
        // Unfocus the field when the last digit is entered
        inputField.value.blur();
      }
    }
  });
}
</script>

<style scoped lang="scss"></style>
