import Vue from "vue";
import Vuex, { Store } from "vuex";
import state from "./state";
import * as mutations from "./mutations";
import * as getters from "./getters";
import { persistencePlugin } from "./plugins";

Vue.use(Vuex);

export default new Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  getters,
  plugins: [
    persistencePlugin({
      prefix: "sulcalc",
      saveOn: {
        importPokemon: "sets.custom",
        toggleSmogonSets: "enabledSets.smogon",
        togglePokemonPerfectSets: "enabledSets.pokemonPerfect",
        toggleCustomSets: "enabledSets.custom",
        toggleLongRolls: "longRolls",
        toggleFractions: "fractions"
      }
    })
  ]
});
