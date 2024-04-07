<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">Gestion des objectifs</h1>
    </div>
    <CardContent class="bg-white">
      <div class="pt-5 flex flex-row space-x-5 justify-between">
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            type="text"
            v-model="searchSociete"
            @input="filterSociete"
            placeholder="Rechercher par ici"
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <div @click="HandleOpen" class="w-[20rem]">
          <Button class="w-full bg-bg-primary">Ajouter un objectif</Button>
        </div>
      </div>
      <div>
        <Dialog v-if="openCreate" v-model:open="openCreate">
          <DialogContent class="min-w-[70rem]">
            <FormObjectif
              :update="true"
              @RefrehFunction="fetchSociete"
              @updateopenUpdate="updateopenUpdate"
            />
          </DialogContent>
        </Dialog>
        <Dialog v-if="open" v-model:open="open">
          <DialogContent class="min-w-[70rem]">
            <FormObjectif
              @RefrehFunction="fetchSociete"
              @updateopenUpdate="updateopenUpdate"
            />
          </DialogContent>
        </Dialog>

        <Dialog v-if="deleteOpen" v-model:open="deleteOpen">
          <DialogContent class="min-w-[30rem] px-10">
            <div>
              <DialogTitle>Voulez-vous supprimer cet élément ?</DialogTitle>
            </div>
            <div class="flex space-x-5 justify-center mt-5">
              <DialogClose class="w-full">
                <Button
                  class="w-full bg-transparent border hover:text-white border-black text-black rounded-md"
                  >Annuler</Button
                >
              </DialogClose>
              <Button type="submit" class="w-full bg-red-400 rounded-md"
                >Supprimer</Button
              >
            </div>
          </DialogContent>
        </Dialog>
        <Table
          :columns="columns"
          :visibleProduit="visibleProduit"
          :pageSize="pageSize"
          :pageSizeOptions="pageSizeOptions"
          :handleChangePageSize="handleChangePageSize"
          :paginationText="paginationText"
          :chargement="chargement"
          @updateFunction="Update"
          @deleteFunction="toggleOpenDelete"
        />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { onMounted } from "vue";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ref } from "vue";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import Table from "../components/table.vue";
import type { Objectif } from "@/model/objectif";
import { useObjectif } from "@/stores/objectif";
import type { Societe } from "@/model/societe";
import deleteSociete from "../components/deleteSociete.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import updateSociete from "../components/updateSociete.vue";
import FormObjectif from "../components/formObjectif.vue";

const pageSizeOptions = ref(["5", "10", "20", "50"]);
const pageSize = ref(5);
const handleChangePageSize = (current: any, size: any) => {
  pageSize.value = size;
};
const paginationText = {
  items_per_page: "éléments / page", // Custom text for "items per page" part
};

const openCreate = ref(false);

const searchSociete = ref("");
const deleteOpen = ref(false);
const open = ref(false);

const getObjectif = useObjectif();
const societe = ref<Objectif[]>([]);
const visibleProduit = ref<Objectif[]>([]);
const chargement = ref(true);

const fetchSociete = async () => {
  try {
    await getObjectif.fetchObjectif();
    societe.value = getObjectif.objectif;
    console.log(societe.value);
    filterSociete();
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
  }
};

onMounted(fetchSociete);

const handleUpdateOpenDelete = (value: any) => {
  deleteOpen.value = value;
};

function filterSociete() {
  visibleProduit.value = societe.value.filter((societe) => {
    return (
      !searchSociete.value ||
      societe.NomAgencet.toLowerCase().includes(
        searchSociete.value.toLowerCase()
      )
    );
  });
}

const Update = (data: any) => {
  sessionStorage.setItem("objectif", JSON.stringify(data));
  open.value = true;
};

const toggleOpenDelete = (data: any) => {
  deleteOpen.value = true;
  sessionStorage.setItem("update", JSON.stringify(data));
};

const HandleOpen = () => {
  openCreate.value = true;
};

const columns = [
  {
    title: "Début",
    dataIndex: "DateDebut",
    key: "DateDebut",
  },
  {
    title: "Fin",
    dataIndex: "DateFin",
    key: "DateFin",
  },
  {
    title: "C.A réalisé",
    key: "ChiffreAFaffaire",
    dataIndex: "ChiffreAFaffaire",
  },
  {
    title: "Client",
    key: "NombreClient",
    dataIndex: "NombreClient",
  },
  {
    title: "Ecart",
    key: "Ecart",
    dataIndex: "Ecart",
  },
  {
    title: "%",
    key: "Pourcentage",
    dataIndex: "Pourcentage",
  },
  {
    title: "Agence",
    key: "NomAgencet",
    dataIndex: "NomAgencet",
  },
];

const updateopenUpdate = (data: any) => {
  openCreate.value = data;
  open.value = data;
};
</script>
