<template>
  <div>
    <div
      class="relative z-10 flex items-center justify-center px-4 py-12 rounded-lg  bg-gray-50 sm:px-6 lg:px-8"
    >
      <div class="w-full max-w-md space-y-8">
        <div>
          <img
            class="w-auto h-12 mx-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
            {{ $t("titles.login") }}
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="formHandler" novalidate>
          <div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                :class="
                  errors.email
                    ? 'border-red-500 text-red 500'
                    : 'border-gray-300'
                "
                :placeholder="$t('form.placeholder.email')"
                v-model="email"
                @input="errors.email = ''"
              />
              <span v-if="errors.email" class="text-xs text-red-500">
                {{ $t(errors.email) }}
              </span>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                :class="
                  errors.password
                    ? 'border-red-500 text-red-500'
                    : 'border-gray-300'
                "
                :placeholder="$t('form.placeholder.password')"
                v-model="password"
                @input="errors.password = ''"
              />
              <span v-if="errors.password" class="text-xs text-red-500">
                {{ $t(errors.password) }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="remember_me" class="block ml-2 text-sm text-gray-900">
                {{ $t("form.remember") }}
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {{ $t("form.forget") }}
              </a>
            </div>
          </div>
          <div v-if="$store.state.error" class="text-xs text-red-500 ">
            {{ $t($store.state.error) }}
          </div>
          <div>
            <button
              type="submit"
              class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              {{ $t("buttons.login") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-modal",
  data() {
    return {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    inputHandler() {}, // trick to trigger watchers
    formHandler() {
      if (!this.email.length /*implement email validator aswell*/) {
        this.errors.email = "form.required";
      }
      if (!this.password.length) {
        this.errors.password = "form.required";
      }

      if (Object.values(this.errors).some(Boolean)) return;

      this.$store.commit("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
  watch: {
    "$store.state.success": function(v) {
      if (v) {
        this.$store.commit("reset");
        this.$modal.hideAll();
      }
    },
  },
};
</script>
