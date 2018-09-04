<template>
<div class="container mt-3">
  <div class="row">
    <Sidebar></Sidebar>
    <div class="col-md-9 mt-3">
      <Loading :active.sync="isLoading"></Loading>
      <button class="btn btn-info ml-auto d-block" v-if="this.filter.trim() == '' && this.category == ''" 
        @click.prevent="getData(); pageMode = !pageMode">
        <span v-show="pageMode">返回顯示全部</span>
        <span v-show="!pageMode">分頁顯示</span>
      </button>
      <div class="row mt-3">
        <div class="col-md-6 col-lg-4 mb-4" v-for="item in filterdProducts" :key="item.id">
          <div class="card border-0 shadow-sm">
            <div class="cover-box" style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
              <router-link :to="{name: 'ProductPage', params: {id: item.id}}" class="cover">
                <div class="cover-text">MORE</div>
              </router-link>
            </div>
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
              <h5 class="card-title font-weight-normal">
                <router-link :to="{name: 'ProductPage', params: {id: item.id}}" class="text-dark">{{item.title}}</router-link>
              </h5>
              <hr>
              <p class="card-text text-dark">{{item.content}}</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5 ml-auto" v-if="!item.origin_price">NT. {{item.price}}元</div>
                <del class="h6 font-weight-normal text-dark" v-if="item.origin_price">NT.{{item.price}}元</del>
                <div class="h5 text-dark" v-if="item.origin_price"><span class="text-info">特價</span> {{item.origin_price}}元</div>
              </div>
            </div>
            <div class="card-footer d-flex">
              <router-link :to="{name: 'ProductPage', params: {id: item.id}}" 
                class="btn btn-outline-secondary btn-sm">
                查看更多
              </router-link>
              <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                @click="addToCart(item.id)">
                <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Pagination v-if="pageMode" :pagination="pagination" @emitGetData="getData($event)"></Pagination>
    </div>
  </div>
</div>
  
</template>

<script>
import Pagination from '../../pagination';
import Sidebar from '../sidebar_client';
export default {
  components: {
    Pagination,
    Sidebar,
  },
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      pagination: {},
      filter: '',
      category: '',
      allProducts: [],
      newArr: [],
      pageMode: false,
      status: {
        loadingItem: '',
      }
    };
  },
  methods: {
    getData(page = 1) {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/products?page=${page}`;
      this.$http.get(api).then(response => {
        this.products = response.data.products;
        this.pagination = response.data.pagination;
        this.isLoading = false;
      });
    },
    getAll() {
      const api_all = `${process.env.APIPATH}/api/${process.env.MYPATH}/products/all`;
      this.$http.get(api_all).then(response => {
        this.allProducts = response.data.products;
      });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/cart`;
      this.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, {data: cart}).then((response) => {
        this.status.loadingItem = '';
        this.$bus.$emit('emitGetCart');
        this.$bus.$emit('message-push', response.data.message, 'success');
      })
    },
    filterSearch(filter) {
      this.filter = filter;
    },
    categorySearch(category) {
      // this.needPage = false;
      if(category != '') {
        this.category = category;
        this.pageMode = false;
        this.newArr = this.allProducts.filter((item) => {
          return item.category == category
        })
      } else {
        this.category = category;
        this.newArr = this.allProducts;
      }
    }
  },
  computed: {
    filterdProducts: {
      get() {
        if(this.pageMode) {
          return this.products
        } else if(this.filter.trim() == '' && this.category == '') {
          return this.allProducts
        } else if(this.filter.trim() == '' && this.category != '') {
          return this.newArr
        } else if(this.filter.trim() != '' && this.category == '') {
          return this.allProducts.filter((item) => {
            return item.title.indexOf(this.filter) > -1
          });
        } else {
          return this.newArr.filter((item) => {
            return item.title.indexOf(this.filter) > -1
          });
        }
      },
      set(value) {}
    },
  },
  created() {
    this.getAll();
    this.$bus.$on('filter-search', this.filterSearch);
    this.$bus.$on('category-search', this.categorySearch);
  },
  updated() {
    if(this.filter != '') {
      this.pageMode = false;
    }
  },
  beforeDestroy() {
    this.$bus.$off('filter-search', this.filterSearch);
  }
};
</script>

<style scoped>
  .btn.btn-info {
    opacity: .8;
  }
  .cover-box {
    position: relative;
  }
  .cover {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0,0,0,.5);
    cursor: pointer;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity .2s;
  }
  .cover-box:hover .cover {
    opacity: 1;
    text-decoration: none;
  }
  .cover-text {
    font-size: 1.3rem;
    color: #f1f1f1;
    border-bottom: 1px solid;
  }
</style>

