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

        <template v-if="column.key === 'Adresse'">
          <div class="flex flex-row justify-between items-center">
            <span>
              {{ record.Adresse }}
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
                    class="font-[400] cursor-pointer hover:bg-[#FAFAFA]"
                    >Supprimer</DropdownMenuCheckboxItem
                  >
                  <DropdownMenuSeparator />
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

        <template v-if="column.key === 'Genre'">
          <div class="flex flex-row justify-between items-center">
            <span>
              {{ record.Genre }}
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
                    class="font-[400] cursor-pointer hover:bg-[#FAFAFA]"
                    >Supprimer</DropdownMenuCheckboxItem
                  >
                  <DropdownMenuSeparator />
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
