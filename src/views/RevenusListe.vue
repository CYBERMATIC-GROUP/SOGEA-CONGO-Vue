<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div
      class="w-full h-[2rem] select-none flex-col justify-center items-center"
    >
      <h1 class="font-[600] text-white text-[1.3rem] text-center">
        Revenus statistiques
      </h1>
    </div>
    <CardContent class="bg-white">
      <div class="pt-5">
        <div class="px-4 mt-2" v-if="tabAmmortissement.length > 0">
          <div class="relative overflow-x-auto">
            <table
              class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
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
                    :class="[
                      'text-center py-2 text-[.8rem] bg-[' + row.Couleur + ']',
                    ]"
                  >
                    <span v-if="column.dataIndex == 'Annee'">{{
                      row[column.dataIndex]
                    }}</span>
                    <span v-else>
                      {{ formatNumber(row[column.dataIndex]) }} XAF
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="flex justify-center">
          <a-spin />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { onMounted } from "vue";
import { ref } from "vue";
import type { Revenus } from "@/model/revenus";
import { useRevenus } from "@/stores/revenus";

const getObjectif = useRevenus();
const revenus = ref<Revenus[]>([]);
const tabAmmortissement = ref<Revenus[]>([]);
const chargement = ref(true);

const fetchRevenus = async () => {
  try {
    await getObjectif.fetchRevenus();
    revenus.value = getObjectif.revenus;
    tabAmmortissement.value = getObjectif.revenus;
    console.log(revenus.value);
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
  }
};

function formatNumber(number: any): any {
  return number.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

onMounted(fetchRevenus);

const columns: any = [
  {
    title: "Année",
    dataIndex: "Annee",
    key: "Annee",
  },
  {
    title: "Seuil rentabilité",
    dataIndex: "SeuilRent",
    key: "SeuilRent",
  },
  {
    title: "Attendu",
    key: "Attendu",
    dataIndex: "Attendu",
  },
  {
    title: "Déjà reçu",
    key: "DejaRecu",
    dataIndex: "DejaRecu",
  },
  {
    title: "Reste",
    key: "ResteDu",
    dataIndex: "ResteDu",
  },
  {
    title: "Ecart",
    key: "Ecart",
    dataIndex: "Ecart",
  },
  {
    title: "Ecart1",
    key: "Ecart1",
    dataIndex: "Ecart1",
  },
];
</script>
