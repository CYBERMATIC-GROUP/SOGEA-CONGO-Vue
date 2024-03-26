<template>
  <DialogContent class="min-w-[30rem] px-10">
    <div>
      <DialogTitle>Voulez-vous supprimer cet élément ?</DialogTitle>
    </div>
    <div class="flex space-x-5 justify-center mt-5">
      <DialogClose class="w-full">
        <Button
          class="w-full bg-transparent border hover:text-white border-black text-black rounded-md"
          >Annuler</Button
        >
      </DialogClose>
      <Button
        @click="Delete"
        :loading="loading"
        :disabled="loading"
        type="submit"
        class="w-full bg-red-400 rounded-md"
        >Supprimer</Button
      >
    </div>
  </DialogContent>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useAdherent } from "@/stores/adherent";
const storageAdherentString = sessionStorage.getItem("update");
import { getSuccess, getError } from "../common/notification";
import { defineEmits } from "vue";
const data = ref();

if (storageAdherentString !== null) {
  const storageAdherent = JSON.parse(storageAdherentString);
  data.value = storageAdherent;
}

onUnmounted(() => {
  sessionStorage.removeItem("update");
});

const getPropietaire = useAdherent();
const emits = defineEmits(["RefrehFunction", "updateopenDelete"]);
const loading = ref(false);

const updateopenDelete = (data: any) => {
  emits("updateopenDelete", data);
};

const RefrehFunction = async () => {
  emits("RefrehFunction");
};

const Delete = async () => {
  loading.value = true;
  try {
    let response = await getPropietaire.DeleteAdherent(
      data.value.IDProprietaire
    );
    console.log(response);
    loading.value = false;
    updateopenDelete(false);
    await RefrehFunction();
    getSuccess("L'adhérent a été supprimer avec succèss");
  } catch (error) {
    console.error(error);
    loading.value = false;
    getError((error as any).response?.data?.fault?.detail);
  }
};
</script>
