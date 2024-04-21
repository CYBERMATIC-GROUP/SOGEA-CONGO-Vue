<template>
  <div class="w-[16.5rem] bg-white rounded-2xl p-2 h-full">
    <div class="h-full overflow-auto p-2 scrollbar-thin hover:scrollbar-thin">
      <span
        class="flex flex-row mb-3 cursor-pointer hover:ps-3 duration-300 items-center space-x-3 py-3 rounded-xl p-2 bg-[#F3F6F9]"
        ><Home class="text-[#73B1E7]" />
        <p class="text-[#73B1E7] font-[600]">Tableau de Bords</p></span
      >
      <AccordionRoot
        class="flex-1"
        default-value="item-1"
        type="single"
        :collapsible="true"
      >
        <template
          v-for="item in propretaire ? accordionItemsAdherent : accordionItems"
          :key="item.value"
        >
          <AccordionItem :value="item.value">
            <AccordionHeader class="flex">
              <AccordionTrigger
                class="w-full group py-3 flex flex-row justify-between bg-white"
              >
                <div class="flex flex-row space-x-3 items-center ms-[.5rem]">
                  <component :is="item.icon" class="size-4 text-[#5B5B5B]" />
                  <span class="text-[#5B5B5B] font-[500] text-[.9rem]">{{
                    item.title
                  }}</span>
                </div>
                <ChevronRight
                  class="text-green10 size-4 mt-[.4rem] ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-90 text-[#5B5B5B]"
                  aria-hidden
                />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent
              class="text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]"
            >
              <div v-for="data in item.content">
                <router-link
                  :to="data.route"
                  class="flex flex-row items-center cursor-pointer px-5 py-1 duration-300 hover:ps-6"
                >
                  <Circle class="me-3 size-3 text-[#5B5B5B]" />
                  <p class="pb-1 text-[#5B5B5B] font-[400] text-[.9rem]">
                    {{ data.label }}
                  </p>
                </router-link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </template>
      </AccordionRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "radix-vue";
import { ref } from "vue";

import {
  accordionItems,
  accordionItemsAdherent,
} from "@/common/accordionItems";

const storageAdherentString: string | null = localStorage.getItem("Agent");
const prenom = ref("");
const propretaire = ref(false);

if (storageAdherentString !== null) {
  const storageAdherent: { Prenom: string; Proprietaire: Proprietaire } =
    JSON.parse(storageAdherentString);
  prenom.value = storageAdherent.Prenom;
  console.log("Agent Prénom:", storageAdherent);
  if (storageAdherent.Proprietaire) {
    propretaire.value = true;
    prenom.value = storageAdherent.Proprietaire.Prenom;
  }
} else {
  console.log("Aucun agent trouvé dans le stockage local.");
}

import { ChevronRight, Home, Circle } from "lucide-vue-next";
import type { Proprietaire } from "@/model/proprietaire";
</script>
