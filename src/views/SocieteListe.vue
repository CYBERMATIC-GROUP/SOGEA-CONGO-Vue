<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">Gestion des sociétés</h1>
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
        <router-link to="/societe" class="w-[20rem]">
          <Button class="w-full bg-bg-primary">Ajouter une société</Button>
        </router-link>
      </div>
      <div>
        <Dialog v-if="open" v-model:open="open">
          <updateSociete
            @RefrehFunction="fetchSociete"
            @updateopenUpdate="handleUpdate"
          />
        </Dialog>
        <Dialog v-if="deleteOpen" v-model:open="deleteOpen">
          <deleteSociete
            @updateopenDelete="handleUpdateOpenDelete"
            @RefrehFunction="fetchSociete"
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
import { useSociete } from "@/stores/societe";
import type { Societe } from "@/model/societe";
import deleteSociete from "../components/deleteSociete.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import updateSociete from "../components/updateSociete.vue";

const pageSizeOptions = ref(["5", "10", "20", "50"]);
const pageSize = ref(5);
const handleChangePageSize = (current: any, size: any) => {
  pageSize.value = size;
};
const paginationText = {
  items_per_page: "éléments / page", // Custom text for "items per page" part
};

const searchSociete = ref("");
const deleteOpen = ref(false);
const open = ref(false);

const getSociete = useSociete();
const societe = ref<Societe[]>([]);
const visibleProduit = ref<Societe[]>([]);
const chargement = ref(true);

const fetchSociete = async () => {
  try {
    await getSociete.fetchSociete();
    societe.value = getSociete.societe;
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
      societe.NomSociete.toLowerCase().includes(
        searchSociete.value.toLowerCase()
      ) ||
      societe.Adresse.toLowerCase().includes(
        searchSociete.value.toLowerCase()
      ) ||
      societe.Ville.toLowerCase().includes(searchSociete.value.toLowerCase())
    );
  });
}

const Update = (data: any) => {
  open.value = true;
  sessionStorage.setItem("update", JSON.stringify(data));
};

const toggleOpenDelete = (data: any) => {
  deleteOpen.value = true;
  sessionStorage.setItem("update", JSON.stringify(data));
};

const columns = [
  {
    title: "Nom Societe",
    dataIndex: "NomSociete",
    key: "NomSociete",
  },
  {
    title: "Adresse",
    dataIndex: "Adresse",
    key: "Adresse",
  },
  {
    title: "Mat Fiscale",
    key: "MatFiscale",
    dataIndex: "MatFiscale",
  },
  {
    title: "CP",
    key: "CP",
    dataIndex: "CP",
  },
  {
    title: "Ville",
    key: "Ville",
    dataIndex: "Ville",
  },
  {
    title: "Pays",
    key: "Pays",
    dataIndex: "Pays",
  },
  {
    title: "Echeance",
    key: "Echeance",
    dataIndex: "Echeance",
  },
];

const handleUpdate = (value: any) => {
  open.value = value;
};
</script>
