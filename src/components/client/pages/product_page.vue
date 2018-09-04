<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-3 mt-3">
        <div class="sticky-top p-3">
          <div class="product-name">
            <p class="text-dark">{{product.title}}</p>
          </div>
          <div class="product-price">
            <span v-if="!product.origin_price" class="text-dark">NT.{{product.price}}</span>
            <span v-if="product.origin_price" class="line-through mr-3">NT.{{product.price}}</span>
            <span v-if="product.origin_price" class="text-dark">NT.{{product.origin_price}}</span>
          </div>
          <hr class="mt-0">
          <div class="quantity">
            <p class="text-dark">選取數量</p>
            <div class="quantity_ui">
              <a class="qui_btn minus text-dark" v-if="product.num > 1" @click.prevent="product.num--">-</a>
              <input type="text" class="text-center text-dark" v-model="product.num">
              <a class="qui_btn plus text-dark" v-if="product.num < 10" @click.prevent="product.num++">+</a>
            </div>
          </div>
          <div class="sum mt-3">
            <p class="text-dark mb-0">小計</p>
            <p class="total" v-if="product.origin_price">NT.{{product.num * product.origin_price}}</p>
            <p class="total" v-if="!product.origin_price">NT.{{product.num * product.price}}</p>
          </div>
          <div class="add mt-4">
            <button class="w-100 btn btn-sm btn-outline-info" @click="addToCart(product.num)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem"></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-9 mt-3">
        <div class="pic-box">
          <img :src=product.imageUrl alt="">
        </div>
      </div>
    </div>
    <hr>
    <div class="row justify-content-center mt-3">
      <div class="col-md-9 content">
        <div class="text-center">
          <h3 class="font-weight-normal px-3">產品描述</h3>
          <div class="mt-3">
            <div class="mb-4">{{product.content}}</div>
            <div>{{product.description}}</div>
          </div>
        </div>
        <div class="text-center mt-4">
          <img src="https://picsum.photos/640/360/?random" class="d-blokc img-fluid mx-auto">
        </div>
        <div class="text-center mt-4 mb-3">
          <img src="https://picsum.photos/640/320/?random" class="d-blokc img-fluid mx-auto">
        </div>
        <div class="text-center mt-4 mb-3">
          <img src="https://picsum.photos/g/640/360/?random" class="d-blokc img-fluid mx-auto">
        </div>
      </div>
    </div>
    <div class="side-box">
      <div class="toTop btn btn-sm" ref="topBtn" @click="goTop">
        <div class="top-icon"><i class="fas fa-caret-up"></i></div>
        <span>top</span>
      </div>
      <div class="back" @click="goBack">
        <span class="btn btn-outline-dark btn-sm"><i class="fas fa-caret-left"></i> back</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        product: {},
        status: {
          loadingItem: false,
        },
        isTop: true,
        timer: null,
      }
    },
    methods: {
      getProduct() {
        // const id = this.$route.params.id;
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/product/${this.id}`;
        this.$http.get(api).then((response) => {
          this.product = response.data.product;
        })
      },
      addToCart(qty = 1) {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/cart`;
        this.status.loadingItem = true;
        const cart = {
          product_id: this.id,
          qty
        }
        this.$http.post(api, {data: cart}).then((response) => {
          this.status.loadingItem = false;
          this.$bus.$emit('emitGetCart');
          this.$bus.$emit('message-push', response.data.message, 'success');
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      goTop() {
        this.timer = setInterval(() => {
          let top = document.documentElement.scrollTop;
          let speed = Math.floor(-top / 5);
          document.documentElement.scrollTop = top + speed
          this.isTop = true;
          if( top === 0 ) {
            clearInterval(this.timer);
          }
        }, 30)
      },
      needScrollTop() {
        let clientHeight = document.documentElement.clientHeight;
        let btn = this.$refs.topBtn;
        window.onscroll = function() {
          let top = document.documentElement.scrollTop;
          if(top >= clientHeight) {
            btn.style.opacity = 1;
          } else {
            btn.style.opacity = 0;
          }
          if(!this.isTop) {
            clearInterval(this.timer)
          }
          this.isTop = false;
        }
      }
    },
    created() {
      this.getProduct();
    },
    mounted() {
      document.documentElement.scrollTop = 0;
      this.needScrollTop();
    }
  }
</script>

<style scoped>
.sticky-top {
  border: 1px solid #313233
}
  .product-name p {
    font-size: 1.5rem;
  }
  .product-price span {
    font-size: 1.5rem;
    margin-bottom: 2px;
  }
  .line-through {
    text-decoration: line-through;
    opacity: .8;
    font-size: 1.3rem
  }
  .quantity_ui {
    border: 1px solid #313233;
    width: 50%;
    position: relative;
    padding: 0 23px;
  }
  .quantity_ui input{
    font-size: 1rem;
    border: none;
    width: 100%;
  }
  .quantity_ui input:focus {
    outline-style: none;
  }
  .qui_btn {
    position: absolute;
    display: block;
    width: 23px;
    height: 23px;
    top: 0;
    text-align: center;
    font-size: 1rem;
    z-index: 10;
    cursor: pointer;
  }
  .qui_btn.minus {
    left: 0
  }
  .qui_btn.plus {
    right: 0
  }
  .sum .total {
    font-size: 1rem;
  }
  .pic-box {
    position: relative;
    max-width: 100%;
    padding-bottom: 50%;
  }
  .pic-box img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content h3 {
    border: 2px solid #313233;
    color: #313233;
    display: inline-block;
    opacity: .8;
  }
  .side-box {
    position: fixed;
    bottom: 60px;
    left: 53px;
  }
  .toTop {
    position: absolute;
    bottom: 50px;
    left: 0;
    padding-left: 1.1rem;
    opacity: 0;
    transition: opacity .5s;
  }
  .top-icon {
    position: absolute;
    left: 44%;
    top: -30%;
  }
  .top-icon i {
    font-size: 1.3rem;
  }
  .back {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  @media(max-width: 767px) {
    .toTop {
      bottom: -50px;
      left: -50px;
    }
    .toTop i, .toTop span {
      color: #17a2b8;
    }
    .back {
      display: none;
    }
  }
</style>
