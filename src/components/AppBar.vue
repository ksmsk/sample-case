<template>
  <div class="text-gray-100 bg-indigo-600 ">
    <div class="container mx-auto">
      <header class="flex items-center justify-between h-16 px-2 md:px-0">
        <div class="flex items-center">
          <router-link to="/" class="no-indicator">
            <svg
              class="w-8 h-8 text-gray-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              />
            </svg>
          </router-link>
          <h1 class="ml-2 text-2xl font-bold tracking-wide uppercase">
            {{ $t(`pages.${$route.name}`) }}
          </h1>
        </div>
        <div class="flex-grow" />
        <div class="items-center hidden md:mr-12 lg:mr-24 md:flex">
          <router-link
            to="/"
            class="px-2 py-1 ml-4 rounded-md hover:text-blue-400"
          >
            {{ $t("buttons.home") }}
          </router-link>
          <a href="#" class="px-2 py-1 ml-4 rounded-md hover:text-blue-400">
            {{ $t("pages.about") }}
          </a>
          <a href="#" class="px-2 py-1 ml-4 rounded-md hover:text-blue-400">
            {{ $t("pages.products") }}
          </a>
          <router-link
            to="/contact"
            class="px-2 py-1 ml-4 rounded-md hover:text-blue-400"
          >
            {{ $t("pages.contact") }}
          </router-link>
        </div>
        <div class="items-center hidden md:flex">
          <div v-if="isAuthenticated">
            <dropdown class="ml-2">
              <template v-slot:button>
                <button class="flex items-center">
                  <img
                    class="w-8 h-8 overflow-hidden rounded-full"
                    :src="user.avatar"
                    alt="user avatar"
                  />
                  <span class="ml-2 text-sm">{{ user.name }}</span>
                </button>
              </template>
              <template v-slot:content>
                <router-link
                  class="px-4 py-1 hover:bg-gray-900 hover:text-gray-100 no-indicator"
                  to="account"
                >
                  {{ $t("buttons.account") }}
                </router-link>
                <button
                  class="px-4 py-1 text-left hover:bg-gray-900 hover:text-gray-100"
                  @click="logout"
                >
                  {{ $t("buttons.logout") }}
                </button>
              </template>
            </dropdown>
          </div>
          <div v-if="!isAuthenticated">
            <button @click="modalHandler" to="/login">
              {{ $t("buttons.login") }}
            </button>
          </div>
          <dropdown class="ml-2">
            <template v-slot:button>
              <button class="w-6 h-6 text-sm uppercase">
                {{ $i18n.locale }}
              </button>
            </template>
            <template v-slot:content>
              <button
                class="px-4 py-1 text-left hover:bg-gray-900 hover:text-gray-100"
                @click="changeLang('tr')"
              >
                Türkçe
              </button>
              <button
                class="px-4 py-1 text-left hover:bg-gray-900 hover:text-gray-100"
                @click="changeLang('en')"
              >
                English
              </button>
            </template>
          </dropdown>
        </div>
        <div class="flex items-center md:hidden">
          <button @click="opened = !opened">
            <svg
              v-if="!opened"
              class="w-8 h-8 text-gray-100 fill-current"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-if="opened"
              class="w-8 h-8 text-gray-100 fill-current"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </header>
      <div v-if="opened" class="md:hidden" @click="opened = false">
        <div class="flex flex-col p-2 font-semibold">
          <router-link
            to="/"
            class="px-2 py-1 mb-1 rounded-md hover:bg-indigo-400"
          >
            {{ $t("buttons.home") }}
          </router-link>
          <a href="#" class="px-2 py-1 mb-1 rounded-md hover:bg-indigo-400">
            {{ $t("pages.about") }}
          </a>
          <a href="#" class="px-2 py-1 mb-1 rounded-md hover:bg-indigo-400">
            {{ $t("pages.products") }}
          </a>
          <router-link
            to="/contact"
            class="px-2 py-1 mb-1 rounded-md hover:bg-indigo-400"
            active-class="bg-red-400"
          >
            {{ $t("pages.contact") }}
          </router-link>
        </div>
        <div
          v-if="isAuthenticated"
          class="w-full px-4 pt-5 pb-3 border-t border-blue-400"
        >
          <div class="flex justify-between">
            <div class="flex items-center">
              <img
                class="w-8 h-8 overflow-hidden rounded-full"
                :src="user.avatar"
                alt="user avatar"
              />
              <span class="ml-2 text-sm font-semibold">{{ user.name }}</span>
            </div>
            <div>
              <button
                :class="{ 'bg-indigo-300': $i18n.locale === 'tr' }"
                class="w-8 h-8 rounded-full focus:outline-none focus:ring-2 ring-gray-900"
                @click="changeLang('tr')"
              >
                TR
              </button>
              <button
                :class="{ 'bg-indigo-300': $i18n.locale === 'en' }"
                class="w-8 h-8 rounded-full focus:outline-none focus:ring-2 ring-gray-900"
                @click="changeLang('en')"
              >
                EN
              </button>
            </div>
          </div>
          <div class="flex flex-col">
            <router-link
              class="py-1 mt-2 text-sm hover:text-gray-400"
              to="account"
            >
              {{ $t("buttons.account") }}
            </router-link>
            <button
              class="py-1 text-sm text-left hover:text-gray-400"
              @click="logout"
            >
              {{ $t("buttons.logout") }}
            </button>
          </div>
        </div>
        <div
          v-if="!isAuthenticated"
          class="w-full px-4 pt-3 pb-3 border-t border-blue-400"
        >
          <div class="flex flex-col">
            <button
              @click="modalHandler"
              class="py-1 text-sm text-left hover:text-gray-400"
            >
              {{ $t("buttons.login") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import Dropdown from "./Dropdown.vue";
import LoginModalVue from "./LoginModal.vue";
export default {
  components: { Dropdown },
  name: "app-bar",
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["login", "logout"]),

    changeLang(locale) {
      document.documentElement.lang = locale;
      setTimeout(() => (this.$i18n.locale = locale), 0);
    },
    modalHandler() {
      this.$modal.show(LoginModalVue);
    },
  },
};
</script>
