<template>
  <div class="money-bg bg-light">
    <div class="container py-5">
      <h1 class=" bg-light py-3 font-weight-bold text-dark text-center mb-5" style="border:1px solid #313233">
        TRY TOUR LUCK TO WIN A <span class="text-danger">FREE COUPON</span> !
      </h1>
      <div class="row mx-auto">
        <div class="col-md-4">
          <div class="card w-75 mx-auto" @click="choose(1)" :class="{rotate : pick == 1}">
            <div class="text-center" style="font-size: 2rem">
              <p class="text-light font-weight-bold">{{word}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card w-75 mx-auto" @click="choose(2)" :class="{rotate2 : pick == 2}">
            <div class="text-center" style="font-size: 2rem">
              <p class="text-light font-weight-bold">{{word}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card w-75 mx-auto" @click="choose(3)" :class="{rotate3 : pick == 3}">
            <div class="text-center" style="font-size: 2rem">
              <p class="text-light font-weight-bold">{{word}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="coupon-box" v-if="show">
      <h2>Congratulations! 
        <span v-if="pick==1" style="color: rgb(255, 217, 0)">You win the 1st prize.</span>
        <span v-if="pick==2" style="color: rgb(192,192,192, .8)">You win the 2nd prize.</span>
        <span v-if="pick==3" style="color: rgb(160, 64, 0)">You win the 3re prize.</span>
      </h2>
      <hr>
      <p class="text-dark">
        Now, you can use: 
        <span class="text-danger border rounded bg-light p-1">code123</span>
        , to enjoy the <span class="font-weight-bold">50%</span> off everytime you shop
      </p>
      <router-link class="btn btn-sm btn-danger" to="/">GO shopping</router-link>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '../footer'
  export default {
    components: {
      Footer,
    },
    data() {
      return {
        pick: 0,
        done: false,
        word: 'Pick me',
        show: false,
        text: {
          gold: '1st Prize',
          silver: '2nd Prize',
          bronze: '3rd Prize'
        }
      }
    },
    methods: {
      choose(num) {
        if(this.done) {
          return
        } else {
          this.pick = num;
          this.done = true;
          this.word = this.pick==1? this.text.gold: this.pick==2? this.text.silver: this.text.bronze;
          setTimeout(() => {
            this.show = true;
          }, 2500)
        }
      }
    }
  }
</script>

<style scoped>
  .money-bg {
    min-height: 100vh;
    background-image: url(https://c1.staticflickr.com/8/7693/17123251389_bed3c3a1ba_b.jpg);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .row {
    justify-content: space-around;
    align-items: center;
  }
  .col-md-4 {
    perspective: 500px;
  }
  .card {
    justify-content: center;
    align-items: center;
    padding: 40% 13%;
    background-color: #313233;
    transition: all 1.5s;
    transform-style: preserve-3d;
    border: 1px solid #313233;
    margin-bottom: 10px;
  }
  .card:hover {
    box-shadow: 5px 5px 10px 5px #313233;
  }
  .rotate {
    transform: rotateY(540deg);
    background-color: rgb(255, 217, 0, .8);
    box-shadow: 0px 0px 10px 5px gold;
    border-color: gold;
  }
  .rotate2 {
    transform: rotateY(540deg);
    background-color: rgba(192, 192, 192, .8);
    box-shadow: 0px 0px 10px 5px silver;
    border-color: silver;
  }
  .rotate3 {
    transform: rotateY(540deg);
    background-color: rgb(160, 64, 0, .8);
    box-shadow: 0px 0px 10px 5px rgb(160, 64, 0);
    border-color: rgb(160, 64, 0);
  }
  .coupon-box {
    position: absolute;
    max-width: 450px;
    margin: 0 auto;
    text-align: center;
    background-color: #f1f1f1;
    border: 1px solid #313233;
    padding: 20px 10px;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }
  .coupon-box h2 {
    font-size: 3rem;
  }
  .coupon-box p {
    font-size: 1.5rem;
  }
  @media(max-width: 500px) {
    .coupon-box h2 {
      font-size: 2rem;
    }
    .coupon-box p {
      font-size: 1.2rem;
    }
  }
</style>

