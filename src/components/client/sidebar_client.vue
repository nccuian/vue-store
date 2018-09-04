<template>
  <div class="col-md-3 mt-5">
    <ul class="list-group sticky-top">
      <a class="list-group-item list-group-item-light" href="#" 
        @click.prevent="toCategoryPage('', 1)" :class="{'active': isActive == 1}">所有商品</a>
      <a class="list-group-item list-group-item-light" href="#" 
        @click.prevent="toCategoryPage('日用品', 2)" :class="{'active': isActive == 2}">平常用得到</a>
      <a class="list-group-item list-group-item-light" href="#" 
        @click.prevent="toCategoryPage('水果', 3)" :class="{'active': isActive == 3}">吃水果好健康</a>
      <a class="list-group-item list-group-item-light" href="#" 
        @click.prevent="toCategoryPage('貴品', 4)" :class="{'active': isActive == 4}">乾爹您來拉</a>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive: 1,
      }
    },
    methods: {
      toCategoryPage(category, n) {
        this.isActive = n;
        this.$bus.$emit('category-search', category);
      }
    }
  }
</script>

<style scoped>
  .list-group-item {
    border-color: #17a2b8;
    opacity: .8;
    cursor: pointer;
  }
  .list-group-item:hover {
    background-color: #313233;
    opacity: .8;
    color: #f7f7f7;
  }
  .active {
    background-color: #17a2b8;
    position: relative;
  }
  .active::before {
    content: '';
    border: solid 10px;
    border-color: transparent #17a2b8 transparent transparent;
    position: absolute;
    left: -21px;
    width: 0;
    height: 0;
  }
</style>

