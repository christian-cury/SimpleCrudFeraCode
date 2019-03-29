<template>
  <div class="col-12">
    <div class="row" v-if="error">
      <div class="col-12">
        <div class="alert alert-danger">
          An error has occurred: {{ error }}.
          <br><a class="alert-link" href="" onclick="window.location.reload()">Click here to refresh</a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card m-bl-30">
          <div class="card-body">
            <router-link :to="{name: 'Models'}">
              <button class="btn btn-warning waves-effect waves-light" style="float: right">
                <i class="fa fa-arrow-left"></i>
                Back
              </button>
            </router-link>
            <h4 class="mt-0 header-title">Form Add Model</h4>

            <p class="text-muted m-b-30 font-14"></p>

            <form v-on:submit.prevent="saveForm()">
              <div class="form-group row">
                <label for="modelName" class="col-sm-4 col-xl-2 col-form-label">Model Name</label>
                <div class="col-sm-8 col-xl-10">
                  <input class="form-control" type="text" id="modelName" required v-model="model.model">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-12">
                  <button class="btn btn-primary waves-effect waves-light" type="submit" id="saveButton">Save</button>
                </div>
              </div>
            </form>
          </div> <!-- END CARD BODY -->
        </div> <!-- END CARD -->
      </div> <!-- END COL -->
    </div> <!-- END ROW -->
  </div>
</template>

<script>
/* eslint-disable */

import ModelService from '@/services/ModelService';

export default {
  data: function() {
    return {
      model: {
        model: ''
      },
      error: ''
    };
  },
  async mounted() {
  },
  async created() {

  },
  computed: {},
  methods: {
    saveForm: async function() {
      event.preventDefault();
      const button = await document.getElementById('saveButton');
      if(button) {
        button.textContent = 'Wait while saving';
        button.disabled = true;
      }
      await ModelService.createModel(this.model).then(async res => {
        await this.$swal(
          'Success',
          `Model ${this.model.model} added with success`,
          'success'
        );
        await this.$router.push({name: 'Models'});
      }).catch(async error => {
        await this.$swal(
          'Error',
          `An error has occurred while trying add model`,
          'error'
        );
        this.error = error;
        button.text = 'Save';
        button.disabled = false;
      });
    }
  }
};
</script>