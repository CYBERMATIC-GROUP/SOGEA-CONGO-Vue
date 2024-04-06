<script setup lang="ts">
import { Card, CardHeader } from "@/components/ui/card";
import { List, Search, Bell, User } from "lucide-vue-next";
import Logo from "../assets/img/sogea.jpg";
import Avatar from "primevue/avatar";
import { ref, onMounted } from "vue";
import profile from "@/assets/img/profile.png";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRoot,
  MenubarTrigger,
} from "radix-vue";
import { menu } from "@/common/menu";
import router from "@/router";
import { useMenu } from "@/stores/menu";

const currentMenu = ref("");

const getMenu = useMenu();
const menuActive = ref(true);

onMounted(() => {
  menuActive.value = getMenu.menu;
});

const Active = () => {
  menuActive.value = !menuActive.value;
  getMenu.setMenu(menuActive.value);
  console.log(getMenu.menu);
};

const handleMenuItemClick = (item: any) => {
  if (item.text == "Déconnexion") {
    localStorage.removeItem("adherent");
    localStorage.removeItem("UTILISATEUER_LOGIN");
    localStorage.removeItem("Agent");
    router.push({ path: "/connexion" });
  }
};

const storageAdherentString: string | null = localStorage.getItem("Agent");
const prenom = ref("");

if (storageAdherentString !== null) {
  const storageAdherent: { Prenom: string } = JSON.parse(storageAdherentString);
  prenom.value = storageAdherent.Prenom;
  console.log("Agent Prénom:", storageAdherent.Prenom);
} else {
  console.log("Aucun agent trouvé dans le stockage local.");
}
</script>

<template>
  <div
    class="fixed z-50 top-0 left-[1.5rem] right-[1.5rem] backdrop-filter backdrop-blur-lg"
  >
    <Card class="mt-5 rounded-xl">
      <CardHeader
        class="select-none h-[4.313rem] flex flex-row justify-between items-center"
      >
        <div class="flex flex-row items-center space-x-5">
          <List
            @click="Active"
            :class="[
              `cursor-pointer hover:text-blue-500 transition-all duration-500`,
              menuActive ? '' : 'rotate-180',
            ]"
          />
          <span
            class="hover:bg-[#F3F6F9] font-[500] py-2 px-4 rounded-lg hover:text-blue-500 cursor-pointer"
            ><a href="#">Accueil</a></span
          >
          <span
            class="hover:bg-[#F3F6F9] font-[500] py-2 px-4 rounded-lg hover:text-blue-500 cursor-pointer"
            ><a href="#">Aide ?</a></span
          >
        </div>
        <div class="flex flex-row items-center space-x-24">
          <img :src="Logo" alt="Sogea" class="w-20" />
          <div class="flex flex-row items-center space-x-5">
            <Search class="size-5 text-[#5B5B5B]" />
            <span class="bg-[#0D6EFD] p-2 rounded-full"
              ><Bell class="size-5 text-white"
            /></span>
            <div>
              <MenubarRoot v-model="currentMenu">
                <MenubarMenu value="file">
                  <MenubarTrigger class="flex flex-row items-center space-x-1">
                    <Avatar :image="profile" class="mr-2 w-10" shape="circle" />
                    <div class="flex flex-col items-start">
                      <span class="text-[.8rem] font-[300]"
                        >Agent
                        <i class="fa fa-circle text-green-300 text-[.6rem]"></i>
                      </span>
                      <span class="text-[.8rem] font-[400]">{{ prenom }}</span>
                    </div>
                  </MenubarTrigger>
                  <MenubarPortal>
                    <MenubarContent
                      class="min-w-[12rem] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity] mr-6 mt-4"
                      align="start"
                      :side-offset="5"
                      :align-offset="-3"
                    >
                      <MenubarItem
                        v-for="item in menu"
                        class="group text-[13px] leading-none text-grass11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-green9 data-[highlighted]:to-green10 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:text-green1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none hover:bg-[#F3F6F9] py-4 hover:text-blue-500 cursor-pointer"
                        @click="handleMenuItemClick(item)"
                      >
                        <component
                          :is="item.icon"
                          class="size-5 me-3 text-[#5B5B5B] group-hover:text-blue-500"
                        />
                        {{ item.text }}
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarPortal>
                </MenubarMenu>
              </MenubarRoot>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  </div>
</template>
