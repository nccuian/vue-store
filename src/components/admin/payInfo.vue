<template>
  <div>
    <div class="my-5 row justify-content-center">
      <h3 class="col-md-12 text-center">付款資訊</h3>
      <form class="col-md-6" @submit.prevent="creatOrder">

        <div class="form-group">
          <label for="email">Email *</label>
          <input class="form-control" type="emil" name="email" id="email" placeholder="請輸入email"
            v-model="form.user.email"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}">
          <span class="text-danger" v-if="errors.has('email')"> 
            {{ errors.first('email') }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名 *</label>
          <input class="form-control" type="text" name="username" id="username" placeholder="請輸入姓名"
            v-model="form.user.name"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('username')}">
          <span class="text-danger" v-if="errors.has('username')">
            請輸入姓名
          </span>
        </div>

        <div class="form-group">
          <label for="tel">收件人電話號碼</label>
          <input class="form-control" type="number" id="tel" placeholder="請輸入電話號碼"
            v-model="form.user.tel">
        </div>

        <div class="form-group">
          <label for="adress">收件人地址 *</label>
          <input class="form-control" type="text" name="address" id="adress" placeholder="請輸入地址"
            v-model="form.user.address"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('address')}">
          <span class="text-danger" v-if="errors.has('address')">
            請輸入地址
          </span>
        </div>

        <div class="form-group">
          <label for="message">備註</label>
          <textarea v-model="form.message" class="form-control" name="message" id="message" 
            cols="30" rows="10"></textarea>
        </div>

        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          user: {},
          message: ''
        },
      }
    },
    methods: {
      creatOrder() {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/order`;
        const order = this.form
        this.$validator.validate().then(result => {
          if (result) {
            this.$http.post(api, {data: order}).then((response) => {
              if(response.data.success) {
                this.$bus.$emit('message-push', response.data.message, 'success');
                this.$router.push(`/admin/pay_checkout/${response.data.orderId}`);
              }
            })
          } else {
            this.$bus.$emit('message-push', '請再次確認表單是否填寫正確', 'danger');
          }
        });
      },
    },
  }
</script>
