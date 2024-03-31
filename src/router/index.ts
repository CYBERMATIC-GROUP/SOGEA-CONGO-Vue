import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
import HomeView from '../views/HomeView.vue'
import Connexion from "../views/Connexion.vue"
import Adherent from '@/views/Adherent.vue'
import Automobile from '@/views/Automobile.vue';
import ListeAutomobile from "@/views/AutomobileListe.vue"
import ListeAdherent from "@/views/AdherentListe.vue"
import Saisie from "@/views/Saisie.vue"
import Souscription from "@/views/Souscription.vue"
import renouvelementContrat from '@/views/renouvelement-contrat.vue';
import Amortissement from '@/views/Amortissement.vue';
import listeSouscription from '@/views/listeSouscription.vue';
import detailSouscription from '@/views/detailSouscription.vue';
import Commande from '@/views/Commande.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion,
    },
    {
      path: '/adherent',
      name: 'adherent',
      component: Adherent,
      meta: { requiresAuth: true },
    },
    {
      path: '/automobile/:id', // Chemin avec un paramètre ID
      name: 'automobileWithId', // Nom de la route
      component: Automobile, // Composant lié à la route
      meta: { requiresAuth: true }
    },
    {
      path: '/automobile', // Chemin sans paramètres
      name: 'automobileWithoutId', // Nom de la route
      component: Automobile, // Composant lié à la route
      meta: { requiresAuth: true },
    },

    {
      path: '/liste-automobile', // Chemin sans paramètres
      name: 'liste-automobile', // Nom de la route
      component: ListeAutomobile, // Composant lié à la route
      meta: { requiresAuth: true },
    },
    {
      path: '/liste-adherent', // Chemin sans paramètres
      name: 'liste-adherent', // Nom de la route
      component: ListeAdherent, // Composant lié à la route
      meta: { requiresAuth: true },
    },
    {
      path: '/saisie',
      name: 'saisie',
      component: Saisie,
      meta: { requiresAuth: true },
    },
    {
      path: '/nouvelle-souscription',
      name: 'nouvelle-souscription',
      component: Souscription,
      meta: { requiresAuth: true },
    },
    {
      path: '/nouvelle-souscription/renouvelement-contrat',
      name: 'nouvelle-souscription/renouvelement-contrat',
      component: renouvelementContrat,
      meta: { requiresAuth: true },
    },
    {
      path: '/amortissement',
      name: 'amortissement', 
      component: Amortissement, 
      meta: { requiresAuth: true }
    },
    {
      path: '/liste-souscription',
      name: 'liste-souscription', 
      component: listeSouscription, 
      meta: { requiresAuth: true }
    },
    {
      path: '/details-souscription',
      name: 'details-souscription', 
      component: detailSouscription, 
      meta: { requiresAuth: true }
    },
    {
      path: '/commande',
      name: 'commande', 
      component: Commande, 
      meta: { requiresAuth: true }
    },
  ]
})


router.beforeEach((to, from, next) => {
  // Vérifiez si la route nécessite une authentification
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Vérifiez ici si l'utilisateur est connecté en utilisant la variable isConnected du store
   const isConnected = useAuthStore().isConnected;
   
    if (!isConnected) {
      // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
      next('/connexion');
    } else {
      // Si l'utilisateur est connecté, continuez la navigation
      next();
    }
  } else {
    // Si la route n'exige pas d'authentification, continuez la navigation
    next();
  }
});

export default router
