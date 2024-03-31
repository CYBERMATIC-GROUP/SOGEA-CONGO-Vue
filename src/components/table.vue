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

        <template v-if="column.key === columns[columns.length - 1].key">
          <div class="flex flex-row justify-between items-center">
            <span v-if="column.key === 'DateFin'">
              <p>{{ convertirDateEnFrancais(record.DateFin) }}</p>
            </span>
            <span v-else>
              {{ record[columns[columns.length - 1].key] }}
            </span>
            <span>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <button>
                    <i class="fa-solid fa-ellipsis-vertical me-5"></i>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56 me-[5rem]">
                  <DropdownMenuCheckboxItem
                    @click="toggleOpenDelete(record)"
                    v-if="
                      $route.path !=
                        '/nouvelle-souscription/renouvelement-contrat' &&
                      $route.path != '/liste-souscription' &&
                      $route.path != '/amortissement' &&
                      $route.path != '/nouvelle-souscription'
                    "
                    class="font-[400] cursor-pointer hover:bg-[#FAFAFA]"
                    >Supprimer</DropdownMenuCheckboxItem
                  >
                  <DropdownMenuSeparator
                    v-if="
                      $route.path !=
                        '/nouvelle-souscription/renouvelement-contrat' &&
                      $route.path != '/liste-souscription' &&
                      $route.path != '/amortissement' &&
                      $route.path != '/nouvelle-souscription'
                    "
                  />
                  <DropdownMenuCheckboxItem
                    @click="Update(record)"
                    class="font-[400] cursor-pointer hover:bg-[#FAFAFA]"
                  >
                    Afficher
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        </template>
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

const {
  chargement,
  columns,
  visibleProduit,
  pageSize,
  pageSizeOptions,
  paginationText,
  handleChangePageSize,
} = defineProps([
  "chargement",
  "columns",
  "visibleProduit",
  "pageSize",
  "pageSizeOptions",
  "paginationText",
  "handleChangePageSize",
]);
</script>
