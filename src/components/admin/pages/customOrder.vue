<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in filterdProducts" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
          :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5 ml-auto" v-if="!item.price">售價{{item.origin_price}}元</div>
              <del class="h6" v-if="item.price">原價{{item.origin_price}}元</del>
              <div class="h5" v-if="item.price"><span class="text-info">特價</span> {{item.price}}元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" 
              @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Product Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" @keyup.enter="updateProduct">
			<div class="modal-dialog" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-dark text-white">
						<h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="block-quote mt-3">
              <p class="mt-0">{{product.content}}</p>
              <footer class="block-footer">{{product.description}}</footer> 
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{product.origin_price}}元</div>
              <del class="h5" v-if="product.price">原價{{product.origin_price}}元</del>
              <div class="h5" v-if="product.price"><span class="text-info">特價</span> {{product.price}}元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option v-for="num in 10" :value="num" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
					</div>
					<div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 
              <strong v-if="product.price">{{product.num * product.price}}</strong>
              <strong v-if="!product.price">{{product.num * product.origin_price}}</strong>
              元
            </div>
            <button type="button" class="btn btn-primary" @click="addToCart(product.id, product.num)">
              加到購物車
            </button>
					</div>
				</div>
			</div>
		</div>
    <!-- pages -->
    <Pagination :pagination="pagination" @emitGetData="getData($event)"></Pagination>
    <hr>
    <Cart :cart="cart" 
      @emitRemoveCart="removeCart($event)"
      @emitAddCouponCode="addCouponCode($event)">
    </Cart>
    <hr>
    <PayInfo></PayInfo>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Pagination from '../../pagination';
  import Cart from '../cart';
  import PayInfo from '../payInfo';

  export default {
    components: {
      Pagination,
      Cart,
      PayInfo,
    },
    data() {
      return {
        products: [],
        product: {},
        cart: {},
        status: {
          loadingItem: '',
        },
        pagination: {},
        isLoading: false,
        filter: '',
      }
    },
    methods: {
      getData(page = 1) {
        this.isLoading = true;
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/products?page=${page}`;
        this.$http.get(api).then((response) => {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
          this.isLoading = false
        });
      },
      getProduct(id) {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/product/${id}`;
        this.status.loadingItem = id;
        this.$http.get(api).then((response) => {
          this.product = response.data.product
          $('#productModal').modal('show');
          this.status.loadingItem = '';
        })
      },
      addToCart(id, qty = 1) {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/cart`;
        this.status.loadingItem = id;
        const cart = {
          product_id: id,
          qty
        }
        this.$http.post(api, { data: cart }).then((response) => {
          this.status.loadingItem = '';
          $('#productModal').modal('hide');
          this.getCart();
        })
      },
      getCart() {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/cart`;
        this.$http.get(api).then((response) => {
          this.cart = response.data.data;
        })
      },
      removeCart(id) {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/cart/${id}`;
        this.isLoading = true;
        this.$http.delete(api).then((response) => {
          this.getCart();
          this.isLoading = false;
        });
      },
      addCouponCode(code) {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/coupon`;
        const coupon = {code: code}
        this.isLoading = true;
        this.$http.post(api, {data: coupon}).then((response) => {
          if(response.data.success) {
            this.getCart();
            this.isLoading = false;
            this.$bus.$emit('message-push', response.data.message, 'success');
          } else {
            this.getCart();
            this.isLoading = false;
            this.$bus.$emit('message-push', response.data.message, 'danger');
          }
        });
      },
      filterSearch(filter) {
        this.filter = filter;
      }
    },
    computed: {
      filterdProducts() {
        if(this.filter.trim() == '') {
          return this.products
        } else {
          return this.products.filter((item) => {
            return item.title.indexOf(this.filter) > -1
          });
        }
      }
    },
    created() {
      this.getData();
      this.getCart();
      this.$bus.$on('filter-search', this.filterSearch);
    }
  }
</script>