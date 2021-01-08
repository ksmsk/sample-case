<template>
  <div class="container px-4 py-10 mx-auto">
    <h1 class="mb-6 text-4xl text-center">{{ $t("titles.contact") }}</h1>
    <form class="max-w-lg mx-auto" @submit.prevent="formHandler" novalidate>
      <div class="flex flex-wrap mb-4">
        <div class="w-full">
          <label
            class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            for="grid-password"
          >
            {{ $t("form.label.name") }}
          </label>
          <input
            class="block w-full px-4 py-3 mb-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            :class="
              errors.name ? 'border-red-500 text-red 500' : 'border-gray-300'
            "
            id="nick"
            type="text"
            v-model="name"
            @input="errors.name = ''"
          />
          <span v-if="errors.name" class="text-xs text-red-500">
            {{ $t(errors.name) }}
          </span>
        </div>
      </div>
      <div class="flex flex-wrap mb-4">
        <div class="w-full">
          <label
            class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            for="grid-password"
          >
            {{ $t("form.label.email") }}
          </label>
          <input
            class="block w-full px-4 py-3 mb-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            :class="
              errors.email ? 'border-red-500 text-red 500' : 'border-gray-300'
            "
            id="email"
            type="email"
            v-model="email"
            @input="errors.email = ''"
          />
          <span v-if="errors.email" class="text-xs text-red-500">
            {{ $t(errors.email) }}
          </span>
        </div>
      </div>
      <div class="flex flex-wrap mb-4">
        <div class="w-full">
          <label
            class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            for="grid-password"
          >
            {{ $t("form.label.phone") }}
          </label>
          <masked-input
            type="text"
            name="phone"
            class="block w-full px-4 py-3 mb-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            :class="
              errors.phone ? 'border-red-500 text-red 500' : 'border-gray-300'
            "
            :mask="phoneMask"
            :guide="true"
            placeholder="(___) ___ __ __"
            placeholderChar="_"
            v-model="phone"
            @input="errors.phone = ''"
          />
          <span v-if="errors.phone" class="text-xs text-red-500">
            {{ $t(errors.phone) }}
          </span>
        </div>
      </div>
      <div class="flex flex-wrap mb-4">
        <div class="w-full">
          <label
            class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            for="grid-password"
          >
            {{ $t("form.label.country") }}
          </label>
          <v-select
            class="contact-select"
            :class="{ 'has-error': errors.country }"
            :options="countries"
            :reduce="(country) => country.code"
            v-model="country"
            @input="errors.country = ''"
          />
          <span v-if="errors.country" class="text-xs text-red-500">
            {{ $t(errors.country) }}
          </span>
        </div>
      </div>
      <div class="flex flex-wrap mb-4">
        <div class="w-full">
          <label
            class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            for="grid-password"
          >
            {{ $t("form.label.message") }}
          </label>
          <textarea
            class="block w-full h-48 px-4 py-3 mb-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none resize-none no-resize focus:outline-none focus:bg-white focus:border-gray-500"
            :class="
              errors.message ? 'border-red-500 text-red 500' : 'border-gray-300'
            "
            id="message"
            v-model="message"
            @input="errors.message = ''"
          />
          <span v-if="errors.message" class="text-xs text-red-500">
            {{ $t(errors.message) }}
          </span>
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="flex items-center">
          <button
            class="px-4 py-2 font-bold text-white bg-indigo-500 rounded shadow hover:bg-indigo-600 focus:shadow-outline focus:outline-none disabled:bg-gray-500"
            :disabled="submitting"
            type="submit"
          >
            {{ $t("buttons.send") }}
          </button>
          <p class="ml-4 text-sm text-green-600" v-if="success">
            {{ $t("server.contactSuccess") }}
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import vSelect from "vue-select";
import MaskedInput from "vue-text-mask";
import { mapState } from "vuex";
import {
  countries,
  phoneMask,
  sanitizeNumeric,
  sleep,
} from "./../utils/helpers";

export default {
  name: "contact",
  components: { MaskedInput, vSelect },
  data() {
    return {
      submitting: false,
      success: false,
      name: this.$store.state.user.name || "",
      email: this.$store.state.user.email || "",
      phone: "",
      country: "",
      message: "",
      errors: {
        name: "",
        email: "",
        phone: "",
        country: "",
        message: "",
      },
    };
  },
  computed: {
    ...mapState(["user"]),
    phoneMask: () => phoneMask,
    countries: function() {
      return countries.map((code) => ({
        label: this.$t(`countries.${code}`),
        code,
      }));
    },
  },
  methods: {
    async formHandler() {
      this.success = false;

      if (!this.name.length) {
        this.errors.name = "form.required";
      }
      if (!this.email.length) {
        this.errors.email = "form.required";
      }
      if (sanitizeNumeric(this.phone).length !== 10) {
        this.errors.phone = "form.phone";
      }

      if (this.country.length !== 2) {
        this.errors.country = "form.required";
      }

      if (!this.message.length) {
        this.errors.message = "form.required";
      }

      if (Object.values(this.errors).some(Boolean)) return;

      this.submitting = true;

      await sleep(500);

      console.log({
        name: this.name,
        email: this.email,
        phone: this.phone,
        country: this.country,
        message: this.message,
      });

      this.submitting = false;
      this.success = true;
    },
  },
  watch: {
    "$store.state.user.name": function() {
      this.name = this.$store.state.user.name;
    },
    "$store.state.user.email": function() {
      this.email = this.$store.state.user.email;
    },
  },
};
</script>
