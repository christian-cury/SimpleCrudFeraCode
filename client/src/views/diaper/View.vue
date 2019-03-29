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
                  <h4 class="mt-0 header-title">Diaper details</h4>

                  <p class="text-muted m-b-30 font-14"></p>
                </div>
              </div>

              <div class="row">
                <div class="col-xl-3 col-sm-6 mb-3">
                  <div class="card text-white bg-warning o-hidden h-100">
                    <div class="card-body">
                      <div class="card-body-icon">
                        <i class="fas fa-fw fa-list"></i>
                      </div>
                      <div class="mr-5">{{ parseInt(diaper.boughtL) + parseInt(diaper.boughtM) + parseInt(diaper.boughtP) }} Total Sales</div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-sm-6 mb-3">
                  <div class="card text-white bg-warning o-hidden h-100">
                    <div class="card-body">
                      <div class="card-body-icon">
                        <i class="fas fa-fw fa-list"></i>
                      </div>
                      <div class="mr-5">{{ diaper.boughtL }} Total Sales - L</div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-sm-6 mb-3">
                  <div class="card text-white bg-warning o-hidden h-100">
                    <div class="card-body">
                      <div class="card-body-icon">
                        <i class="fas fa-fw fa-list"></i>
                      </div>
                      <div class="mr-5">{{ diaper.boughtM }} Total Sales - M</div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-sm-6 mb-3">
                  <div class="card text-white bg-warning o-hidden h-100">
                    <div class="card-body">
                      <div class="card-body-icon">
                        <i class="fas fa-fw fa-list"></i>
                      </div>
                      <div class="mr-5">{{ diaper.boughtP }} Total Sales - S</div>
                    </div>
                  </div>
                </div>

              </div>

              <h5>Possible date for zero stock</h5>
              <div class="row">
                <div class="col">
                  <div class="table-rep-plugin">
                    <div class="table-responsive b-0" data-pattern="priority-columns">
                      <table id="tech-companies-1" class="table table-striped">
                        <thead>
                          <tr>
                            <th>Size</th>
                            <th data-priority="2">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Large</td>
                            <td>{{ endStockL }}</td>
                          </tr>
                          <tr>
                            <td>Medium</td>
                            <td>{{ endStockM }}</td>
                          </tr>
                          <tr>
                            <td>Small</td>
                            <td>{{ endStockP }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <!-- END ROW -->
              </div>

              <hr>
              <h5>Stock</h5>
              <div class="row">
                <div class="col">
                  <div class="table-rep-plugin">
                    <div class="table-responsive b-0" data-pattern="priority-columns">
                      <table id="tech-companies-1" class="table table-striped">
                        <thead>
                          <tr>
                            <th>Size</th>
                            <th data-priority="2">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Large</td>
                            <td>{{ diaper.availableL }}</td>
                          </tr>
                          <tr>
                            <td>Medium</td>
                            <td>{{ diaper.availableM }}</td>
                          </tr>
                          <tr>
                            <td>Small</td>
                            <td>{{ diaper.availableP }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <!-- END ROW -->
              </div>

              <hr>
              <h5>Sales history</h5>

              <div class="row">
                <div class="col">
                  <div class="table-rep-plugin">
                    <div class="table-responsive b-0" data-pattern="priority-columns">
                      <table id="tech-companies-1" class="table table-striped">
                        <thead>
                          <tr>
                            <th>Size</th>
                            <th data-priority="1">Quantity</th>
                            <th data-priority="2">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(sale, index) in sales"
                            v-bind:item="sale"
                            v-bind:index="index"
                            v-bind:key="sale._id"
                          >
                            <td v-if="sale.sale.size == 'L'">Large</td>
                            <td v-if="sale.sale.size == 'M'">Medium</td>
                            <td v-if="sale.sale.size == 'P'">Small</td>
                            <td>{{ sale.sale.quantity }}</td>
                            <td>{{ formatDate(new Date(sale.sale.createdAt)) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
      diaper: {
        model: '',
        description: '',
        availableL: 0,
        availableM: 0,
        availableP: 0,
        boughtL: 0,
        boughtM: 0,
        boughtP: 0,
      },
      sales: {},
      error: '',
      id: '',
      endStockL: 'Calculating...',
      endStockM: 'Calculating...',
      endStockP: 'Calculating...'
    };
  },
  async mounted() {},
  async created() {
    this.id = this.$route.params.id;
    await SaleService.getSales(this.id).then(async data => {
      this.sales = data.data;
    }).catch(async error => {
      this.error += error;
    });
    await DiaperService.getDiaper(this.id).then(async data => {
      this.diaper = await data.data;
      await this.calculateEndOfStock();
    }).catch(async error => {
      this.error += error;
    });
  },
  computed: {},
  methods: {
    async calculateEndOfStock() {
      const prevL = await this.calculate('L');
      const prevM = await this.calculate('M');
      const prevP = await this.calculate('P');

      this.endStockL = prevL;
      this.endStockM = prevM;
      this.endStockP = prevP;
    },
    async calculate(size) {
      const fullStock = await this.getTotalStock(size);
      var remaing = fullStock;

      const sales = await this.getSales(size);
      
      var totalSales = 0;

      var firstSale = null;
      var lastSale = null;
      var count = 0;
      await sales.forEach(ele => {
        count++;
        const date = new Date(ele.createdAt);
        if(totalSales == 0) firstSale = date;
        lastSale = date;

        remaing -= parseInt(ele.quantity);
        totalSales += parseInt(ele.quantity);
      });
      if(count > 1) {
        const diffFirstLast = await this.getDiff(lastSale, firstSale);
        const avarage = (diffFirstLast / totalSales);

        const seconds = avarage * remaing;

        const previsionDate = new Date(firstSale.getTime() + (seconds * 1000));
        return this.formatDate(previsionDate);
      }
      return 'No sufficient data to calculate';
    },
    async getSales(size) {
      const sales = [];
      await this.sales.forEach(sale => {
        if(sale.sale.size == size) {
          sales.push(sale.sale);
        }
      });
      return sales;
    },
    async getTotalStock(size) {
      switch(size){
        case 'L':
          return parseInt(this.diaper.availableL) + parseInt(this.diaper.boughtL);
        case 'M':
          return parseInt(this.diaper.availableM) + parseInt(this.diaper.boughtM);
        case 'P':
          return parseInt(this.diaper.availableM) + parseInt(this.diaper.boughtM);
        default:
          break;
      }
    },
    formatDate(date) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    getDiff(dateNow, dateOld) {
      const diff = dateNow.getTime() - dateOld.getTime();
      const millis = diff / 1000;
      return Math.abs(millis);
    }
  }
};
</script>