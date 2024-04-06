<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">Gestion souscription</h1>
    </div>
    <CardContent class="bg-white pt-6">
      <div class="flex flex-row space-x-3 px-5">
        <div class="w-[50%]">
          <div class="border grid grid-cols-1 divide-y-2">
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Immatriculation</p>
              <p class="text-black">: {{ data?.Immatriculation }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Proprietaire</p>
              <p class="text-black">: {{ data?.Proprietaire }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Date de souscription</p>
              <p class="text-black">:{{ data?.DateDebut }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Montant du prêt</p>
              <p class="text-black">
                : {{ formatNumber(Number(data?.MontantTotal)) }} XAF
              </p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Taux d'intérêt</p>
              <p class="text-black">:{{ data?.TauxInteret }} %</p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Intérêt</p>
              <p class="text-black">
                : {{ formatNumber(Number(data?.CoutPret)) }} XAF
              </p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Montant total</p>
              <p class="text-black">
                : {{ formatNumber(Number(data?.CapitalInteret)) }} XAF
              </p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Durée du prêt</p>
              <p class="text-black">: {{ data?.DureePret }}</p>
            </span>
          </div>
        </div>
        <div class="w-[50%]">
          <div class="border grid grid-cols-1 divide-y-2">
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Mensualité</p>
              <p class="text-black">
                : {{ formatNumber(Number(data?.Mensualite)) }} XAF
              </p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Duree en année</p>
              <p class="text-black">: {{ data?.DureeEnAnnee }}</p>
            </span>

            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>
                Commision <br />
                courtier/jour
              </p>
              <p class="text-black">
                : {{ formatNumber(Number(data?.Commiss_Courtier_Gest_Jour)) }}
                XAF
              </p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>
                Commision <br />
                courtier/an
              </p>
              <p class="text-black">
                :
                {{ formatNumber(Number(data?.Commiss_Courtier_Anneulle)) }} XAF
              </p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Date début</p>
              <p class="text-black">: {{ convertirDate(data?.DateDebut) }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>Date fin</p>
              <p class="text-black">: {{ convertirDate(data?.DateFin) }}</p>
            </span>
            <span class="flex flex-row justify-between px-4 items-center py-1">
              <p>QCM</p>
              <p class="text-black">
                : {{ formatNumber(Number(data?.QCM)) }} XAF
              </p>
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-row mx-5 px-4 mt-5 bg-[#73B1E7] py-2 font-[600]">
        <h2>Reste</h2>
        <h2 class="flex flex-row justify-center w-full">
          : {{ formatNumber(Number(data?.Reste_Du)) }}
          XAF
        </h2>
      </div>

      <div class="flex flex-row justify-between px-4 mt-5 space-x-5">
        <router-link to="/liste-souscription" class="w-full">
          <Button class="w-full bg-bg-primary">liste des souscription</Button>
        </router-link>
        <Button @click="SaveEcheance" class="w-full bg-bg-primary">
          Anticiper l'échéance</Button
        >
        <Button
          :loading="loading"
          :disabled="loading"
          @click="openPDF"
          class="w-full bg-bg-primary"
          >Imprimer</Button
        >
      </div>

      <h1 class="text-center font-[600] text-[1.5rem] my-5">
        Résumé des écheances
      </h1>
      <div>
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
                      ? 'bg-[#F3F6F9] dark:bg-gray-800 '
                      : 'bg-white dark:bg-gray-800 hover:bg-[#F3F6F9]'
                  "
                >
                  <td
                    v-for="column in columns"
                    :key="column.key"
                    class="text-center py-2 text-[.8rem]"
                  >
                    <span v-if="column.dataIndex == 'Numero'">
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
      </div>
    </CardContent>
  </Card>

  <Dialog v-if="open" v-model:open="open">
    <DialogContent class="min-w-[30rem] px-10">
      <div>
        <DialogTitle>Entrez le montant de versement</DialogTitle>
      </div>
      <form @submit.prevent="onSubmit">
        <InputForm
          label="Montant"
          type="number"
          id="Montant"
          v-model="moMontant"
          :valid="errors.moMontant"
          v-bind="moMontantAttrs"
          placeholder="Entrer le montant"
        />
        <p class="text-red-color pt-2">{{ errors.moMontant }}</p>
        <div class="flex space-x-5 justify-center mt-5">
          <Button :loading="loading" type="submit" class="w-full bg-bg-primary"
            >Valider le montant</Button
          >
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { ref, onMounted } from "vue";
import { type Souscription } from "@/model/souscription";
import { useSouscription } from "@/stores/souscription";
import InputForm from "../components/inputForm.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { getSuccess, getError } from "../common/notification";

const data = ref<Souscription>();
const open = ref(false);
const storageAdherentString = sessionStorage.getItem("souscription");

if (storageAdherentString !== null) {
  const storageAdherent = JSON.parse(storageAdherentString);
  data.value = storageAdherent;
}

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    moMontant: yup.string().required("Veuillez saisir votre motant."),
  }),
});

const [moMontant, moMontantAttrs] = defineField("moMontant");

const tabAmmortissement = ref([]);
const getSoustration = useSouscription();

onMounted(async () => {
  const donne = {
    IDSOUSCRIPTIONS: data.value?.IDSOUSCRIPTIONS,
  };
  try {
    let response = await getSoustration.fetchSolde(donne);
    console.log(response);
    tabAmmortissement.value = response;
  } catch (error) {
    console.log(error);
  }
});

function formatNumber(number: any): any {
  return number.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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

const calculateColumnTotal = (dataIndex: string) => {
  let total = 0;
  tabAmmortissement.value.forEach((row: any) => {
    total += row[dataIndex];
  });
  return total;
};

const columns: any[] = [
  {
    title: "Numero",
    dataIndex: "Numero",
    key: "Numero",
  },
  {
    title: "Mensualite",
    dataIndex: "Mensualite",
    key: "Mensualite",
  },
  {
    title: "Versement",
    dataIndex: "Versement",
    key: "Versement",
  },
  {
    title: "Capital Rembourse",
    dataIndex: "CapitalRembourse",
    key: "CapitalRembourse",
  },
  {
    title: "Interet",
    dataIndex: "Interet",
    key: "Interet",
  },
];

const loading = ref(false);

const openPDF = async () => {
  loading.value = true;
  const donne = {
    IDSOUSCRIPTIONS: data.value?.IDSOUSCRIPTIONS,
  };
  try {
    let response = await getSoustration.Imprime(
      Number(donne.IDSOUSCRIPTIONS),
      donne
    );
    console.log(response);
    loading.value = false;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        '<embed width="100%" height="100%" ' +
          'src="' +
          response.sEtat +
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

const SaveEcheance = async () => {
  open.value = true;
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  const montant = values.moMontant;
  console.log("Les datas : ", values);
  try {
    let response = await getSoustration.createEcheance(
      montant,
      Number(data.value?.IDSOUSCRIPTIONS),
      values
    );
    loading.value = false;
    open.value = false;
    console.log(response);
    getSuccess("Nouveau versement ajouté !");
  } catch (error) {
    console.error((error as any).response?.data?.fault?.detail);
    loading.value = false;
    getError((error as any).response?.data?.fault?.detail);
  }
});
</script>
