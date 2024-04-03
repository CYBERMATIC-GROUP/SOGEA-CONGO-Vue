<template>
  <div class="w-full">
    <label
      :for="id"
      class="mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']"
      >{{ label }}</label
    >
    <div class="relative" id="select-1">
      <input
        type="text"
        :id="id"
        :readonly="readonly"
        :class="[
          'block outline-none border  px-2 py-1 w-full rounded-md  shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
          valid
            ? 'border-red-color  focus:border-red-color'
            : 'border-secondary-500 border-[#737272] focus:border-bg-primary',
          readonly &&
            'bg-[#F5F6FA] border border-gray-200 focus:border-gray-200',
          uppercase && ' uppercase',
        ]"
        :placeholder="placeholder"
        v-model="selectedValue"
        v-on:input="
          $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
        "
        @click="!readonly && (showOptions = !showOptions)"
      />
      <div
        v-if="showOptions && options.length > 1"
        class="absolute z-50 bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg h-[11rem] overflow-scroll overflow-x-hidden scrollbar-thin"
      >
        <div
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const {
  placeholder,
  id,
  labelDefaut,
  label,
  inputType,
  type,
  imageSrc,
  readonly,
  modelValue,
  options,
  valid,
  uppercase,
} = defineProps([
  "id",
  "placeholder",
  "labelDefaut",
  "label",
  "inputType",
  "type",
  "imageSrc",
  "options",
  "modelValue",
  "valid",
  "uppercase",
  "readonly",
]);

const showOptions = ref(false);
const selectedValue = ref(modelValue);

// Définition des événements émis
const emitUpdateModelValue = defineEmits(["update:modelValue"]);

function selectOption(option: any) {
  selectedValue.value = option.label;
  showOptions.value = false;
  // Émettre l'événement pour mettre à jour le modèle
  emitUpdateModelValue("update:modelValue", option.value);
}
</script>
