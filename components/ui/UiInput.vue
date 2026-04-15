<script setup lang="ts">
import type { InputType } from '@/types/ui'

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
const hasError = computed<boolean>(() => !!props.errorMessage)

function handleInput(event: Event): void {
  const target = event.target
  if (target instanceof HTMLInputElement) {
    emit('update:modelValue', target.value)
  }
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      v-if="label"
      :for="inputId"
      class="text-sm font-medium text-slate-700"
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
      :class="[
        'w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none',
        'transition-colors duration-150 placeholder:text-slate-400',
        'focus:ring-2 focus:ring-offset-0',
        hasError
          ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
          : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-100',
        disabled ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-white',
      ]"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />

    <p v-if="hasError" class="text-xs text-red-500">{{ errorMessage }}</p>
    <p v-else-if="helperText" class="text-xs text-slate-500">{{ helperText }}</p>
  </div>
</template>
