<template>
  <Card class="w-full">
    <CardContent class="bg-white p-0 rounded-xl">
      <div class="flex flex-row justify-between">
        <router-link
          to="/adherent"
          class="flex flex-col items-center space-y-3 w-[50%] border-r border-b hover:bg-[#F3F6F9] cursor-pointer"
        >
          <p class="pt-3">Nouveau</p>
          <i class="fa-solid fa-user-plus text-[2rem] text-green-700 pb-4"></i>
        </router-link>
        <router-link
          to="/nouvelle-souscription/renouvelement-contrat"
          class="flex flex-col items-center space-y-3 w-[50%] border-r border-b hover:bg-[#F3F6F9] cursor-pointer"
        >
          <p class="pt-3">Renouvelement</p>
          <i class="fa-paste fa-solid text-[2rem] text-blue-300 pb-4"></i>
        </router-link>
        <span
          @click="openModaldherent"
          class="flex flex-col items-center space-y-3 w-[50%] border-r border-b hover:bg-[#F3F6F9] cursor-pointer"
        >
          <p class="pt-3">Ajout</p>
          <i class="fa-car-side fa-solid text-[2rem] text-red-600 pb-4"></i>
        </span>
      </div>
    </CardContent>
  </Card>

  <Dialog v-if="openAdherent" v-model:open="openAdherent">
    <DialogContent class="sm:min-w-[60rem]">
      <AdherentListe @notification="notification" />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AdherentListe from "./AdherentListe.vue";
import { ref } from "vue";

const openAdherent = ref(false);
const openModaldherent = () => {
  openAdherent.value = true;
};
const notification = (data: any) => {
  openAdherent.value = false;
};
</script>
