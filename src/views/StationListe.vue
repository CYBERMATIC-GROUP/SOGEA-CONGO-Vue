<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">Liste des stations</h1>
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
          <Button class="w-full bg-bg-primary">Ajouter une station</Button>
        </div>
      </div>
      <div>
        <Dialog v-if="openCreate" v-model:open="openCreate">
          <DialogContent class="min-w-[70rem]">
            <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl mt-5">
              <div
                class="w-full h-[2rem] select-none flex justify-center items-center"
              >
                <h1 class="font-[600] text-white text-[1.3rem]">
                  Ajouter une station
                </h1>
              </div>
              <CardContent class="bg-white">
                <FormStation
                  :update="true"
                  @RefrehFunction="fetchSociete"
                  @updateopenUpdate="updateopenUpdate"
                />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
        <Dialog v-if="open" v-model:open="open">
          <DialogContent class="min-w-[70rem]">
            <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl mt-5">
              <div
                class="w-full h-[2rem] select-none flex justify-center items-center"
              >
                <h1 class="font-[600] text-white text-[1.3rem]">
                  Ajouter une station
                </h1>
              </div>
              <CardContent class="bg-white">
                <FormStation
                  @RefrehFunction="fetchSociete"
                  @updateopenUpdate="updateopenUpdate"
                />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>

        <Dialog v-if="deleteOpen" v-model:open="deleteOpen">
          <deleteStation
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ref } from "vue";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import Table from "../components/table.vue";
import type { Objectif } from "@/model/objectif";
import type { Societe } from "@/model/societe";
import deleteStation from "../components/deleteStation.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import updateSociete from "../components/updateSociete.vue";
import FormObjectif from "../components/formObjectif.vue";
import { useStation } from "@/stores/stations";
import type { Station } from "@/model/stations";
import FormStation from "../components/formStation.vue";

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

const getObjectif = useStation();
const societe = ref<Station[]>([]);
const visibleProduit = ref<Station[]>([]);
const chargement = ref(true);

const fetchSociete = async () => {
  try {
    await getObjectif.fetchStation();
    societe.value = getObjectif.station;
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
      societe.NomStation.toLowerCase().includes(
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
  sessionStorage.setItem("objectif", JSON.stringify(data));
};

const HandleOpen = () => {
  openCreate.value = true;
};

const updateopenUpdate = (data: any) => {
  openCreate.value = data;
  open.value = data;
};

const columns = [
  {
    title: "Code ",
    dataIndex: "CiodeStation",
    key: "CiodeStation",
  },
  {
    title: "Nom",
    dataIndex: "NomStation",
    key: "NomStation",
  },
  {
    title: "Adresse",
    dataIndex: "Adresse",
    key: "Adresse",
  },
];

const handleUpdate = (value: any) => {
  open.value = value;
};
</script>
