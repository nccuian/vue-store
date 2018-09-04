<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click="emitGetData(pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        
        <li class="page-item" v-for="page in pagination.total_pages" :key="page" 
          :class="{'active': page === pagination.current_page}">
          <a class="page-link" href="#" @click="emitGetData(page)">{{page}}</a>
        </li>
        
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click="emitGetData(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    props: ['pagination'],
    methods: {
      emitGetData(page) {
        this.$emit('emitGetData', page);
      }
    }
  }
</script>

<style scoped>
  .page-item.active .page-link {
    background-color: #17a2b8;
    border-color: #17a2b8;
    color: #f7f7f7;
  }
  .page-link {
    color: #17a2b8
  }
</style>

