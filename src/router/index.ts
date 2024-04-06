import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
import listeSouscription from '@/views/listeSouscription.vue';
import detailSouscription from '@/views/detailSouscription.vue';
import Commande from '@/views/Commande.vue';
import imprimer from '@/views/imprimer.vue';
import Consultation from '@/views/Consultation.vue';
import SocieteListe from '@/views/SocieteListe.vue';
import Societe from '@/views/Societe.vue';
import ObjectifListe from '@/views/ObjectifListe.vue';
import RevenusListe from '@/views/RevenusListe.vue';
import StationListe from '@/views/StationListe.vue';
import PointDeVenteListe from '@/views/PointDeVenteListe.vue';
import AgentListe from '@/views/AgentListe.vue';
import ConsultationCompte from '@/views/ConsultationCompte.vue';
import ConsultationCaisse from '@/views/ConsultationCaisse.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/Connexion.vue'),
    },
    {
      path: '/adherent',
      name: 'adherent',
      component: () => import('@/views/Adherent.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/automobile/:id',
      name: 'automobileWithId',
      component: () => import('@/views/Automobile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/automobile',
      name: 'automobileWithoutId',
      component: () => import('@/views/Automobile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/liste-automobile',
      name: 'liste-automobile',
      component: () => import('@/views/AutomobileListe.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/liste-adherent',
      name: 'liste-adherent',
      component: () => import('@/views/AdherentListe.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/saisie',
      name: 'saisie',
      component: () => import('@/views/Saisie.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/nouvelle-souscription',
      name: 'nouvelle-souscription',
      component: () => import('@/views/Souscription.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/nouvelle-souscription/renouvelement-contrat',
      name: 'nouvelle-souscription/renouvelement-contrat',
      component: () => import('@/views/renouvelement-contrat.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/amortissement',
      name: 'amortissement', 
      component: () => import('@/views/Amortissement.vue'), 
      meta: { requiresAuth: true }
    },
    {
      path: '/liste-souscription',
      name: 'liste-souscription',
      component: () => import('@/views/listeSouscription.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/details-souscription',
      name: 'details-souscription',
      component: () => import('@/views/detailSouscription.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/commande',
      name: 'commande',
      component: () => import('@/views/Commande.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/impression-viniette',
      name: 'impression-viniette',
      component: () => import('@/views/imprimer.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/consultation',
      name: 'consultation',
      component: () => import('@/views/Consultation.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/liste-societe',
      name: 'liste-societe',
      component: () => import('@/views/SocieteListe.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/societe',
      name: 'societe',
      component: () => import('@/views/Societe.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/liste-objectif',
      name: 'liste-objectif',
      component: () => import('@/views/ObjectifListe.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/revenus',
      name: 'revenus',
      component: () => import('@/views/RevenusListe.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/liste-station',
      name: 'liste-station',
      component: () => import('@/views/StationListe.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/liste-point-vente',
      name: 'liste-point-vente',
      component: () => import('@/views/PointDeVenteListe.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/liste-agent',
      name: 'liste-agent',
      component: () => import('@/views/AgentListe.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/consultation-compte',
      name: 'consultation-compte',
      component: () => import('@/views/ConsultationCompte.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/consultation-caisse',
      name: 'consultation-caisse',
      component: () => import('@/views/ConsultationCaisse.vue'),
      meta: { requiresAuth: true }
    }
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
