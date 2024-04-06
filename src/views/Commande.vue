<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">
        Recherchez et selectionnez une commande
      </h1>
    </div>
    <CardContent class="bg-white">
      <div class="pt-5 flex flex-row space-x-5">
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            type="text"
            v-model="searchService"
            @input="filterAutomible"
            placeholder="Rechercher par ici"
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <div class="flex flex-row items-center space-x-2">
          <div class="w-[8rem]">
            <p>Période du</p>
          </div>
          <Input
            v-model="DataDebut"
            @input="filterTableau"
            id="date"
            type="date"
          />
        </div>
        <div class="flex flex-row items-center space-x-5">
          <div>
            <p>au</p>
          </div>
          <Input
            v-model="DataFin"
            @input="filterTableau"
            id="date"
            type="date"
            class="w-[14rem]"
          />
        </div>
      </div>

      <Table
        :columns="columns"
        :visibleProduit="visibleProduit"
        :pageSize="pageSize"
        :pageSizeOptions="pageSizeOptions"
        :handleChangePageSize="handleChangePageSize"
        :paginationText="paginationText"
        :chargement="chargement"
        @updateFunction="Update"
      />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { useRecherche } from "@/stores/recherche";
import type { Automobile } from "@/model/automobile";
import Table from "../components/table.vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { getSuccess, getError } from "../common/notification";
import router from "@/router";

const pageSizeOptions = ref(["5", "10", "20", "50"]);
const pageSize = ref(5);
const handleChangePageSize = (current: any, size: any) => {
  pageSize.value = size;
};
const paginationText = {
  items_per_page: "éléments / page", // Custom text for "items per page" part
};

const DataDebut = ref("");
const DataFin = ref("");

function formatDateISO(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const dateString = "20240101";
const year = parseInt(dateString.substring(0, 4));
const month = parseInt(dateString.substring(4, 6)) - 1; // Soustraire 1 car les mois sont indexés à partir de 0
const day = parseInt(dateString.substring(6, 8));
const datePreRemplie = new Date(year, month, day);
DataDebut.value = formatDateISO(datePreRemplie);
DataFin.value = formatDateISO(new Date());

const defaultValue = ref({
  DataDebut: dateString,
  DataFin: "",
});

const chargement = ref(true);
const getAutomobile = useRecherche();
const automobile = ref<Automobile[]>([]);
const visibleProduit = ref<Automobile[]>([]);
const searchService = ref("");

const Update = (data: any) => {
  sessionStorage.setItem("amortissement", JSON.stringify(data));
  router.push({ path: "/amortissement" });
};

const fetchAutomobile = async () => {
  try {
    await getAutomobile.fetchAutomobile(defaultValue.value);
    automobile.value = getAutomobile.automobile;
    console.log(automobile.value);
    filterAutomible();
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
  }
};

onMounted(() => {
  fetchAutomobile();
});

function filterAutomible() {
  visibleProduit.value = automobile.value.filter((automobile) => {
    return (
      !searchService.value ||
      automobile.Proprietaire.toLowerCase().includes(
        searchService.value.toLowerCase()
      ) ||
      automobile.Immatriculation.toLowerCase().includes(
        searchService.value.toLowerCase()
      )
    );
  });
}

const filterTableau = async () => {
  let dateStringDebut = DataDebut.value.replace(/-/g, "");
  let dateStringFin = DataFin.value.replace(/-/g, "");
  const data = {
    DataDebut: dateStringDebut,
    DataFin: dateStringFin,
  };
  chargement.value = true;
  try {
    let response = await getAutomobile.fetchAutomobile(data);
    console.log(response);
    automobile.value = response;
    filterAutomible();
    chargement.value = false;
  } catch (error) {
    chargement.value = false;
    getError((error as any).response?.data?.fault?.detail);
    console.error((error as any).response?.data?.message);
  }
};

const columns = [
  {
    title: "Adhérent",
    dataIndex: "Proprietaire",
    key: "Proprietaire",
  },
  {
    title: "Nom véhicule",
    dataIndex: "nom",
    key: "nom",
  },
  {
    title: "Immatriculation",
    key: "Immatriculation",
    dataIndex: "Immatriculation",
  },
  {
    title: "Date de délivrance",
    key: "DateDelivrance",
    dataIndex: "DateDelivrance",
  },
];
</script>
