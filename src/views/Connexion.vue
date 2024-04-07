<template>
  <div class="flex justify-center items-center h-screen">
    <Card class="w-[27rem] px-3 shadow-lg rounded-[8px]">
      <CardHeader class="w-full select-none flex justify-center items-center">
        <img :src="Logo" width="180" alt="Sogea Logo" />
      </CardHeader>
      <CardContent>
        <h1 class="text-center text-2xl font-[600] text-bg-primary">Bienvue</h1>
        <h2 class="text-center pt-1 text-lg mb-5 font-[600]">
          Veuillez-vous connecter!
        </h2>

        <form @submit="onSubmit">
          <div class="mt-3 flex flex-col space-y-3 select-none">
            <Input
              label="Login"
              type="text"
              inputType="input"
              placeholder=""
              v-model="login"
              :valid="errors.login"
              v-bind="loginAttrs"
              uppercase="uppercase"
            />
            <span class="text-red-color">{{ errors.login }}</span>
            <Input
              label="Votre mot de passe"
              @change-type="toogleChange"
              placeholder=""
              inputType="input"
              :type="type"
              :valid="errors.password"
              :imageSrc="imageSrc"
              v-model="password"
              v-bind="passwordAttrs"
            />
            <span class="text-red-color">{{ errors.password }}</span>
          </div>
          <div class="flex justify-center mt-2">
            <Button
              :disabled="loading"
              :loading="loading"
              class="w-full bg-bg-primary"
              >Connectez-vous !</Button
            >
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div class="flex flex-row w-full space-x-10 justify-between">
          <Button class="w-full bg-bg-secondary">Espace proprietaire</Button>
          <Button class="w-full bg-bg-secondary">Espace Station</Button>
        </div>
      </CardFooter>
    </Card>

    <Dialog v-model:open="modal">
      <DialogContent class="sm:min-w-[30rem]">
        <DialogHeader>
          <DialogTitle>Le login ou le mot de passe est incorrect. </DialogTitle>
          <div class="flex justify-start mt-5">
            <Button @click="ActionModal1" class="w-[8rem] bg-bg-primary"
              >OK</Button
            >
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    <Dialog :open="ouvert">
      <DialogContent class="sm:max-w-[30rem]">
        <DialogHeader>
          <DialogTitle class="text-center leading-[1.5rem]"
            >VEUILLEZ RENSEIGNER LE TOKEN REÇU <br />
            PAR ÉMAIL OU PAR SMS.</DialogTitle
          >
          <div
            class="absolute hover:bg-bg-primary px-3 py-1 hover:text-white hover:rounded-full right-4 top-4 rounded-sm transition-opacity cursor-pointer"
            @click="ActionModal"
          >
            <span>X</span>
          </div>

          <form @submit="onConnexion">
            <Input
              label="Token"
              type="text"
              inputType="input"
              placeholder="Entrer votre Token"
              v-model="token"
              :valid="newErrors.token"
              v-bind="tokenAttrs"
              uppercase="uppercase"
            />
            <span class="text-red-color">{{ newErrors.token }}</span>
            <div class="flex justify-center mt-5">
              <Button
                :disabled="loading"
                :loading="loading"
                type="submit"
                class="w-full bg-bg-primary"
                >Connexion</Button
              >
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Login } from "@/model/login";
import { Button } from "@/components/ui/button";
import { useForm } from "vee-validate";
import * as yup from "yup";
import Logo from "../assets/img/sogea.jpg";
import Input from "../components/ui/inputConnexion.vue";
import { ref } from "vue";
import eye from "../components/icons/eye.svg";
import eyeSlash from "../components/icons/eye-slash.svg";
import { useLoginStore } from "@/stores/Login";
import router from "@/router";
import { getSuccess, getError } from "../common/notification";
import { useAuthStore } from "@/stores/authStore";

const type = ref("password");
const imageSrc = ref(eye);
const toogleChange = () => {
  type.value = type.value === "password" ? "text" : "password";
  imageSrc.value = type.value === "password" ? eye : eyeSlash;
};

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    login: yup.string().required("Veuillez saisir votre login."),
    password: yup.string().required("Veuillez saisir votre mot de passe."),
  }),
});

const {
  errors: newErrors,
  handleSubmit: newHandleSubmit,
  defineField: newDefineField,
} = useForm({
  validationSchema: yup.object({
    token: yup.string().required("Veuillez saisir votre token."),
  }),
});

const authStore = useAuthStore();

const [login, loginAttrs] = defineField("login");

const [token, tokenAttrs] = newDefineField("token");
const [password, passwordAttrs] = defineField("password");

const loading = ref(false);

const loginStore = useLoginStore();

const MaData = ref<Login>({} as Login);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  const login = { login: values.login.toUpperCase() };
  const password = { motDePasse: values.password };
  const data = { ...login, ...password };
  MaData.value = data;
  console.log(data);
  localStorage.setItem("UTILISATEUER_LOGIN", data.login);
  try {
    let response = await loginStore.login(data);
    console.log(response);
    localStorage.setItem("Agent", JSON.stringify(response));
    authStore.setConnected(true);
    router.push({ path: "/" });
  } catch (error) {
    loading.value = false;
    console.error(error);
    if ((error as any).response?.status == 401) {
      localStorage.setItem("UTILISATEUER_TOKEN", data.login);
      ouvert.value = true;
      getSuccess("L'identifiant est correct.");
    }
    if ((error as any).response?.status == 404) {
      modal.value = true;
      getError("Le login ou le mot de passe est incorrect.");
    }
  }
});

const ouvert = ref(false);
const modal = ref(false);

const ActionModal = () => {
  ouvert.value = false;
};

const ActionModal1 = () => {
  modal.value = false;
};

const onConnexion = newHandleSubmit(async (values) => {
  loading.value = true;
  localStorage.setItem("UTILISATEUER_TOKEN", values.token);
  try {
    let response = await loginStore.login(MaData.value);
    console.log(response);
    getSuccess("Vous serez redirigé vers le tableau de bord.");
    authStore.setConnected(true);
    setTimeout(() => {
      loading.value = false;
      router.push({ path: "/" });
    }, 3000);
  } catch (error) {
    loading.value = false;
    console.error(error);
    getError((error as any).response?.data?.fault?.detail);
  }
});
</script>
