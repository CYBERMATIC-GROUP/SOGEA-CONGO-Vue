<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">Liste des Adhérents</h1>
    </div>
    <CardContent class="bg-white">
      <div class="pt-5 flex flex-row space-x-5 justify-between">
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            type="text"
            v-model="searchService"
            @input="filterProprietaire"
            placeholder="Rechercher par ici"
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <router-link to="adherent" class="w-[20rem]">
          <Button class="w-full bg-bg-primary">Ajouter un adhérent</Button>
        </router-link>
      </div>
      <div>
        <Dialog v-if="open" v-model:open="open">
          <updateAdherent
            @RefrehFunction="fetchProprietaire"
            @updateopenUpdate="handleUpdate"
          />
        </Dialog>
        <Dialog v-if="deleteOpen" v-model:open="deleteOpen">
          <deleteAdherent
            @updateopenDelete="handleUpdateOpenDelete"
            @RefrehFunction="fetchProprietaire"
          />
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
import { ref } from "vue";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import Table from "../components/table.vue";
import { useAdherent } from "@/stores/adherent";
import { type Proprietaire } from "@/model/proprietaire";
import updateAdherent from "../components/updateAdherent.vue";

const pageSizeOptions = ref(["5", "10", "20", "50"]);
const pageSize = ref(5);
const handleChangePageSize = (current: any, size: any) => {
  pageSize.value = size;
};
const paginationText = {
  items_per_page: "éléments / page", // Custom text for "items per page" part
};

const open = ref(false);
const deleteOpen = ref(false);

const toggleOpenDelete = (data: any) => {
  deleteOpen.value = true;
  sessionStorage.setItem("update", JSON.stringify(data));
};

const handleUpdateOpenDelete = (value: any) => {
  deleteOpen.value = value;
};

const handleUpdate = (value: any) => {
  open.value = value;
};

const Update = (data: any) => {
  open.value = true;
  sessionStorage.setItem("update", JSON.stringify(data));
};

const getPropietaire = useAdherent();
const proprietaire = ref<Proprietaire[]>([]);
const visibleProduit = ref<Proprietaire[]>([]);
const chargement = ref(true);

const fetchProprietaire = async () => {
  try {
    await getPropietaire.fetchProprietaire();
    proprietaire.value = getPropietaire.proprietaire;
    console.log(proprietaire.value);
    filterProprietaire();
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
  }
};

const searchService = ref("");

onMounted(fetchProprietaire);

function filterProprietaire() {
  visibleProduit.value = proprietaire.value.filter((proprietaire) => {
    return (
      !searchService.value ||
      proprietaire.Nom.toLowerCase().includes(
        searchService.value.toLowerCase()
      ) ||
      proprietaire.Prenom.toLowerCase().includes(
        searchService.value.toLowerCase()
      ) ||
      proprietaire.TelPortable.toLowerCase().includes(
        searchService.value.toLowerCase()
      )
    );
  });
}

const columns = [
  {
    title: "Nom",
    dataIndex: "Nom",
    key: "Nom",
  },
  {
    title: "Prenom",
    dataIndex: "Prenom",
    key: "Prenom",
  },
  {
    title: "Civilité",
    key: "Civilite",
    dataIndex: "Civilite",
  },
  {
    title: "Portable",
    key: "TelPortable",
    dataIndex: "TelPortable",
  },
  {
    title: "Adresse",
    key: "Adresse",
    dataIndex: "Adresse",
  },
];
</script>
