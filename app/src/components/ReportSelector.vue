<template>
  <button-radio-group
      :value='selectedReport'
      :options='reportOptions'
      @input='report => setReport({report})'
      layout='vertical'
      />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ButtonRadioGroup from "./ui/ButtonRadioGroup.vue";

export default {
  components: {
    ButtonRadioGroup
  },
  props: {
    reports: {
      required: true,
      type: Array
    }
  },
  computed: {
    ...mapGetters(["selectedReport"]),
    reportOptions() {
      return this.reports.map(value => ({ value, label: value.move.name }));
    }
  },
  methods: {
    ...mapMutations(["setReport"])
  }
};
</script>
