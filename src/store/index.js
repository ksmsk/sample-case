import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: "",
    success: false,
    user: {
      name: null,
      email: null,
      avatar: null,
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user.email,
  },
  mutations: {
    login(state, { email, password }) {
      state.error = "";
      if (email === "arif@susam.com" && password === "12345") {
        state.user = {
          name: "Arif Susam",
          email: "arif@susam.com",
          avatar: "/images/arif.jpg",
        };
        state.success = true;
      } else {
        state.error = "server.invalidCredentials";
      }
    },
    logout(state) {
      state.user = {
        name: null,
        email: null,
        avatar: null,
      };
    },
    reset(state) {
      state.success = false;
      state.error = "";
    },
  },
  actions: {},
});
