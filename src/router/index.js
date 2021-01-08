import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Account from "../views/Account.vue";
import store from "./../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/account",
    name: "account",
    beforeEnter: (_, __, next) => {
      if (!store.getters.isAuthenticated) {
        next({ name: "home" });
      } else {
        next();
      }
    },
    component: Account,
  },
];

const router = new VueRouter({
  // linkActiveClass: "bg-red-400",
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
