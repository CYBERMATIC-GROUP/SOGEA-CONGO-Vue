<template>
  <Card class="w-full">
    <CardContent class="bg-white p-0 rounded-xl">
      <div class="flex flex-row justify-between">
        <router-link
          to="/nouvelle-souscription"
          class="flex flex-col items-center space-y-3 w-[50%] border-r border-b hover:bg-[#F3F6F9] cursor-pointer"
        >
          <p class="pt-3">Nouvelle souscription</p>
          <i
            class="fa-file-signature fa-sharp fa-solid text-[2rem] text-blue-500 pb-4"
          ></i>
        </router-link>
        <router-link
          to="/commande"
          class="flex flex-col items-center cursor-pointer space-y-3 border-r border-b w-[50%] hover:bg-[#F3F6F9]"
        >
          <p class="pt-3">Commande non finalisées</p>
          <i
            class="fa-file-lines fa-sharp fa-solid text-[2rem] text-red-500 pb-4"
          ></i>
        </router-link>
      </div>
      <div class="flex flex-row justify-between">
        <div
          class="flex flex-col items-center space-y-3 w-[50%] border-r hover:bg-[#F3F6F9] cursor-pointer"
        >
          <p class="pt-3">Imprimer viniette</p>
          <i
            class="fa-print fa-sharp fa-solid text-[2rem] text-green-500 pb-4"
          ></i>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
</script>
