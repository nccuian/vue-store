<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand bg-dark" to="/">IAN STORE</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav m-auto">
          <li class="nav-item">
            <router-link class="nav-link text-info" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/coupon_game">優惠券</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              分類商品
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/">平常用得到</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/">吃水果好健康</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/">乾爹您來拉</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/login">管理商品</router-link>
          </li>
        </ul>
        <div class="search-btn">
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" 
              v-model="filter" placeholder="搜尋商品" aria-label="Search">
            <button class="btn-light" @click.prevent="emitFilter">
              <span class="fa fa-search text-dark"> 搜尋</span>
            </button>
          </form>
        </div>
        <router-link class="nav-link text-dark" to="/login"><i class="fas fa-user"></i> 登入</router-link>
      </div>
    </nav>
  </div>  
</template>

<script>
  export default {
    data() {
      return {
        filter: '',
      }
    },
    methods: {
      emitFilter() {
        const vm = this;
        this.$bus.$emit('filter-search', vm.filter);
      }
    },
  }
</script>

<style scoped>
  .navbar-light .navbar-brand:hover, .navbar-light .navbar-brand:focus {
    color: #f1f1f1
  }
  .navbar-collapse {
    opacity: .8;
  }
  .search-btn input {
    width: 0;
    border: 0;
    padding: 1px 0;
    transition: all .5s;
  }
  @media(max-width: 990px) {
    .search-btn:hover input {
      width: 100px;
      padding: .75rem .5rem;
      border: 1px solid #313233;
      border-radius: 5px;
      opacity: .8;
    }
  }
  .search-btn:hover input {
    width: 100px;
    padding: .75rem .5rem;
    border: 1px solid #313233;
    border-radius: 5px;
    opacity: .8;
  }
  .navbar-brand {
    color: #f7f7f7;
   padding: .75rem;
   box-shadow: none; 
  }
</style>

