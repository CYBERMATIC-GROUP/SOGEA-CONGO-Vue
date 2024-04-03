<template>
  <div
    :class="{
      'mt-5': $route.path === '/nouvelle-souscription/renouvelement-contrat',
    }"
  >
    <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
      <div class="w-full h-[2rem] select-none flex justify-center items-center">
        <h1 class="font-[600] text-white text-[1.3rem]">
          Liste des automobiles
        </h1>
      </div>
      <CardContent class="bg-white">
        <div class="pt-5 flex flex-row space-x-5 justify-between">
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
          <div class="w-[20rem]">
            <Dialog v-model:open="openFiltre">
              <DialogTrigger as-child>
                <Button class="w-full bg-bg-primary">Recherche avancée</Button>
              </DialogTrigger>
              <DialogContent class="min-w-[45rem]">
                <DialogHeader>
                  <DialogTitle class="mt-[-.3rem]">Filtre avancé</DialogTitle>
                  <SeachAutomobile @seachData="FilterValue" />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <router-link to="/automobile" class="w-[20rem]">
            <Button class="w-full bg-bg-primary">Ajouter un automobile</Button>
          </router-link>
        </div>
        <div>
          <Dialog v-if="open" v-model:open="open">
            <updateAutomobile
              @RefrehFunction="fetchAutomobile"
              @updateopenUpdate="handleUpdate"
            />
          </Dialog>
          <Dialog v-if="deleteOpen" v-model:open="deleteOpen">
            <deleteAutomobile
              @updateopenDelete="handleUpdateOpenDelete"
              @RefrehFunction="fetchAutomobile"
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
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { onMounted } from "vue";
import { ref } from "vue";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import Table from "../components/table.vue";
import { useAutomobile } from "@/stores/automobile";
import { type Proprietaire } from "@/model/proprietaire";
import deleteAutomobile from "../components/deleteAutomobile.vue";
import updateAutomobile from "../components/updateAutomobile.vue";
import type { Automobile } from "@/model/automobile";
import SeachAutomobile from "../components/SeachAutomobile.vue";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRoute } from "vue-router";
import router from "@/router";

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

const route = useRoute();

const emits = defineEmits(["notification"]);

const notification = (data: any) => {
  emits("notification", data);
};

const Update = (data: any) => {
  if (
    route.path != "/nouvelle-souscription/renouvelement-contrat" &&
    route.path != "/amortissement"
  ) {
    open.value = true;
    sessionStorage.setItem("updateAutomobile", JSON.stringify(data));
  } else {
    sessionStorage.setItem("amortissement", JSON.stringify(data));
    const storageData = sessionStorage.getItem("amortissement");
    if (storageData !== null) {
      const parsedData = JSON.parse(storageData);
      notification(parsedData);
    }
    router.push({ path: "/amortissement" });
  }
};

const openFiltre = ref(false);

const getAutomobile = useAutomobile();
const automobile = ref<Automobile[]>([]);
const visibleProduit = ref<Automobile[]>([]);

const defaultValue = ref({
  IDAutomobiles: 0,
  NumeroSerie: "",
  Immatriculation: "",
  AnneeConstruction: "",
  IDMarqueAutomobile: "",
  IDTypeAutomobile: "",
  IDTypeVehicule: "",
  IDSourceEnergie: "",
  IDGenre: "",
  IDProprietaire: "",
  IDLesSocietes: "",
  IDDEPARTEMENT: "",
  Etat: "",
  Status: "",
});

const chargement = ref(true);

const fetchAutomobile = async () => {
  try {
    await getAutomobile.fetchAutomobile(defaultValue);
    automobile.value = getAutomobile.automobile;
    console.log(automobile.value);
    filterAutomible();
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
  }
};

const { LePropretaire } = defineProps(["LePropretaire"]);

const FilterValue = async (values: any) => {
  console.log(values);
  try {
    await getAutomobile.fetchAutomobile(values);
    automobile.value = getAutomobile.automobile;
    filterAutomible();
    openFiltre.value = false;
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
  }
};

const searchService = ref("");

onMounted(() => {
  if (
    LePropretaire &&
    route.path == "/nouvelle-souscription/renouvelement-contrat"
  ) {
    const FilterVa = async (values: any) => {
      try {
        await getAutomobile.fetchAutomobile(values);
        automobile.value = getAutomobile.automobile;
        filterAutomible();
        openFiltre.value = false;
        chargement.value = false;
      } catch (error) {
        console.error((error as any).response?.data?.message);
      }
    };
    FilterVa({ IDProprietaire: LePropretaire });
  } else {
    fetchAutomobile();
  }
});

function filterAutomible() {
  visibleProduit.value = automobile.value.filter((automobile) => {
    return (
      !searchService.value ||
      automobile.nom
        .toLowerCase()
        .includes(searchService.value.toLowerCase()) ||
      automobile.Immatriculation.toLowerCase().includes(
        searchService.value.toLowerCase()
      )
    );
  });
}

const columns = [
  {
    title: "Nom",
    dataIndex: "nom",
    key: "nom",
  },
  {
    title: "Immatriculation",
    dataIndex: "Immatriculation",
    key: "Immatriculation",
  },
  {
    title: "Marque",
    key: "Marque",
    dataIndex: "Marque",
  },
  {
    title: "Model",
    key: "TypeAutomobile",
    dataIndex: "TypeAutomobile",
  },
  {
    title: "Genre",
    key: "Genre",
    dataIndex: "Genre",
  },
];
</script>
