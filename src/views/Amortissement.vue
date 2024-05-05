<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl mb-5">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">Amortissement</h1>
    </div>
    <CardContent class="bg-white pt-3 px-0">
      <div class="flex flex-row space-x-3 px-5">
        <div class="w-[50%]">
          <div class="flex flex-col space-y-5">
            <InputForm
              label="Date de validité"
              type="date"
              v-model="date"
              @input="toggleInput"
              id="Date de validité"
              placeholder="Entrer la date de validité"
            />
            <Button @click="toogleAutomobile" class="w-full bg-bg-primary"
              >Cliquer ici pour Sélectionner un véhicule</Button
            >
            <div class="border grid grid-cols-1 divide-y">
              <h1 class="text-center font-semibold text-[1.2rem]">Assuré</h1>
              <span
                class="flex flex-row justify-between px-4 py-1 items-center"
              >
                <p>Nom</p>
                <p class="">: {{ data.nom }}</p>
              </span>
              <span
                class="flex flex-row justify-between px-4 py-1 items-center"
              >
                <p>Prénoms</p>
                <p class="">: {{ data.P_Prenom }}</p>
              </span>
              <span
                class="flex flex-row justify-between px-4 py-1 items-center"
              >
                <p>Fonction :</p>
                <p class=""></p>
              </span>
              <span
                class="flex flex-row justify-between px-4 py-1 items-center"
              >
                <p>Adresse :</p>
                <p class=""></p>
              </span>
            </div>
          </div>
        </div>
        <div class="w-[50%]">
          <div class="border grid grid-cols-1 divide-y">
            <h1 class="text-center font-semibold text-[1.2rem]">Véhicule</h1>
            <span class="flex flex-row justify-between px-4 py-1">
              <p>Immatriculation</p>
              <p class="">: {{ data.Immatriculation }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 py-1">
              <p>Type</p>
              <p class="">: {{ data.TypeAutomobile }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 py-1">
              <p>Marque</p>
              <p class="">: {{ data.MarqueAutomobile }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 py-1">
              <p>Genre</p>
              <p class="">: {{ data.Genre }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 py-1">
              <p>Source d'énergie</p>
              <p class="">: {{ data.SourceEnergie }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 py-1">
              <p>Année de première mise en service</p>
              <p class="">: {{ data.AnneeConstruction }}</p>
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-between mt-3">
        <div
          class="w-[50%] flex flex-row px-4 justify-between items-center cursor-pointer hover:bg-[#F3F6F9] py-2"
        >
          <p class="w-[18rem] pt-3">Versement</p>
          <InputForm
            type="number"
            class="pb-2"
            :cacher="true"
            id="montant"
            placeholder="Montant ici"
          />
        </div>
        <div
          class="w-[50%] flex flex-row px-4 justify-between items-center cursor-pointer hover:bg-[#F3F6F9]"
        >
          <p class="w-[18rem] pt-3">Revenue Net</p>
          <InputForm
            type="number"
            class="pb-2"
            :cacher="true"
            id="montant"
            placeholder="Montant ici"
          />
        </div>
      </div>
      <div>
        <h1 class="text-center text-[1.3rem] font-semibold pb-2 mt-3">
          Caractéristiques de votre prêt
        </h1>
        <hr />
        <div class="flex flex-row justify-between space-x-5 px-5 pt-3">
          <div class="flex flex-col space-y-2">
            <p class="text-[.8rem] font-[600]">
              Montant du prêt : {{ parametre?.MontantDuPret }} XAF
            </p>
            <p class="text-[.8rem] font-[600]">
              Taux d'intérêt : {{ parametre?.TauxInteretAnnuel }} %
            </p>
            <p class="text-[.8rem] font-[600]">
              Coût du prêt : {{ parametre?.MontantDuPret }} XAF
            </p>
            <p class="text-[.8rem] font-[600]">
              Montant total : {{ parametre?.CapitalPlusInteret }} XAF
            </p>
            <p class="text-[.8rem] font-[600]">Revenu mensuel Net :</p>
            <p class="text-[.8rem] font-[600]">QCM :</p>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="text-[.8rem] font-[600]">
              Mensualité : {{ parametre?.MontantCapitalMensuel }} XAF
            </p>
            <p class="text-[.8rem] font-[600]">
              Nombre de mensualités prévues :
              {{ parametre?.NbreMensualiteParAn }}
            </p>
            <p class="text-[.8rem] font-[600]">
              Prélévement Capital remboursé + Intérêts/Jours :
              {{ convertirDateEnFrancais(date) }}
            </p>
            <p class="text-[.8rem] font-[600]">
              Commissions Courtier-Gestionnaire/Jour :
              {{ convertirDateEnFrancais(date) }}
            </p>
            <p class="text-[.8rem] font-[600]">
              Montant des intérêts : {{ convertirDateEnFrancais(date) }}
            </p>
          </div>
          <div class="flex flex-col space-y-2">
            <p class="text-[.8rem] font-[600]">
              Synthèse des prélèvements journaliers
            </p>
            <p class="text-[.8rem] font-[600]">
              Capital remboursé + Intérêts :
            </p>
            <p class="text-[.8rem] font-[600]">Commissions Courtier :</p>
            <p class="text-[.8rem] font-[600]">Autres</p>
            <p class="text-[.8rem] font-[600]">
              Total prélèvements journaliers :
            </p>
          </div>
        </div>
        <hr class="mt-2" />
      </div>

      <div>
        <h1 class="text-center text-[1.3rem] font-semibold pb-2 mt-3">
          Tableau d'amortissement
        </h1>
      </div>

      <div class="px-4 mt-2" v-if="tabAmmortissement.length > 0">
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <!-- Utilisation de `columns` pour générer les en-têtes de colonnes -->
                <th
                  v-for="column in columns"
                  :key="column.key"
                  scope="col"
                  class="px-1 py-3 border-r border-b font-[500]"
                >
                  {{ column.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in tabAmmortissement"
                :key="index"
                :class="
                  index % 2 === 1
                    ? 'bg-[#F3F6F9] dark:bg-gray-800'
                    : 'bg-white dark:bg-gray-800'
                "
              >
                <td
                  v-for="column in columns"
                  :key="column.key"
                  class="text-center py-2 text-[.8rem]"
                >
                  <span v-if="column.dataIndex == 'DateEcheance'">{{
                    convertirDate(row[column.dataIndex])
                  }}</span>
                  <span v-else-if="column.dataIndex == 'NumeroEcheance'">
                    {{ row[column.dataIndex] }}
                  </span>
                  <span v-else>
                    {{ formatNumber(row[column.dataIndex]) }}
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <template
                  v-for="(column, columnIndex) in columns"
                  :key="columnIndex"
                >
                  <td class="px-6 py-4 border-t bg-[#7DB6E8] text-white">
                    <!-- Afficher "Total" une seule fois à gauche -->
                    <template v-if="columnIndex === 0"> Total </template>
                    <!-- Calculer le total pour les autres colonnes -->
                    <template
                      v-else-if="
                        column.dataIndex !== 'NumeroEcheance' &&
                        column.dataIndex !== 'DateEcheance'
                      "
                    >
                      <p class="text-[.8rem]">
                        {{
                          formatNumber(calculateColumnTotal(column.dataIndex))
                        }}
                        XAF
                      </p>
                    </template>
                  </td>
                </template>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div v-if="loadingData">
        <!-- <a-spin /> -->
        <div
          class="fixed w-screen min-h-[100vh] backdrop-blur-sm bg-white/30 top-[50%] left-[50%]"
          style="transform: translate(-50%, -50%)"
        >
          <div class="w-screen h-screen flex items-center justify-center">
            <a-spin />
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-between px-4 mt-5 space-x-5">
        <Button
          @click="toogleSouscription"
          :disabled="tabAmmortissement.length < 1"
          class="w-full bg-bg-primary"
          >Valider le contrat</Button
        >
        <Button
          :disabled="tabAmmortissement.length < 1"
          @click="openPDF"
          class="w-full bg-bg-primary"
          >Imprimer</Button
        >
        <router-link to="/liste-souscription" class="w-full">
          <Button class="w-full bg-bg-primary">Liste des souscriptions</Button>
        </router-link>
      </div>
    </CardContent>
  </Card>

  <Dialog v-if="open" v-model:open="open">
    <DialogContent class="min-w-[30rem] px-10">
      <div>
        <DialogTitle>Voulez-vous enregistrer ce contrat ?</DialogTitle>
      </div>
      <div class="flex space-x-5 justify-center mt-5">
        <DialogClose class="w-full">
          <Button
            class="w-full bg-transparent border hover:text-white border-black text-black rounded-md"
            >Non</Button
          >
        </DialogClose>
        <Button
          :loading="loading"
          @click="SouscriptionSave"
          type="submit"
          class="w-full bg-bg-primary"
          >Oui</Button
        >
      </div>
    </DialogContent>
  </Dialog>

  <Dialog v-if="openAutomobile" v-model:open="openAutomobile">
    <DialogContent class="sm:min-w-[60rem] pt-5">
      <AutomobileListe @notification="notification" />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputForm from "../components/inputForm.vue";
import { ref, watch, onMounted } from "vue";
import { type ParametreGeneral } from "@/model/parametreGenerale";
import { useCalcul } from "@/stores/calculAmortissement";
import Table from "../components/table.vue";
import AutomobileListe from "./AutomobileListe.vue";
import { type XEcheancierAnnuelItem } from "../model/XEcheancierAnnuel";
import { getSuccess, getError } from "../common/notification";
import { useAutomobile } from "@/stores/automobile";

const data = ref();
const open = ref(false);
const openAutomobile = ref(false);
const loadingData = ref(false);

const toogleAutomobile = () => {
  openAutomobile.value = true;
};

const storageAdherentString = sessionStorage.getItem("amortissement");

if (storageAdherentString !== null) {
  const storageAdherent = JSON.parse(storageAdherentString);
  data.value = storageAdherent;
}

const calculateColumnTotal = (dataIndex: string) => {
  let total = 0;
  tabAmmortissement.value.forEach((row: any) => {
    total += row[dataIndex];
  });
  return total;
};

function formatNumber(number: any): any {
  return number.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const date = ref();

const chargement = ref(true);

const parametre = ref<ParametreGeneral>();
const getCalcul = useCalcul();

const tabAmmortissement = ref<any[]>([]);
const pdf = ref();

const toggleInput = async () => {
  chargement.value = true;
  loadingData.value = true;
  let dateStringSansTirets = date.value.replace(/-/g, "");
  const donne = {
    nIDProduit: data.value.IDProduit,
    nDateDebut: dateStringSansTirets,
    bImprimeEtat: data.value.Etat,
    nIDVéhicule: data.value.IDAutomobiles,
  };
  try {
    let response = await getCalcul.CalculAmortissement(
      data.value.IDProduit,
      dateStringSansTirets,
      data.value.Etat,
      data.value.IDAutomobiles,
      donne
    );
    console.log(response);
    chargement.value = false;
    loadingData.value = false;
    tabAmmortissement.value = response.XECHEANCIER_MENSUEL;
    parametre.value = response.ParametreGeneral;
    console.log(response.sEtat);
    pdf.value = response.sEtat;
    console.log(parametre.value);
  } catch (error) {
    loadingData.value = false;
    getError((error as any).response?.data?.fault?.detail);
    console.log(error);
  }
};

const loading = ref(false);

const SouscriptionSave = async () => {
  loading.value = true;
  let dateStringSansTirets = date.value.replace(/-/g, "");
  const donne = {
    nIDProduit: data.value.IDProduit,
    nDateDebut: dateStringSansTirets,
    bImprimeEtat: data.value.Etat,
    nIDVéhicule: data.value.IDAutomobiles,
  };
  try {
    let response = await getCalcul.CalculSouscription(
      data.value.IDProduit,
      dateStringSansTirets,
      data.value.Etat,
      data.value.IDAutomobiles,
      donne
    );
    console.log(response);
    open.value = false;
    loading.value = false;
    getSuccess("Enregistrer avec succèss");
  } catch (error) {
    open.value = false;
    loading.value = false;
    getError((error as any).response?.data?.fault?.detail);
  }
};

const toogleSouscription = () => {
  open.value = true;
};

console.log(parametre.value);

function convertirDateEnFrancais(dateString: string): string {
  const date: Date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("fr-FR", options);
}

function convertirDate(dateString: any): any {
  const date: Date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("fr-FR", options);
}

const pageSizeOptions = ref(["5", "10", "20", "50"]);
const pageSize = ref(5);
const handleChangePageSize = (current: any, size: any) => {
  pageSize.value = size;
};
const paginationText = {
  items_per_page: "éléments / page", // Custom text for "items per page" part
};

const columns: any[] = [
  {
    title: "N॰",
    key: "NumeroEcheance",
    dataIndex: "NumeroEcheance",
  },
  {
    title: "Date écheance",
    dataIndex: "DateEcheance",
    key: "DateEcheance",
  },
  {
    title: "Solde initial",
    key: "SoldeInitial",
    dataIndex: "SoldeInitial",
  },
  {
    title: "Mensualités",
    dataIndex: "Mensualites",
    key: "Mensualites",
  },
  {
    title: "Interet",
    key: "MontantInteretsCumules",
    dataIndex: "MontantInteretsCumules",
  },
  {
    title: "Capital",
    key: "MontantCapitalMensuel",
    dataIndex: "MontantCapitalMensuel",
  },
  {
    title: "Reste",
    key: "ResteDu",
    dataIndex: "ResteDu",
  },
  {
    title: "Interret cumulé",
    key: "MontantInteretsMensuel",
    dataIndex: "MontantInteretsMensuel",
  },
];

const openPDF = () => {
  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(
      '<embed width="100%" height="100%" ' +
        'src="' +
        pdf.value +
        '" ' +
        'type="application/pdf" />'
    );
  } else {
    alert(
      "Votre navigateur bloque l'ouverture de nouvelle fenêtre. Veuillez autoriser les pop-ups pour cette page."
    );
  }
};

const notification = (donne: any) => {
  data.value = donne;
  openAutomobile.value = false;
};

watch(data, (newValue, oldValue) => {
  data.value = newValue;
  console.log(data.value);
  // toggleInput();
});

const getAutomobile = useAutomobile();

onMounted(async () => {
  const storage = sessionStorage.getItem("amortissement");
  if (storage !== null) {
    const storageAmortissement = JSON.parse(storage);
    const id = storageAmortissement.IDAutomobiles;
    try {
      let response = await getAutomobile.OneAutomobile(id);
      data.value = response;
    } catch (error) {
      getError((error as any).response?.data?.fault?.detail);
    }
  }
});
</script>
