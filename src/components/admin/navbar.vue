<template>
    <div>
      <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
        <input class="form-control form-control-dark w-100" type="text" 
          v-model="filter" @keyup.enter="emitFilter"
          placeholder="搜尋品項名稱/Email" aria-label="Search">
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" v-if="isLogin" @click.prevent="logout">登出</a>
            <a class="nav-link" href="#" v-else @click.prevent="login">登入</a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        isLogin: false,
        filter: '',
      }
    },
    methods: {
      logout() {
        const api = `${process.env.APIPATH}/logout`;
        this.$http.post(api).then((response) => {
          if(response.data.success) {
            this.isLogin = false;
            this.$router.push('/login');
          }
        });
      },
      login() {
        this.$router.push('/login');
      },
      checkLogin() {
        const api = `${process.env.APIPATH}/api/user/check`;
        this.$http.post(api).then((response) => {
          if(response.data.success) {
            this.isLogin = true;
          } else {
            this.isLogin = false;
          }
        })
      },
      emitFilter() {
        const vm = this;
        this.$bus.$emit('filter-search', vm.filter)
      }
    },
    mounted() {
      this.checkLogin();
    }
  }
</script>
