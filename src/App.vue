<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <div v-if="$route.path != '/connexion'">
    <div class="h-[4.313rem]"><Header /></div>

    <div class="flex flex-row mt-10">
      <div class="mx-6 w-[18rem] h-full pb-32 fixed">
        <SideBar />
      </div>
      <div class="flex-1 ml-[20rem] me-[1.7rem]">
        <RouterView />
      </div>
    </div>
  </div>

  <div v-else>
    <RouterView />
  </div>
</template>
