<script setup lang="ts">
import type { InputType } from '@/types/ui'
import inputTheme from '@/themes/input'

const props = withDefaults(defineProps<{
  modelValue?: string
  type?: InputType
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  id?: string
  ui?: {
    root?: string
    label?: string
    input?: string
    helper?: string
    error?: string
  }
}>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = computed<string>(() => props.id ?? `input-${Math.random().toString(36).slice(2, 7)}`)
const descId = computed<string>(() => `${inputId.value}-desc`)
const hasError = computed<boolean>(() => !!props.errorMessage)

const classes = computed(() => inputTheme({ hasError: hasError.value, disabled: props.disabled }))

function handleInput(event: Event): void {
  const target = event.target
  if (target instanceof HTMLInputElement) {
    emit('update:modelValue', target.value)
  }
}
</script>

<template>
  <div :class="classes.root({ class: props.ui?.root })">
    <label
      v-if="label"
      :for="inputId"
      :class="classes.label({ class: props.ui?.label })"
    >
      {{ label }}
      <span v-if="required" class="ml-0.5 text-red-500">*</span>
    </label>

    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-invalid="hasError"
      :aria-describedby="(hasError || helperText) ? descId : undefined"
      :class="classes.input({ class: props.ui?.input })"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />

    <p v-if="hasError" :id="descId" :class="classes.error({ class: props.ui?.error })">
      {{ errorMessage }}
    </p>
    <p v-else-if="helperText" :id="descId" :class="classes.helper({ class: props.ui?.helper })">
      {{ helperText }}
    </p>
  </div>
</template>
