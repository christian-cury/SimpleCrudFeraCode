<template>
  <div class="row">
    <div class="col-12">
      <div class="card m-bl-30">
        <div class="card-body">
          <router-link :to="{name: 'Diapers'}">
            <button class="btn btn-warning waves-effect waves-light" style="float: right">
              <i class="ion-chevron-left"></i>
              Back
            </button>
          </router-link>
          <h4 class="mt-0 header-title">Form Add Diaper</h4>

          <p class="text-muted m-b-30 font-14"></p>

          <form v-on:submit.prevent="saveForm()">
            <div class="form-group row">
              <label for="nome" class="col-sm-2 col-form-label">Model</label>
              <div class="col-sm-10">
                <input class="form-control" type="text" id="nome" required v-model="diaper.model">
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-12">
                <button class="btn btn-primary waves-effect waves-light" type="submit">Salvar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      diaper: {
        model: ''
      }
    };
  },
  async mounted() {
    
  },
  async created() {
    
  },
  computed: {},
  methods: {
    saveForm: async function() {
      
    }
  }
};
</script>