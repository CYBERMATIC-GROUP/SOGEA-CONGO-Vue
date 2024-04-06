<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import SideBar from "./components/SideBar.vue";
import { useMenu } from "@/stores/menu";
import { ref, onMounted, watch } from "vue";

const getMenu = useMenu();
const menuActive = ref(true);

onMounted(() => {
  menuActive.value = getMenu.menu;
});

watch(
  () => getMenu.menu,
  (newValue, oldValue) => {
    menuActive.value = newValue;
  }
);
</script>

<template>
  <div v-if="$route.path != '/connexion'">
    <div class="h-[4.313rem]"><Header /></div>

    <div class="flex flex-row mt-10">
      <div class="mx-6 w-[18rem] h-full pb-32 fixed z-20">
        <SideBar
          :class="[
            menuActive
              ? 'transition-all duration-500'
              : 'hidden transition-all duration-500',
          ]"
        />
      </div>
      <div
        :class="[
          `flex-1 me-[1.7rem]`,
          menuActive ? 'ml-[20rem] ' : 'ms-6',
          'transition-all duration-500',
        ]"
      >
        <RouterView />
      </div>
    </div>
  </div>

  <div v-else>
    <RouterView />
  </div>
</template>
