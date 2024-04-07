<template>
  <div class="relative flex flex-row items-center">
    <input
      :type="type"
      :value="modelValue"
      v-on:input="
        $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
      "
      :class="[
        'peer m-0 block h-[3rem] w-full rounded-md border-2 border-solid  bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent  focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-bg-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]',
        valid
          ? 'border-red-color focus:border-red-color'
          : 'border-secondary-500 focus:border-bg-primary',
        uppercase && 'uppercase',
      ]"
      :placeholder="placeholder"
    />
    <img
      @click="$emit('change-type')"
      class="ml-[-2.5em] cursor-pointer"
      :src="imageSrc"
      alt=""
    />
    <label
      for="floatingInput"
      class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 h-full flex flex-col items-center justify-center text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
      >{{ label }}</label
    >
  </div>
</template>

<script setup lang="ts">
const {
  placeholder,
  label,
  inputType,
  type,
  options,
  imageSrc,
  modelValue,
  valid,
  uppercase,
} = defineProps([
  "placeholder",
  "label",
  "inputType",
  "type",
  "options",
  "imageSrc",
  "modelValue",
  "valid",
  "uppercase",
]);
</script>
