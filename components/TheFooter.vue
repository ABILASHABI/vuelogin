<template>
    <footer class="row text-secondary px-0 mt-3 d-print-none">
        <div class="col-md-4">
            <LanguageSwitcher class="ml-n2 ml-md-0"/>

        </div>



     
    </footer>
</template>

<script>
import { mapState } from 'vuex';
import { VBTooltip } from 'bootstrap-vue';
import LanguageSwitcher from './LanguageSwitcher';

export default {
  i18nOptions: { namespaces: 'the-footer' },
  components: { LanguageSwitcher },
  directives: {
    'b-tooltip': VBTooltip,
  },
  computed: {
    ...mapState({
      theme: state => state.themes.theme,
    }),
  },
  methods: {
    toggleTheme() {
      if (this.theme === 'light') {
        this.$store.commit('themes/theme', 'dark');
      } else {
        this.$store.commit('themes/theme', 'light');
      }
      localStorage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
  },
};
</script>
