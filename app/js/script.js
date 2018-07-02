'use strict';

const getPWAList = 'pwas.json';


var vm = new Vue({
  el: '#app',
  data: {
    pwas: [],
    loading: true,
    message: ''
  },
  computed: {
    filteredResults: function () {
      return this.pwas.filter((x) => {
        return x.value.toLowerCase().includes(this.title.toLowerCase());
      });
    }
  },
  methods: {
    load: function () {
      this.loading = true;
      this.$http.get(`${getPWAList}`).then(response => {

        let keys = JSON.parse(response.bodyText);

        for (var p in keys) {
          if (keys.hasOwnProperty(p)) {
            let id = p;
            let value = keys[p];
            let object = {
              id: id,
              url: `https://www.netflix.com/browse/genre/${id}`,
              value: value
            }
            this.pwas.push(object)
          }
        }
        this.loading = false;
      }, response => {
        this.loading = null;
        this.pwas = [];
        this.message = 'Opps, something seems to have gone wrong. Please try again';
      });
    }
  }
});

vm.load();
// Set config settings
Vue.config.productionTip = false;
Vue.config.devtools = false