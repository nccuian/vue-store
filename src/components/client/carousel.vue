<template>
  <div class="container row mt-3 mx-auto px-0">
    <div class="col-md-12 col-sm-9 mx-auto px-0">
      <div class="slide" @mouseover="stop" @mouseout="stop">
        <div class="slide-list">
          <img class="block-100 w-100" 
            v-for="(src, i) in imgList" :src="src" :key="src"
            :class="{'show': i == active}"
          >
        </div>
        <a class="slide-control prev" @click.prevent="change(active -1)">
          <span class="control-icon text-dark"><i class="fas fa-caret-left"></i></span>
        </a>
        <a class="slide-control next" @click.prevent="change(active +1)">
          <span class="control-icon text-dark"><i class="fas fa-caret-right"></i></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        imgList: [
          'https://images.unsplash.com/photo-1459314079206-9970f36c7784?ixlib=rb-0.3.5&s=3c3e1432a79043803dabbb39a9ac1704&auto=format&fit=crop&w=1950&q=80',
          'https://images.unsplash.com/photo-1531171596281-8b5d26917d8b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=587ab48c9716b01c132d71547eb29a03&auto=format&fit=crop&w=2850&q=80',
          'https://images.unsplash.com/photo-1502123909989-c9d05c43046a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d182dfc14194916e86aee12ee0d6690f&auto=format&fit=crop&w=2691&q=80',
          'https://images.unsplash.com/photo-1518687560396-172a78aec156?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c6ddc031f92185a88d4d1f3b7d5cb57&auto=format&fit=crop&w=2242&q=80',
          'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3b0dad6307f4db24e9d52d0140adab06&auto=format&fit=crop&w=934&q=80',
        ],
        play: true,
        timer: null
      }
    },
    methods: {
      change(index) {
        this.active = (index + this.imgList.length) % this.imgList.length
      },
      autoPlay() {
        this.timer = setInterval(() => {
          this.active = (this.active + 1) % this.imgList.length
        },4000)
      },
      stop() {
        // console.log('you hovered me')
        this.play = !this.play
      }
    },
    mounted() {
      this.autoPlay();
    },
    watch: {
      play: function(play) {
        if(play) {
          this.autoPlay();
        } else {
          clearInterval(this.timer);
        }
      }
    }
  }
</script>

<style scoped>
  .silde {
    position: relative;
  }
  .slide-list {
    max-width: 980px;
    padding-bottom: 40%;
  }
  .block-100 {
    display: block;
    height: 100%;
    object-fit: cover;
    transition: all .8s;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }
  .show {
    opacity: 1;
    visibility: visible;
  }
  .slide-control {
    position: absolute;
    top: 0;
    bottom:0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: center;
    opacity: .8;
  }
  .prev {
    left: 0
  }
  .next {
    right: 0
  }
  .control-icon {
    font-size: 2.5rem;
    opacity: .8;
  }
  .slide-control:hover .control-icon {
    opacity: .5;
  }
</style>
