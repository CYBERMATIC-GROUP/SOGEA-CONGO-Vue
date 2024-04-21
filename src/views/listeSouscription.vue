<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">
        {{
          $route.path == "/impression-viniette"
            ? "Sélectionnez les souscriptions à imprimer"
            : "Liste des souscriptions"
        }}
      </h1>
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
      </div>
      <div>
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
import { type Souscription } from "@/model/souscription";
import { useSouscription } from "@/stores/souscription";
import router from "@/router";
import { useRoute } from "vue-router";

const searchService = ref("");
const visibleProduit = ref<Souscription[]>([]);
const souscription = ref<Souscription[]>([]);
const getsouscription = useSouscription();
const chargement = ref(true);

const fetchSouscription = async () => {
  if (!propretaire.value) {
    try {
      await getsouscription.fetchSouscription();
      souscription.value = getsouscription.sousciption;
      console.log(souscription.value);
      filterProprietaire();
      chargement.value = false;
    } catch (error) {
      console.error((error as any).response?.data?.message);
    }
  } else {
    const storageAdherentString: string | null =
      sessionStorage.getItem("idAutomobile");
    const idautomobile = ref(0);

    if (storageAdherentString) {
      idautomobile.value = Number(storageAdherentString);
    }

    try {
      let response = await getsouscription.fetchSouscriptionAutombile(
        idautomobile.value
      );
      souscription.value = response;
      filterProprietaire();
      chargement.value = false;
    } catch (error) {
      console.error((error as any).response?.data?.message);
    }
  }
};

const storageAdherentString: string | null = localStorage.getItem("Agent");
const propretaire = ref(false);

onMounted(() => {
  if (storageAdherentString !== null) {
    const storageAdherent: {
      Vehicule: [];
    } = JSON.parse(storageAdherentString);
    console.log("Agent Prénom:", storageAdherent);
    if (storageAdherent.Vehicule) {
      propretaire.value = true;
    }
  } else {
    console.log("Aucun agent trouvé dans le stockage local.");
  }
  fetchSouscription();
});

function filterProprietaire() {
  visibleProduit.value = souscription.value.filter((souscription) => {
    return (
      !searchService.value ||
      souscription.Proprietaire.toLowerCase().includes(
        searchService.value.toLowerCase()
      )
    );
  });
}

const pageSizeOptions = ref(["5", "10", "20", "50"]);
const pageSize = ref(5);
const handleChangePageSize = (current: any, size: any) => {
  pageSize.value = size;
};
const paginationText = {
  items_per_page: "éléments / page", // Custom text for "items per page" part
};

const columns = [
  {
    title: "Immatriculation",
    dataIndex: "Immatriculation",
    key: "Immatriculation",
  },
  {
    title: "Proprietaire",
    dataIndex: "Proprietaire",
    key: "Proprietaire",
  },
  {
    title: "Montant TTC",
    key: "CapitalInteret",
    dataIndex: "CapitalInteret",
  },
  {
    title: "Payé",
    key: "paye",
    dataIndex: "paye",
  },
  {
    title: "Reste",
    key: "Reste_Du",
    dataIndex: "Reste_Du",
  },
  {
    title: "Date de fin",
    key: "DateFin",
    dataIndex: "DateFin",
  },
];

const route = useRoute();

const emits = defineEmits(["imprimer"]);

const toggleImprimer = (data: any) => {
  emits("imprimer", data);
};

const Update = (data: any) => {
  if (route.path == "/impression-viniette") {
    toggleImprimer(data);
  } else {
    sessionStorage.setItem("souscription", JSON.stringify(data));
    router.push({ path: "/details-souscription" });
  }
};
</script>
