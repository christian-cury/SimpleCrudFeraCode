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
                  <h4 class="mt-0 header-title">Buy diaper</h4>

                  <p class="text-muted m-b-30 font-14"></p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <form v-on:submit.prevent="submitForm()">
                    <div class="form-group row">
                      <label for="model" class="col-sm-4 col-xl-2 col-form-label">Size</label>
                      <div class="col-sm-8 col-xl-10">
                        <select class="custom-select" id="model" v-model="sale.size" @change="updateMax($event)" required>
                          <!-- <option
                            v-for="(model, index) in models"
                            v-bind:key="model.id"
                            v-bind:index="index"
                            v-bind:item="model"
                            v-bind:value="model.data.model.model"
                          >{{ model.data.model.model }}</option>
                           -->
                          <option value="L" v-if="diaper.availableL > 0">Large - Available {{ diaper.availableL }}</option>
                          <option value="M" v-if="diaper.availableM > 0">Medium - Available {{ diaper.availableM }}</option>
                          <option value="P" v-if="diaper.availableP > 0">Small - Available {{ diaper.availableP }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="description" class="col-sm-4 col-xl-2 col-form-label">Quantity of diapers</label>
                      <div class="col-sm-8 col-xl-10">
                        <input type="number" class="form-control" v-model="sale.quantity" required min="1" max="1" id="quantityDiapers">
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-sm-12">
                        <button
                          class="btn btn-primary waves-effect waves-light"
                          type="submit"
                          id="buyButton"
                        >Buy</button>
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
import SaleService from '@/services/SaleService';

export default {
  data: function() {
    return {
      id: '',
      diaper: {
        availableL: 0,
        availableM: 0,
        availableP: 0
      },
      sale: {
        diaperId: {
          type: String,
          defalt: ''
        },
        size: '',
        quantity: 1,
        createdAt: new Date(),
      },
      error: ''
    };
  },
  async mounted() {},
  async created() {
    this.id = await this.$route.params.id;
    this.sale.diaperId = this.id;
    await DiaperService.getDiaper(this.id).then(async data => {
      this.diaper = data.data;
      const code = data.code;
      if(code != 200) {
        this.error = data.error;
        const button = await document.getElementById('saveButton');
        if(button) {
          button.disabled = true;
        }
      }
    }).catch(async error => {
      this.error = error;
    });
  },
  computed: {},
  methods: {
    async updateMax(event) {
      const value = event.target.value;
      const input = document.getElementById('quantityDiapers');
      if(input) {
        switch(value) {
          case 'L':
            input.max = this.diaper.availableL;
            break;
          case 'M':
            input.max = this.diaper.availableM;
            break;
          case 'P':
            input.max = this.diaper.availableP;
            break;
          default:
            break;
        }
      }
    },
    submitForm: async function() {
      event.preventDefault();
      const button = await document.getElementById('buyButton');
      if(button) {
        button.textContent = 'Wait while proccess';
        button.disabled = true;
      }

      var max = 0;
       switch(await this.sale.size) {
        case 'L':
          max = this.diaper.availableL;
          break;
        case 'M':
          max = this.diaper.availableM;
          break;
        case 'P':
          max = this.diaper.availableP;
          break;
        default:
          break;
      }
      if(parseInt(this.sale.quantity) > parseInt(max)) {
        await this.$swal(
          'Error',
          `You cannot buy ${this.sale.quantity} diapers. Available diapers to this size is ${max}`,
          'error'
        );
        if(button) {
          button.disabled = false;
          button.textContent = 'Buy';
        }
        return;
      }
      await SaleService.createSale(this.sale).then(async data => {
        await this.$swal(
          'Bought',
          `You bought ${this.sale.quantity} diapers of size ${this.sale.size} with success`,
          'success'
        );
        await this.$router.push({name: 'Diapers'});
      }).catch(async error => {
        this.error += await error;
        if(button) {
          button.disabled = false;
          button.textContent = 'Buy';
        }
      });
    }
  }
};
</script>