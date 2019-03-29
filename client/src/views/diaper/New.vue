<template>
  <div class="col-12">
    <div class="row" v-if="error">
      <div class="col-12">
        <div class="alert alert-danger">
          An error has occurred: {{ error }}.
          <br>
          <a class="alert-link" href onclick="window.location.reload()">Click here to refresh</a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card m-bl-30">
          <div class="card-body">
            <div class="col">
              <div class="row" style="margin-bottom: 15px">
                <div class="col">
                  <router-link :to="{name: 'Diapers'}">
                    <button class="btn btn-warning waves-effect waves-light float-right">
                      <i class="fa fa-arrow-left"></i>
                      Back
                    </button>
                  </router-link>
                  <h4 class="mt-0 header-title">Form Add Diaper</h4>

                  <p class="text-muted m-b-30 font-14"></p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <form v-on:submit.prevent="saveForm()">
                    <div class="form-group row">
                      <label for="model" class="col-sm-4 col-xl-2 col-form-label">Model</label>
                      <div class="col-sm-8 col-xl-10">
                        <select class="custom-select" id="model" v-model="diaper.model" required>
                          <option
                            v-for="(model, index) in models"
                            v-bind:key="model.id"
                            v-bind:index="index"
                            v-bind:item="model"
                            v-bind:value="model.data.model.model"
                          >{{ model.data.model.model }}</option>
                        </select>
                        <small id="emailHelp" class="form-text text-muted">
                          <a
                            href="#"
                            v-on:click="newModel()"
                          >You can create new models clicking here</a>
                        </small>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="description" class="col-sm-4 col-xl-2 col-form-label">Description</label>
                      <div class="col-sm-8 col-xl-10">
                        <textarea
                          class="form-control"
                          id="description"
                          v-model="diaper.description"
                          rows="5"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <hr>
                    <h5>Sizes available</h5>

                    <div class="form-group row">
                      <label for="description" class="col-sm-4 col-xl-2 col-form-label">Available Small - S</label>
                      <div class="col-sm-8 col-xl-10">
                        <input type="number" class="form-control" v-model="diaper.availableP" required>
                        <small class="form-text text-muted">
                          Leave 0 (zero) if unavailable
                        </small>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="description" class="col-sm-4 col-xl-2 col-form-label">Available Medium - M</label>
                      <div class="col-sm-8 col-xl-10">
                        <input type="number" class="form-control" v-model="diaper.availableM" required>
                        <small class="form-text text-muted">
                          Leave 0 (zero) if unavailable
                        </small>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="description" class="col-sm-4 col-xl-2 col-form-label">Available Large - L</label>
                      <div class="col-sm-8 col-xl-10">
                        <input type="number" class="form-control" v-model="diaper.availableL" required>
                        <small class="form-text text-muted">
                          Leave 0 (zero) if unavailable
                        </small>
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-sm-12">
                        <button
                          class="btn btn-primary waves-effect waves-light"
                          type="submit"
                          id="saveButton"
                        >Salvar</button>
                      </div>
                    </div>
                  </form>
                </div>
                <!-- END ROW -->
              </div>
              <!-- EN DROW -->
            </div>
            <!-- END COL -->
          </div>
          <!-- END CARD BODY -->
        </div>
        <!-- END CARD -->
      </div>
      <!-- END COL -->
    </div>
    <!-- END SECOND ROW -->
  </div>
  <!-- END FIRST COL -->
</template>

<script>
import ModelService from "@/services/ModelService";
import DiaperService from "@/services/DiaperService";

export default {
  data: function() {
    return {
      diaper: {
        model: '',
        description: '',
        availableL: 0,
        availableM: 0,
        availableP: 0
      },
      models: {},
      error: '',
      model: {
        model: ''
      }
    };
  },
  async mounted() {},
  async created() {
    this.models = await ModelService.getModels().catch(async error => {
      this.error += await error;
    });
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
      await DiaperService.createDiaper(this.diaper).then(async () => {
        await this.$swal(
          'Success',
          'Diaper added with success',
          'success'
        );
        await this.$router.push({name: 'Diapers'});
      }).catch(async error => {
        await this.$swal(
          'Failed',
          'An error has occurred',
          'error'
        );
        this.error += await error;
        button.textContent = 'Save';
        button.disabled = false;
      });
    },
    async newModel() {
      await this.$swal({
        title: "New model",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Add",
        cancelButtonText: "Cancel",
        showLoaderOnConfirm: true,
        preConfirm: async value => {
          if (undefined == value || null == value || value == '') {
            return await this.$swal.showValidationMessage(
              'Please, type a model name to add'
            );
          }
          return await ModelService.createModel({model: value}).then(async (data) => {
            const code = await data.code;
            if(code == 200) {
              this.models = await ModelService.getModels().catch(async error => {
                this.error += await error;
              });
              await this.$swal(
                'Success',
                `Model '${value}' added with success`,
                'success'
              );
            } else {
              throw await new Error(data.error);
            }
          }).catch(async error => {
            this.error += await error;
            await this.$swal.showValidationMessage('An error has occurred');
          });
        },
        allowOutsideClick: false
      });
    }
  }
};
</script>