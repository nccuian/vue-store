<template>
  <div class="my-5 row justify-content-center">
    <div class="mt-5 row justify-content-center">
      <h3 class="text-center">模擬購物車</h3>
      <table class="table">
        <thead>
          <th></th>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
          <th>總價</th>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
              <button type="button" class="btn btn-sm btn-outline-danger"
                @click="emitRemoveCart(item.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{item.product.title}}
              <div class="text-success" v-if="item.coupon">
                以套用優惠券
              </div>
            </td>
            <td class="align-middle">
              {{item.qty}}
            </td>
            <td class="align-middle">
              {{item.product.price | currencyFilter}}
            </td>
            <td class="align-middle">
              {{item.product.price * item.qty | currencyFilter}}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">總計</td>
            <td class="text-right">{{cart.total | currencyFilter}}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="4" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{cart.final_total | currencyFilter}}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" 
            @click="emitAddCouponCode(coupon_code)">
            套用優惠碼
          </button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    props: ['cart'],
    data() {
      return {
        coupon_code: '',
      }
    },
    methods: {
      emitRemoveCart(id) {
        this.$emit('emitRemoveCart', id)
      },
      emitAddCouponCode(code) {
        this.$emit('emitAddCouponCode', code)
      }
    }
  }
</script>
