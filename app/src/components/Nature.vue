<template>
    <multiselect
      track-by='value'
      label='label'
      :show-labels='false'
      placeholder='Nature'
      :value='valueObj'
      :options='natures'
      @input='updateValue'
      />
</template>

<script>
import { Multiselect } from "vue-multiselect";
import { Natures, info } from "sulcalc";

export default {
  model: {
    prop: "nature",
    event: "input"
  },
  components: {
    Multiselect
  },
  props: {
    nature: {
      required: true,
      type: Number,
      validator(value) {
        return Object.values(Natures).includes(value);
      }
    }
  },
  computed: {
    natures() {
      return Object.values(Natures)
        .map(id => ({ value: id, label: info.natureName(id) }))
        .sort((a, b) => a.label.localeCompare(b.label));
    },
    valueObj() {
      if (this.nature === Natures.HARDY) {
        return {};
      }
      return { value: this.nature, label: info.natureName(this.nature) };
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event ? event.value : Natures.HARDY);
    }
  }
};
</script>
