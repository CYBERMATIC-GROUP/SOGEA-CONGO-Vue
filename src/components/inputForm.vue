<template>
  <div class="w-full">
    <div>
      <label
        :for="id"
        :class="[
          'mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500',
          !cacher ? 'after:content-[\'*\']' : '',
        ]"
        >{{ label }}</label
      >
      <input
        v-if="type != 'select'"
        :type="type"
        :id="id"
        :readonly="readonly"
        :value="modelValue"
        v-on:input="
          $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
        "
        :class="[
          type == 'file'
            ? 'block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
            : 'block outline-none border  px-2 py-1 w-full rounded-md  shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
          valid
            ? 'border-red-color  focus:border-red-color'
            : 'border-secondary-500 border-[#737272] focus:border-bg-primary',
          readonly &&
            'bg-[#F5F6FA] border border-gray-200 focus:border-gray-200',
          uppercase && ' uppercase',
        ]"
        :placeholder="placeholder"
      />
      <select
        v-else
        :value="modelValue"
        :disabled="readonly"
        v-on:input="
          $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
        "
        :id="id"
        :class="[
          'block   outline-none border px-2 py-1 w-full rounded-md  shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
          valid
            ? 'border-red-color focus:border-red-color'
            : 'border-[#737272] focus:border-bg-secondary',
        ]"
      >
        <option value="">{{ labelDefaut }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  placeholder,
  id,
  labelDefaut,
  label,
  inputType,
  type,
  options,
  imageSrc,
  readonly,
  modelValue,
  valid,
  uppercase,
  cacher,
} = defineProps([
  "id",
  "placeholder",
  "labelDefaut",
  "label",
  "inputType",
  "type",
  "options",
  "imageSrc",
  "readonly",
  "modelValue",
  "valid",
  "uppercase",
  "cacher",
]);
</script>
