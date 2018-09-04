<template>
    <div>
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>管理員</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item" @click="isActive = 1" :class="{isActive: isActive == 1}">
                <router-link to="/admin/products" class="nav-link">
                  管理產品列表
                </router-link>
              </li>
              <li class="nav-item" @click="isActive = 2" :class="{isActive: isActive == 2}">
                <router-link to="/admin/coupons" class="nav-link">
                  管理優惠券
                </router-link>
              </li>
              <li class="nav-item" @click="isActive = 3" :class="{isActive: isActive == 3}">
                <router-link to="/admin/orders" class="nav-link">
                  查看訂單
                </router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>模擬</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item" @click="isActive = 4" :class="{isActive: isActive == 4}">
                <router-link to="/admin/custom_order" class="nav-link">
                  模擬訂單
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive: 1,
      }
    }
  }
</script>

<style scoped>
  .isActive{
    background-color: #d1d1d1;
  }
</style>
