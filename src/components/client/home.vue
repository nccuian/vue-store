<template>
  <div>
    <Navbar></Navbar>
    <Alert></Alert>
    <Carousel></Carousel>
    
    <router-view></router-view>

    <div class="cart">
      <button class="cart-icon" @click.prevent="openBox = !openBox">
        <i class="fas fa-shopping-bag text-info"></i>
      </button>
      <span id="cart-total" class="bg-danger">{{cartTotal}}</span>
      <div class="cart-box" v-show="openBox">
        <div class="row justify-content-center bg-light py-3 rounded dark-border">
          <div class="col-md-12">
            <h5 class="text-dark">購物清單</h5>
            <span><i class="fas fa-spinner fa-spin" v-show="isLoading"></i></span>
            <table class="table my-0">
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button type="button" class="btn bg-transparent btn-sm" @click="removeCart(item.id)">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="text-info">{{item.product.title}}</td>
                  <td>{{item.qty}} {{item.product.unit}}</td>
                  <td v-if="item.product.origin_price">{{item.product.origin_price * item.qty | currencyFilter}}</td>
                  <td v-if="!item.product.origin_price">{{item.product.price * item.qty | currencyFilter}}</td>
                </tr>
              </tbody>
            </table>
            <a v-if="cartTotal == 0" href="#" class="d-block btn btn-sm bg-danger text-light">購物車還空空的！</a>
            <router-link v-else to="/checkout" class="d-block btn btn-sm bg-danger text-light">結帳去</router-link>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
  import Navbar from './navbar_client'
  import Carousel from './carousel'
  import Alert from '../alertMessage'
  import Footer from './footer'

  export default {
    components: {
      Navbar,
      Carousel,
      Alert,
      Footer,
    },
    data() {
      return {
        openBox: false,
        cart: {},
        cartTotal: 0,
        isLoading: false,
      }
    },
    methods: {
      getCart() {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/cart`;
        this.$http.get(api).then((response) => {
          this.cart = response.data.data;
          this.cartTotal = this.cart.carts.length;
        })
      },
      removeCart(id) {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/cart/${id}`;
        this.isLoading = true;
        this.$http.delete(api).then((response) => {
          this.getCart();
          this.isLoading = false;
        });
      }
    },
    created() {
      this.getCart();
      this.$bus.$on('emitGetCart', this.getCart);
    },
    beforeDestroy() {
      this.$bus.$off('emitGetCart', this.getCart);
    }
  }
</script>

<style scoped>
  .cart {
    position: fixed;
    bottom: 60px;
    right: 23px;
    z-index: 200;
  }
  .dark-border {
    border: 1px solid #313233
  }
  .cart-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    background-color: transparent;
    border-radius: 50%;
    padding: 10px 12.5px;
  }
  .cart-icon:hover {
    border-color: #17a2b8;
    opacity: .8;
  }
  .cart-icon:focus {
    outline: none;
  }
  .cart-icon i {
    font-size: 2.5rem;
  }
  .cart #cart-total {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #fff;
    border: 1px solid #ef5d5d;
    border-radius: 50%;
    padding: 3px 9px;
  }
  .cart-box {
    position: relative;
    bottom: 50px;
    right: 83px;
  }
  .table td {
    padding: .3rem;
  }
</style>

