<template>
  <multiselect
    track-by='set'
    label='pokemonName'
    group-values='sets'
    group-label='pokemonName'
    :show-labels='false'
    placeholder='Pokemon'
    :options='sets'
    :value='pokemon.event'
    @input='updatePokemon'
    >
    <template slot='option' slot-scope='props'>
      <span v-if='props.option.$isLabel'>{{ props.option.$groupLabel }}</span>
      <span v-else>{{ props.option.setName }}</span>
    </template>
  </multiselect>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Multiselect } from "vue-multiselect";
import { Pokemon } from "sulcalc";

export default {
  components: {
    Multiselect
  },
  props: {
    pokemon: {
      required: true,
      type: Pokemon
    }
  },
  computed: {
    ...mapState(["gen"]),
    ...mapGetters(["sets"])
  },
  methods: {
    updatePokemon(event) {
      const pokemon = Pokemon.fromSet({
        id: event.pokemonId,
        set: event.set,
        gen: this.gen
      });
      pokemon.event = event;
      this.$emit("input", pokemon);
    }
  }
};
</script>
