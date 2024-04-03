<template>
  <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl">
    <div class="w-full h-[2rem] select-none flex justify-center items-center">
      <h1 class="font-[600] text-white text-[1.3rem]">
        Gestion des utilisateurs
      </h1>
    </div>
    <CardContent class="bg-white">
      <div class="pt-5 flex flex-row space-x-5 justify-between">
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            type="text"
            v-model="searchSociete"
            @input="filterAgent"
            placeholder="Rechercher par ici"
            class="pl-10"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
        <div @click="HandleOpen" class="w-[20rem]">
          <Button class="w-full bg-bg-primary">Ajouter un utilisateur</Button>
        </div>
      </div>

      <div>
        <Dialog v-if="openCreate" v-model:open="openCreate">
          <DialogContent
            class="min-w-[70rem] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
          >
            <div class="w-full rounded-xl mt-10">
              <div
                class="w-full shadow-md bg-[#73B1E7] h-[2rem] select-none flex justify-center items-center"
              >
                <h1 class="font-[600] text-white text-[1.3rem]">
                  Fiche de l'Agent
                </h1>
              </div>
              <div class="bg-transparent grid gap-4 px-6">
                <div class="">
                  <FormAgent
                    :update="true"
                    @RefrehFunction="fetchAgent"
                    @updateopenUpdate="updateopenUpdate"
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog v-if="open" v-model:open="open">
          <DialogContent class="min-w-[70rem]">
            <Card class="w-full shadow-md bg-[#73B1E7] rounded-xl mt-5">
              <div
                class="w-full h-[2rem] select-none flex justify-center items-center"
              >
                <h1 class="font-[600] text-white text-[1.3rem]">
                  Modifier une station point de vente
                </h1>
              </div>
              <CardContent class="bg-white">
                <FormAgent
                  @RefrehFunction="fetchAgent"
                  @updateopenUpdate="updateopenUpdate"
                />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>

        <Dialog v-if="deleteOpen" v-model:open="deleteOpen">
          <deleteAgent
            @updateopenDelete="handleUpdateOpenDelete"
            @RefrehFunction="fetchAgent"
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
import { usePointDeVente } from "@/stores/pointDeVente";
import { useAgent } from "@/stores/agent";
import type { Agent } from "@/model/agent";
import type { PointDeVente } from "@/model/pointDeVente";
import FormAgent from "../components/FormAgent.vue";
import deletePointDeVente from "../components/deletepointDeVente.vue";
import FormPointVente from "../components/FormPointVente.vue";
import deleteAgent from "../components/deleteAgent.vue";

const pageSizeOptions = ref(["5", "10", "20", "50"]);
const pageSize = ref(5);
const handleChangePageSize = (current: any, size: any) => {
  pageSize.value = size;
};
const paginationText = {
  items_per_page: "éléments / page", // Custom text for "items per page" part
};

const openCreate = ref(false);

const searchSociete = ref("");
const deleteOpen = ref(false);
const open = ref(false);

const getAgent = useAgent();
const agent = ref<Agent[]>([]);
const visibleProduit = ref<Agent[]>([]);
const chargement = ref(true);

const fetchAgent = async () => {
  try {
    await getAgent.fetchAgent();
    agent.value = getAgent.agent;
    console.log(agent.value);
    filterAgent();
    chargement.value = false;
  } catch (error) {
    console.error((error as any).response?.data?.message);
  }
};

onMounted(async () => {
  fetchAgent();
});

const handleUpdateOpenDelete = (value: any) => {
  deleteOpen.value = value;
};

function filterAgent() {
  visibleProduit.value = agent.value.filter((agent) => {
    return (
      !searchSociete.value ||
      agent.Nom.toLowerCase().includes(searchSociete.value.toLowerCase()) ||
      agent.Prenom.toLowerCase().includes(searchSociete.value.toLowerCase()) ||
      agent.Adresse.toLowerCase().includes(searchSociete.value.toLowerCase()) ||
      agent.TelPortable.toLowerCase().includes(
        searchSociete.value.toLowerCase()
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
  sessionStorage.setItem("objectif", JSON.stringify(data));
};

const HandleOpen = () => {
  openCreate.value = true;
};

const updateopenUpdate = (data: any) => {
  openCreate.value = data;
  open.value = data;
};

const columns = [
  {
    title: "Nom",
    dataIndex: "Nom",
    key: "Nom",
  },
  {
    title: "Prenom",
    dataIndex: "Prenom",
    key: "Prenom",
  },
  {
    title: "Civilite",
    dataIndex: "Civilite",
    key: "Civilite",
  },
  {
    title: "Téléphone Fixe",
    dataIndex: "TelFixe",
    key: "TelFixe",
  },
  {
    title: "Téléphone Portable",
    dataIndex: "TelPortable",
    key: "TelPortable",
  },
  {
    title: "Adresse",
    dataIndex: "Adresse",
    key: "Adresse",
  },
];
</script>
