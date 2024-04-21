<template>
  <a-config-provider :locale="locale">
    <a-table
      size="small"
      :row-class-name="
        (_record: any, index : any) => (index % 2 === 1 ? 'bg-[#F3F6F9]' : null)
      "
      :loading="chargement"
      class="mt-5"
      :columns="columns"
      :data-source="visibleProduit"
      :pagination="{
        pageSize: pageSize,
        total: visibleProduit.length,
        pageSizeOptions: pageSizeOptions,
        defaultPageSize: 3,
        showSizeChanger: true,
        locale: paginationText,
        onShowSizeChange: handleChangePageSize,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'Civilite'">
          <p>{{ record.Civilite == 1 ? "M" : "Mme" }}</p>
        </template>

        <template v-if="column.key === 'paye'">
          <p>{{ formatNumber(record.CapitalInteret - record.Reste_Du) }} XAF</p>
        </template>

        <template v-if="column.key === 'CapitalInteret'">
          <p>{{ formatNumber(record.CapitalInteret) }} XAF</p>
        </template>

        <template v-if="column.key === 'Reste_Du'">
          <p>{{ formatNumber(record.Reste_Du) }} XAF</p>
        </template>

        <template v-if="column.key === 'DateEcheance'">
          <p>
            {{ convertirDateEnFrancais(record.DateEcheance) }}
          </p>
        </template>

        <template v-if="column.key === 'DateHeure'">
          <p>
            {{ convertirDateEnFrancaisHeure(record.DateHeure) }}
          </p>
        </template>

        <template
          v-if="column.key === 'DateFin' && $route.path == '/liste-objectif'"
        >
          <p>
            {{ convertirDateEnFrancais(record.DateFin) }}
          </p>
        </template>

        <template
          v-if="column.key === 'DateDebut' && $route.path == '/liste-objectif'"
        >
          <p>
            {{ convertirDateEnFrancais(record.DateDebut) }}
          </p>
        </template>

        <template v-if="column.key === columns[columns.length - 1].key">
          <div class="flex flex-row justify-between items-center">
            <span
              v-if="column.key === 'DateFin' || column.key === 'DateDelivrance'"
            >
              <p v-if="column.key === 'DateFin'">
                {{ convertirDateEnFrancais(record.DateFin) }}
              </p>
              <p v-else>{{ convertirDateEnFrancais(record.DateDelivrance) }}</p>
            </span>
            <span v-else>
              {{ record[columns[columns.length - 1].key] }}
            </span>
            <span>
              <DropdownMenu
                v-if="
                  $route.path != '/consultation-compte' &&
                  $route.path != '/consultation-caisse'
                "
              >
                <DropdownMenuTrigger as-child>
                  <button>
                    <i class="fa-solid fa-ellipsis-vertical me-5"></i>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  :class="[
                    'w-56',
                    'me-[5rem]',
                    $route.path ===
                      '/nouvelle-souscription/renouvelement-contrat' ||
                    $route.path === '/amortissement' ||
                    $route.path === '/nouvelle-souscription'
                      ? 'me-[8.4rem]'
                      : '',
                  ]"
                >
                  <DropdownMenuCheckboxItem
                    @click="toggleOpenDelete(record)"
                    v-if="
                      $route.path !=
                        '/nouvelle-souscription/renouvelement-contrat' &&
                      $route.path != '/liste-souscription' &&
                      $route.path != '/amortissement' &&
                      $route.path != '/nouvelle-souscription' &&
                      $route.path != '/commande' &&
                      $route.path != '/impression-viniette'
                    "
                    class="font-[400] cursor-pointer hover:bg-[#FAFAFA]"
                    >{{
                      !propretaire ? "Supprimer" : "Assurence"
                    }}</DropdownMenuCheckboxItem
                  >
                  <DropdownMenuSeparator
                    v-if="
                      $route.path !=
                        '/nouvelle-souscription/renouvelement-contrat' &&
                      $route.path != '/liste-souscription' &&
                      $route.path != '/amortissement' &&
                      $route.path != '/nouvelle-souscription' &&
                      $route.path != '/commande' &&
                      $route.path != '/impression-viniette'
                    "
                  />
                  <DropdownMenuCheckboxItem
                    @click="Update(record)"
                    class="font-[400] cursor-pointer hover:bg-[#FAFAFA]"
                  >
                    {{
                      $route.path == "/impression-viniette"
                        ? "Sélectionner"
                        : $route.path == "/liste-souscription"
                        ? "Afficher"
                        : !propretaire
                        ? "Afficher"
                        : "Comptabilité"
                    }}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        </template>
      </template>

      <template
        v-if="
          $route.path == '/consultation-compte' ||
          $route.path == '/consultation-caisse'
        "
        #footer
      >
        <div
          v-if="totaux"
          class="bg-[#73B1E7] py-3 flex text-white space-x-5 justify-between"
        >
          <p class="font-[600]">Solde de la période sélectionner:</p>
          <div class="flex space-x-6 text-white">
            <p>
              <span class="pe-3">Total Débit</span>
              {{ formatNumber(totaux?.TotalDebit) }} XAF
            </p>
            <p>
              <span class="pe-3">Total Crédit</span>
              {{ formatNumber(totaux?.TotalCredit) }} XAF
            </p>
          </div>
        </div>
      </template>
    </a-table>
  </a-config-provider>
</template>

<script setup lang="ts">
import frFR from "ant-design-vue/es/locale/fr_FR";
import { ref } from "vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { defineEmits } from "vue";
const locale = frFR;

const emits = defineEmits(["deleteFunction", "updateFunction"]);

const toggleOpenDelete = (data: any) => {
  emits("deleteFunction", data);
};

const Update = (data: any) => {
  emits("updateFunction", data);
};

function formatNumber(number: any): any {
  return number.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function convertirDateEnFrancais(dateString: string): string {
  const date: Date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("fr-FR", options);
}

function convertirDateEnFrancaisHeure(dateString: any) {
  const date = new Date(dateString);
  const options: any = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Format 24 heures
  };

  return date.toLocaleDateString("fr-FR", options);
}

const storageAdherentString: string | null = localStorage.getItem("Agent");

const propretaire = ref(false);
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

const {
  chargement,
  columns,
  visibleProduit,
  pageSize,
  pageSizeOptions,
  paginationText,
  handleChangePageSize,
  totaux,
} = defineProps([
  "chargement",
  "columns",
  "visibleProduit",
  "pageSize",
  "pageSizeOptions",
  "paginationText",
  "handleChangePageSize",
  "totaux",
]);
</script>
