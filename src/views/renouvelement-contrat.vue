<template>
  <Card class="w-full">
    <CardContent class="bg-white p-0 rounded-xl">
      <div class="flex flex-row justify-between">
        <span
          @click="openModal"
          class="flex flex-col items-center space-y-3 w-[50%] border-r border-b hover:bg-[#F3F6F9] cursor-pointer"
        >
          <p class="pt-3">Rechercher par véhicule (immatriculation,...)</p>
          <i class="fa-search fa-solid text-[2rem] text-red-700 pb-4"></i>
        </span>
        <span
          @click="openModaldherent"
          class="flex flex-col items-center space-y-3 w-[50%] border-r border-b hover:bg-[#F3F6F9] cursor-pointer"
        >
          <p class="pt-3">Rechercher par adhérent</p>
          <i class="fa-search fa-solid text-[2rem] text-red-700 pb-4"></i>
        </span>
      </div>
    </CardContent>
  </Card>

  <Dialog v-if="open" v-model:open="open">
    <DialogContent class="sm:min-w-[60rem]">
      <AutomobileListe :LePropretaire="LePropretaire" />
    </DialogContent>
  </Dialog>

  <Dialog v-if="openAdherent" v-model:open="openAdherent">
    <DialogContent class="sm:min-w-[60rem]">
      <AdherentListe @notification="notification" />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ref } from "vue";
import AutomobileListe from "./AutomobileListe.vue";
import AdherentListe from "./AdherentListe.vue";
const open = ref(false);
const openAdherent = ref(false);

const openModal = () => {
  open.value = true;
};

const LePropretaire = ref();

const openModaldherent = () => {
  openAdherent.value = true;
};

const notification = (data: any) => {
  LePropretaire.value = data;
  open.value = true;
  openAdherent.value = false;
};
</script>
