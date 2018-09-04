<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        messages: [],
      }
    },
    methods: {
      updateMessage(message, status) {
        const timestamp = Math.floor(new Date()/1000);
        this.messages.push({
          message,
          status,
          timestamp
        });
        this.removeMessageBySelf(timestamp);
      },
      removeMessage(i) {
        this.messages.splice(i, 1);
      },
      removeMessageBySelf(timestamp) {
        const vm = this;
        setTimeout(() => {
          vm.messages.forEach((item, i) => {
            if(item.timestamp === timestamp) {
              vm.messages.splice(i, 1);
            }
          });
        }, 5000);
      },
      pushMessage(...org) {
        this.updateMessage(...org);
      }
    },
    created() {
      this.$bus.$on('message-push', this.pushMessage);
    },
    beforeDestroy() {
      this.$bus.$off('message-push', this.pushMessage);
    }
  }
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>