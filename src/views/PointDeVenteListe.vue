<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">
        Liste Stations Points Vente
      </h1>
    </div>
    <CardContent class="bg-white">
      <div class="pt-5 flex flex-row space-x-5 justify-between">
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            type="text"
            v-model="searchSociete"
            @input="filterPointDeVente"
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
          <Button class="w-full bg-bg-primary"
            >Ajouter un point de vente</Button
          >
        </div>
      </div>

      <div class="pt-5 flex flex-row justify-between space-x-5">
        <div class="w-full">
          <InputForm
            type="select"
            id="departement"
            :cacher="true"
            v-model="IDDEPARTEMENT"
            @input="FilterValue"
            labelDefaut="Tous les departements"
            :options="optionsDepartement"
          />
        </div>
        <div class="w-full">
          <InputForm
            type="select"
            id="departement"
            :cacher="true"
            v-model="IDARRONDISSEMENT"
            @input="FilterValue"
            labelDefaut="Tous les Arrondissements"
            :options="optionsArrondissement"
          />
        </div>
        <div class="w-full">
          <InputForm
            type="select"
            id="departement"
            :cacher="true"
            @input="FilterValue"
            v-model="IDQUARTIER"
            labelDefaut="Tous les quartiers"
            :options="optionsQuartier"
          />
        </div>
        <div class="w-full">
          <InputForm
            type="select"
            id="departement"
            :cacher="true"
            @input="FilterValue"
            v-model="IDSTATIONS"
            labelDefaut="Toutes les stations"
            :options="optionsStation"
          />
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
                  Ajout station point de vente
                </h1>
              </div>
              <CardContent class="bg-white">
                <FormPointVente
                  :update="true"
                  @RefrehFunction="fetchPointDeVente"
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
                  Modifier une station point de vente
                </h1>
              </div>
              <CardContent class="bg-white">
                <FormPointVente
                  @RefrehFunction="fetchPointDeVente"
                  @updateopenUpdate="updateopenUpdate"
                />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>

        <Dialog v-if="deleteOpen" v-model:open="deleteOpen">
          <deletePointDeVente
            @updateopenDelete="handleUpdateOpenDelete"
            @RefrehFunction="fetchPointDeVente"
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
import { usePointDeVente } from "@/stores/pointDeVente";
import type { PointDeVente } from "@/model/pointDeVente";
import deletePointDeVente from "../components/deletepointDeVente.vue";
import { useStation } from "@/stores/stations";
import InputForm from "../components/inputForm.vue";
import { useDepartement } from "../stores/departement";
import { useArrondissement } from "@/stores/arrondissement";
import { useQuartier } from "@/stores/quartier";
import FormPointVente from "../components/FormPointVente.vue";

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

const getPointDeVente = usePointDeVente();
const pointDeVente = ref<PointDeVente[]>([]);
const visibleProduit = ref<PointDeVente[]>([]);
const chargement = ref(true);
const IDQUARTIER = ref();
const IDDEPARTEMENT = ref();
const IDARRONDISSEMENT = ref();
const IDSTATIONS = ref();
const getArrondissement = useArrondissement();
const getDepartement = useDepartement();
const getQuartier = useQuartier();
const getStation = useStation();

interface Option {
  value: number;
  label: string;
}

const optionsDepartement = ref<Option[]>([]);
const optionsArrondissement = ref<Option[]>([]);
const optionsQuartier = ref<Option[]>([]);
const optionsStation = ref<Option[]>([]);

const defaultValue = ref({
  IDVENDEURS: 0,
  IDARRONDISSEMENT: 0,
  IDDEPARTEMENT: 0,
  IDQUARTIER: 0,
  IDSTATIONS: 0,
});

const fetchPointDeVente = async () => {
  try {
    await getPointDeVente.fetchPointDeVente(defaultValue);
    pointDeVente.value = getPointDeVente.pointDeVente;
    console.log(pointDeVente.value);
    filterPointDeVente();
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
  }
};

const FilterValue = async () => {
  chargement.value = true;
  const filtre = ref({
    IDVENDEURS: 0,
    IDARRONDISSEMENT: IDARRONDISSEMENT,
    IDDEPARTEMENT: IDDEPARTEMENT,
    IDQUARTIER: IDQUARTIER,
    IDSTATIONS: IDSTATIONS,
  });
  try {
    await getPointDeVente.fetchPointDeVente(filtre.value);
    pointDeVente.value = getPointDeVente.pointDeVente;
    filterPointDeVente();
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
    chargement.value = false;
  }
};

onMounted(async () => {
  await getDepartement.fetchDepartement();
  optionsDepartement.value = getDepartement.departement.map((item) => ({
    value: item.IDDEPARTEMENT,
    label: item.NomDepartement,
  }));
  await getArrondissement.fetchArrondissement();
  optionsArrondissement.value = getArrondissement.arrondissement.map(
    (item) => ({
      value: item.IDARRONDISSEMENT,
      label: item.NomArron,
    })
  );
  await getQuartier.fetchQuartier();
  optionsQuartier.value = getQuartier.quartier.map((item) => ({
    value: item.IDQUARTIER,
    label: item.NomQuartier,
  }));
  await getStation.fetchStation();
  optionsStation.value = getStation.station.map((item) => ({
    value: item.IDSTATIONS,
    label: item.NomStation,
  }));
  fetchPointDeVente();
});

const handleUpdateOpenDelete = (value: any) => {
  deleteOpen.value = value;
};

function filterPointDeVente() {
  visibleProduit.value = pointDeVente.value.filter((pointDeVente) => {
    return (
      !searchSociete.value ||
      pointDeVente.RaisonSocilale.toLowerCase().includes(
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
    title: "Raison Sociale",
    dataIndex: "RaisonSocilale",
    key: "RaisonSocilale",
  },
  {
    title: "Adresse",
    dataIndex: "Adresse",
    key: "Adresse",
  },
  {
    title: "Mobile",
    dataIndex: "Mobile",
    key: "Mobile",
  },
];

const handleUpdate = (value: any) => {
  open.value = value;
};
</script>
