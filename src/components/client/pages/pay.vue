<template>
  <div class="bg-light">
    <div class="py-5 d-flex justify-content-center">
      <Loading :active.sync="isLoading"></Loading>
      <form class="col-md-8">
        <h3 class="text-light lead bg-dark d-inline-block p-3">商品資訊</h3>
        <table class="table">
          <thead>
            <th class="lead">品名</th>
            <th class="lead">數量</th>
            <th class="lead">單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{item.product.title}}</td>
              <td class="align-middle">{{item.qty}}</td>
              <td class="align-middle">{{item.final_total | currencyFilter}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right lead">總計</td>
              <td class="lead">{{ order.total | currencyFilter }}</td>
            </tr>
          </tfoot>
        </table>
        <hr>
        <h3 class="mt-5 text-light lead bg-dark d-inline-block p-3">付款人資訊</h3>
        <table class="table">
          <tbody>
            <tr>
              <th class="lead">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th class="lead">姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th class="lead">聯絡電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th class="lead">收件地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right">
          <button class="btn btn-danger" v-if="order.is_paid === false"
            @click.prevent="payOrder">確認付款
          </button>
          <button class="btn btn-info" v-if="order.is_paid !== false"
           @click.prevent="goBack">返回商品列表
          </button>
        </div>
      </form>
    </div>
    <Footer></Footer>
    <Alert></Alert>
  </div>
</template>

<script>
import Footer from '../footer'
import Alert from '../../alertMessage'
  export default {
    components: {
      Alert,
      Footer
    },
    data() {
      return {
        order_id: '',
        order: {
          user: {}
        },
        isLoading: false,
      }
    },
    methods: {
      getPaymentInfo() {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/order/${this.order_id}`;
        this.$http.get(api).then((response) => {
          this.order = response.data.order;
          if(response.data.order.is_paid) {
            this.$bus.$emit('message-push', '付款已完成', 'success')
          }
        });
      },
      payOrder() {
        this.isLoading = true;
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/pay/${this.order_id}`
        this.$http.post(api).then((response) => {
          if(response.data.success) {
            this.isLoading = false;
            this.getPaymentInfo();
          }
        });
      },
      goBack() {
        this.$router.push('/');
      }
    },
    created() {
      this.order_id = this.$route.params.order_id;
      this.getPaymentInfo();
    }
  }
</script>

<style>
  
</style>
