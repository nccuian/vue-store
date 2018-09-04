<template>
  <div class="my-5 row justify-content-center">
    <Loading :active.sync="isLoading"></Loading>
    <form class="col-md-8" @submit.prevent="payOrder">
      <h3>商品資訊</h3>
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
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
            <td colspan="2" class="text-right">總計</td>
            <td>{{ order.total | currencyFilter }}</td>
          </tr>
        </tfoot>
      </table>
      <hr>
      <h3 class="mt-5">付款人資訊</h3>
      <table class="table">
        <tbody>
          <tr>
            <th>Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
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
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        order_id: '',
        order: {
          user: {},
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
      }
    },
    created() {
      this.order_id = this.$route.params.order_id;
      this.getPaymentInfo();
    }
  }
</script>