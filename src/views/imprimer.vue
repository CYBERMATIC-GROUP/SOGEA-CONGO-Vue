<template>
  <listeSouscription @imprimer="Selectionner" />
  <div class="bg-white mt-[-2rem] pb-5">
    <h1 class="text-center pt-5 font-[600] text-[1.3rem]">
      Viniettes à imprimer en fonction des souscriptions sélectionnées
    </h1>

    <div class="mt-5">
      <div class="px-4 mt-2">
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
                    ? 'bg-[#F3F6F9] dark:bg-gray-800 '
                    : 'bg-white dark:bg-gray-800 hover:bg-[#F3F6F9]'
                "
              >
                <td
                  v-for="column in columns"
                  :key="column.key"
                  class="text-center py-2 text-[.8rem]"
                >
                  <span v-if="column.dataIndex == 'CapitalInteret'">
                    {{ formatNumber(row[column.dataIndex]) }} XAF
                  </span>
                  <span v-else-if="column.dataIndex == 'Reste_Du'">
                    {{ formatNumber(row[column.dataIndex]) }} XAF
                  </span>
                  <span v-else>
                    {{ row[column.dataIndex] }}
                  </span>
                  <span
                    @click="deleteItem(row)"
                    v-if="column.dataIndex == 'Action'"
                    ><i class="fa fa-trash text-red-400 cursor-pointer"></i
                  ></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="mt-8 mx-5">
      <Button
        :loading="loading"
        @click="openPDF"
        :disabled="tabAmmortissement.length < 1 || loading"
        class="w-full bg-bg-primary"
        >Lancer l'impression de(s) viniette(s)</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import listeSouscription from "./listeSouscription.vue";
import { ref } from "vue";
import type { Souscription } from "@/model/souscription";
import { useSouscription } from "@/stores/souscription";
import { Button } from "@/components/ui/button";

const tabAmmortissement = ref<any[]>([]);
const getSouscription = useSouscription();
const loading = ref(false);

const Selectionner = (data: any) => {
  if (
    !tabAmmortissement.value.some(
      (element: any) => element.IDSOUSCRIPTIONS === data.IDSOUSCRIPTIONS
    )
  ) {
    tabAmmortissement.value.push(data);
  }
};

function formatNumber(number: any): any {
  return number.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const deleteItem = (data: any) => {
  let nouveauTableau = tabAmmortissement.value.filter(
    (objet) => objet.IDAutomobiles !== data.IDAutomobiles
  );
  tabAmmortissement.value = nouveauTableau;
};

const columns: any[] = [
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
    title: "Reste",
    key: "Reste_Du",
    dataIndex: "Reste_Du",
  },
  {
    title: "Action",
    dataIndex: "Action",
    key: "Action",
  },
];

const openPDF = async () => {
  loading.value = true;

  try {
    let response = await getSouscription.fetchImprime(
      tabAmmortissement.value[0].IDSOUSCRIPTIONS
    );
    console.log(response);
    loading.value = false;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        '<embed width="100%" height="100%" ' +
          'src="' +
          response.Etat +
          '" ' +
          'type="application/pdf" />'
      );
    } else {
      alert(
        "Votre navigateur bloque l'ouverture de nouvelle fenêtre. Veuillez autoriser les pop-ups pour cette page."
      );
    }
  } catch (error) {
    loading.value = false;
  }
};
</script>
