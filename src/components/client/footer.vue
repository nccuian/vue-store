<template>
  <div class="d-felx justify-content-center mt-5 bg-dark">
    <div class="container py-4">
      <div class="col-md-8 mx-auto text-center">
        <h2 class="text-light my-3">IAN STORE</h2>
        <div class="text-light quote-area">
          <p class="text-light quote mb-0">Hey,</p>
          <p class="text-light quote mb-0">this is the very bottom of the page .</p>
          <p class="text-light quote mb-0">Now you see me !</p>
        </div>
        <hr class="mt-0 bg-light">
        <div class="icon-area mx-auto mt-5 mb-4">
          <router-link to="/"><i class="fas fa-home"></i></router-link>
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-instagram"></i>
        </div>
        <div class="tel">
          <p>Calling :</p>
          <p>0912-123-321</p>
        </div>
        <div class="copyright mt-5">
          <p class="text-light">ⓒ 2018 Created by Ian Tsai .</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h2 {
    font-size: 2.5rem;
    border: 2px solid #f7f7f7;
    display: inline-block;
    padding: 10px 15px;
  }
  .quote-area {
    text-align: left;
  }
  @media(max-width: 767px) {
    .quote-area {
      text-align: center;
    }
  }
  .quote {
    font-size: 1.5rem;
  }
  .icon-area i {
    font-size: 1.5rem;
    margin: 0 20px;
    color: #f7f7f7;
    cursor: pointer;
    transition: font .5s;
  }
  .icon-area i:hover {
    font-size: 2rem;
  }
  .tel p {
    font-size: 1.5rem;
    color: #f7f7f7;
    margin-bottom: 0;
    letter-spacing: 5px;
  }
</style>

