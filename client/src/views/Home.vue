<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{name: 'Home'}">Dashboard</router-link>
          </li>
          <li class="breadcrumb-item active">Home</li>
        </ol>
      </div>
    </div>
    <div class="row" v-if="error">
      <div class="col-12">
        <div class="alert alert-danger">
          An error has occurred: {{ error }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-3">
        <div class="card text-white bg-warning o-hidden h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="fas fa-fw fa-list"></i>
            </div>
            <div class="mr-5">{{ totalDiapers }} Diapers</div>
          </div>
          <router-link class="card-footer text-white clearfix small z-1" :to="{name: 'Diapers'}">
            <span class="float-left">More details</span>
            <span class="float-right">
              <i class="fas fa-angle-right"></i>
            </span>
          </router-link>
        </div>
      </div>

      <div class="col-xl-3 col-sm-6 mb-3">
        <div class="card text-white bg-warning o-hidden h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="fas fa-fw fa-list"></i>
            </div>
            <div class="mr-5">{{ totalSales }} Sales</div>
          </div>
          <router-link class="card-footer text-white clearfix small z-1" :to="{name: 'Diapers'}">
            <span class="float-left">More details</span>
            <span class="float-right">
              <i class="fas fa-angle-right"></i>
            </span>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import DiaperService from '@/services/DiaperService';

export default {
  name: 'home',
  data() {
    return {
      totalDiapers: 0,
      error: '',
      totalSales: 0
    }
  },
  async beforeCreate() {
    
  },
  async mounted() {
    
  },
  async created() {
    try {
      this.totalDiapers = await DiaperService.getTotalDiapers();
    } catch(err) { 
      this.error += err;
    }
    try {
      const data = await DiaperService.getDiapers();
      data.map(async doc => {
        const boughtL = await doc.data.boughtL;
        const boughtM = await doc.data.boughtM;
        const boughtP = await doc.data.boughtP;
        this.totalSales += (parseInt(boughtL) + parseInt(boughtM) + parseInt(boughtP));
      });
    } catch(err) {
      this.error += err;
    }
  },
  methods: {
    
  },
}
</script>
