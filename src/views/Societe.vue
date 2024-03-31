<template>
  <div>
    <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
      <div class="w-full h-[2rem] select-none flex justify-center items-center">
        <h1 class="font-[600] text-white text-[1.3rem]">Ajouter une Société</h1>
      </div>
      <CardContent class="bg-white">
        <FormSociete :update="true" />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import FormSociete from "../components/FormSociete.vue";
</script>
