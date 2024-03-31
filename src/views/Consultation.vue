<template>
  <Card class="w-full">
    <CardContent class="bg-white p-0 rounded-xl">
      <div class="flex flex-row justify-between">
        <router-link
          to="/liste-souscription"
          class="flex flex-col items-center space-y-3 w-[50%] border-r border-b hover:bg-[#F3F6F9] cursor-pointer"
        >
          <p class="pt-3">Liste des Souscriptions</p>
          <i
            class="fa-file-lines fa-sharp fa-solid text-[2rem] text-blue-500 pb-4"
          ></i>
        </router-link>
        <div
          class="flex flex-col items-center cursor-not-allowed space-y-3 border-r border-b w-[50%] hover:bg-[#F3F6F9]"
        >
          <p class="pt-3">Statistiques</p>
          <i
            class="fa-chart-pie fa-sharp fa-solid text-[2rem] text-red-500 pb-4"
          ></i>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div
          class="flex flex-col items-center space-y-3 w-[50%] border-r hover:bg-[#F3F6F9] cursor-not-allowed"
        >
          <p class="pt-3">Suivi clients</p>
          <i
            class="fa-people-arrows fa-sharp fa-solid text-[2rem] text-green-500 pb-4"
          ></i>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
</script>
