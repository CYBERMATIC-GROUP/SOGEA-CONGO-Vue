<template>
  <DialogContent class="min-w-[70rem]">
    <FormSociete
      @RefrehFunction="fetchProprietaire"
      @updateopenUpdate="handleUpdateOpenDelete"
      :values="data"
      :update="false"
    />
  </DialogContent>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import FormSociete from "./FormSociete.vue";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const data = ref();

onUnmounted(() => {
  sessionStorage.removeItem("update");
});

const emits = defineEmits(["RefrehFunction", "updateopenUpdate"]);
const loading = ref(false);

const updateopenUpdate = (data: any) => {
  emits("updateopenUpdate", data);
};

const fetchProprietaire = async () => {
  await RefrehFunction();
};

const handleUpdateOpenDelete = (value: any) => {
  updateopenUpdate(value);
};

const RefrehFunction = async () => {
  emits("RefrehFunction");
};

const storageAdherentString = sessionStorage.getItem("update");

if (storageAdherentString !== null) {
  const storageAdherent = JSON.parse(storageAdherentString);
  data.value = storageAdherent;
}
</script>
