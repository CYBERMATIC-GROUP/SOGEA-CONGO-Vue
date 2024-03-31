<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">Liste des Adhérents</h1>
    </div>
    <CardContent class="bg-white">
      <div class="pt-5 flex flex-row space-x-5">
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            type="text"
            placeholder="Rechercher par ici"
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <div class="flex flex-row items-center">
          <div class="w-[7rem]">
            <p>Période du</p>
          </div>
          <Input id="date" type="date" />
        </div>
        <div class="flex flex-row items-center space-x-5">
          <div>
            <p>au</p>
          </div>
          <Input id="date" type="date" class="w-[14rem]" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
</script>
