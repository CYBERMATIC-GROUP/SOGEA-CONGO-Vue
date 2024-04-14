<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">
        Consultation de compte
      </h1>
    </div>
    <CardContent class="bg-white">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row space-x-3 items-center">
          <label for="Compte" class="mt-5">Compte :</label>
          <div class="w-[20rem]">
            <InputForm
              type="text"
              id="Compte"
              v-model="codeCompte"
              :cacher="true"
              :uppercase="true"
              placeholder="Numéro de compte"
            />
          </div>
        </div>
        <div class="flex flex-row space-x-3 items-center">
          <label for="periode" class="mt-5">Période Du</label>
          <div class="">
            <InputForm
              type="date"
              id="periode"
              v-model="dateDebut"
              :cacher="true"
              :uppercase="true"
            />
          </div>
        </div>
        <div class="flex flex-row space-x-3 items-center">
          <label for="Compte" class="mt-5">Au :</label>
          <div class="">
            <InputForm
              type="date"
              v-model="dateFin"
              id="Compte"
              :cacher="true"
              :uppercase="true"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-row space-x-5 justify-between my-5">
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            type="text"
            v-model="searchCompte"
            @input="filterCompte"
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
          <Button class="w-full bg-bg-primary"
            >Imprimer l'historique des comptes
          </Button>
        </div>
        <div class="w-[20rem]">
          <Button
            @click="afficher"
            :loading="loading"
            :disabled="loading || codeCompte == ''"
            class="w-full bg-bg-primary"
            >AFFICHER
          </Button>
        </div>
      </div>
      <div>
        <Dialog v-if="open" v-model:open="open">
          <DialogContent class="min-w-[70rem]">
            <FormObjectif />
          </DialogContent>
        </Dialog>

        <Table
          :totaux="totaux"
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
  <Dialog v-model:open="selectDate">
    <DialogContent class="min-w-[30rem] bg-red-300 border border-red-300">
      <p>Veillez sélectionner la période.</p>
    </DialogContent>
  </Dialog>
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
import FormObjectif from "../components/formObjectif.vue";
import InputForm from "../components/inputForm.vue";
import type { Ecriture } from "@/model/Ecriture";
import { useCompte } from "@/stores/compte";

const selectDate = ref(false);
const pageSizeOptions = ref(["5", "10", "20", "50"]);
const pageSize = ref(5);
const handleChangePageSize = (current: any, size: any) => {
  pageSize.value = size;
};
const paginationText = {
  items_per_page: "éléments / page", // Custom text for "items per page" part
};
const loading = ref(false);
const openCreate = ref(false);

const searchCompte = ref("");
const deleteOpen = ref(false);
const open = ref(false);

const getObjectif = useObjectif();
const Compte = ref<Ecriture[]>([]);
const visibleProduit = ref<Ecriture[]>([]);
const compte = useCompte();
const chargement = ref(true);

function formatDateISO(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const dateDebut = ref();
const dateFin = ref();

const dateChamp = document.getElementById("dateChamp");
const dateString = "20240101";
const year = parseInt(dateString.substring(0, 4));
const month = parseInt(dateString.substring(4, 6)) - 1; // Soustraire 1 car les mois sont indexés à partir de 0
const day = parseInt(dateString.substring(6, 8));
const datePreRemplie = new Date(year, month, day);
// dateDebut.value = formatDateISO(datePreRemplie);

const codeCompte = ref("");

const DefaulValue = {
  DateDebut: "",
  DateFin: dateFin.value,
  CodeCompte: codeCompte.value,
  nModePaiment: 1,
};

const afficher = async () => {
  if (dateDebut.value !== undefined) {
    chargement.value = true;
    loading.value = true;
    try {
      let response = await compte.fetchCompte({
        DateDebut: dateDebut.value,
        "DateFin ": dateFin.value,
        CodeCompte: codeCompte.value,
        nModePaiment: 1,
      });
      Compte.value = compte.ecriture;
      totaux.value = response.Totaux;
      console.log(Compte.value);
      filterCompte();
      loading.value = false;
      chargement.value = false;
    } catch (error) {
      loading.value = false;
      console.error((error as any).response?.data?.message);
    }
  } else {
    selectDate.value = true;
  }
};

interface Totaux {
  TotalDebit: number;
  TotalCredit: number;
}

const totaux = ref<Totaux>();

const fetchCompte = async () => {
  try {
    let response = await compte.fetchCompte(DefaulValue);
    Compte.value = compte.ecriture;
    console.log(response);
    filterCompte();
    totaux.value = response.Totaux;
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
  }
};

onMounted(fetchCompte);

const handleUpdateOpenDelete = (value: any) => {
  deleteOpen.value = value;
};

function filterCompte() {
  visibleProduit.value = Compte.value.filter((Compte) => {
    return (
      !searchCompte.value ||
      Compte.LibelleEcriture.toLowerCase().includes(
        searchCompte.value.toLowerCase()
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

const columns = [
  {
    title: "Date comptable",
    dataIndex: "DateHeure",
    key: "DateHeure",
  },
  {
    title: "Utilisateur",
    dataIndex: "Utilisateur",
    key: "Utilisateur",
  },
  {
    title: "N° MVT",
    dataIndex: "NumeroMouvement",
    key: "NumeroMouvement",
  },
  {
    title: "Libellé",
    key: "LibelleEcriture",
    dataIndex: "LibelleEcriture",
  },
  {
    title: "Débit ",
    key: "MontantDebit",
    dataIndex: "MontantDebit",
  },
  {
    title: "Crédit",
    key: "MontantCredit",
    dataIndex: "MontantCredit",
  },
];

const handleUpdate = (value: any) => {
  open.value = value;
};
</script>
