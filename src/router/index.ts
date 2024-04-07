import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
import Connexion from "../views/Connexion.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion,
    },
  ]
})

router.addRoute({
  path: '/',
  name: 'home',
  component: () => import('@/views/HomeView.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/nouvelle-souscription',
  name: 'nouvelle-souscription',
  component: () => import('@/views/Souscription.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/nouvelle-souscription/renouvelement-contrat',
  name: 'nouvelle-souscription/renouvelement-contrat',
  component: () => import('@/views/renouvelement-contrat.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/amortissement',
  name: 'amortissement',
  component: () => import('@/views/Amortissement.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/liste-souscription',
  name: 'liste-souscription',
  component: () => import('@/views/listeSouscription.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/details-souscription',
  name: 'details-souscription',
  component: () => import('@/views/detailSouscription.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/commande',
  name: 'commande',
  component: () => import('@/views/Commande.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/impression-viniette',
  name: 'impression-viniette',
  component: () => import('@/views/imprimer.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/consultation',
  name: 'consultation',
  component: () => import('@/views/Consultation.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/liste-societe',
  name: 'liste-societe',
  component: () => import('@/views/SocieteListe.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/societe',
  name: 'societe',
  component: () => import('@/views/Societe.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/liste-objectif',
  name: 'liste-objectif',
  component: () => import('@/views/ObjectifListe.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/revenus',
  name: 'revenus',
  component: () => import('@/views/RevenusListe.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/liste-station',
  name: 'liste-station',
  component: () => import('@/views/StationListe.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/liste-point-vente',
  name: 'liste-point-vente',
  component: () => import('@/views/PointDeVenteListe.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/liste-agent',
  name: 'liste-agent',
  component: () => import('@/views/AgentListe.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/adherent',
  name: 'adherent',
  component: () => import('@/views/Adherent.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/automobile/:id',
  name: 'automobileWithId',
  component: () => import('@/views/Automobile.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/automobile',
  name: 'automobileWithoutId',
  component: () => import('@/views/Automobile.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/liste-automobile',
  name: 'liste-automobile',
  component: () => import('@/views/AutomobileListe.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/liste-adherent',
  name: 'liste-adherent',
  component: () => import('@/views/AdherentListe.vue'),
  meta: { requiresAuth: true }
});

router.addRoute({
  path: '/saisie',
  component: () => import('@/views/Saisie.vue'),
  meta: { requiresAuth: true }
});



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