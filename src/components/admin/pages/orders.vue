<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <table class="table mt-4">
      <thead>
        <th @click="sortByTime">購買時間
          <span class="icon" :class="{'inverse': checkTime}">
            <i class=" fas fa-angle-down text-success"></i>
          </span>
        </th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th @click="sortByPay">是否付款
          <span class="icon" :class="{'inverse': checkPay}">
            <i class=" fas fa-angle-down text-success"></i>
          </span>
        </th>
      </thead>
      <tbody>
        <tr v-for="order in filterdOrders" :key="order.id" v-if="orders.length">
          <td>{{order.create_at | dateFilter}}</td>
          <td>{{order['user'].email}}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in order.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
              </li>
            </ul>
          </td>
          <td>{{order.total | currencyFilter}}</td>
          <td>
            <span v-if="order.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pagination" @emitGetData="getOrders($event)"></Pagination>
  </div>
</template>

<script>
  import Pagination from '../../pagination';
  export default {
    components: {
      Pagination,
    },
    data() {
      return {
        orders: {},
        pagination: {},
        isLoading: false,
        filter: '',
        checkPay: false,
        checkTime: false,
      }
    },
    methods: {
      getOrders( page = 1) {
        this.isLoading = true;
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/admin/orders?page=${page}`;
        this.$http.get(api).then((response) => {
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
          this.isLoading = false;
        })
      },
      filterSearch(filter) {
        this.filter = filter;
      },
      sortByTime() {
        this.filterdOrders = this.orders.sort((a, b) => {
           if(this.checkTime) {
             return b.create_at - a.create_at
           } else {
             return a.create_at - b.create_at
           }
        });
        this.checkTime = !this.checkTime
      },
      sortByPay() {
        this.filterdOrders = this.orders.sort((a, b) => {
          const aIsPaid = a.is_paid? 1: 0;
          const bIsPaid = b.is_paid? 1: 0;
          if(this.checkPay) {
            return bIsPaid - aIsPaid;
          } else {
            return aIsPaid - bIsPaid;
          }
        });
        this.checkPay = !this.checkPay
      }
    },
    computed: {
      filterdOrders: {
        get() {
          if(this.filter == '') {
            return this.orders
          } else {
            return this.orders.filter((item) => {
              return item['user'].email.indexOf(this.filter) > -1
            });
          }
        },
        set(value) {}
      },
    },
    created() {
      this.getOrders();
      this.$bus.$on('filter-search', this.filterSearch)
    }
  }
</script>

<style scoped>
  .icon {
    display: inline-block;
  }
  .icon.inverse {
    transform: rotate(180deg)
  }
</style>

