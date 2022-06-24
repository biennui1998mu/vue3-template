<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
  <button class="btn btn-primary" @click="openDialog">Open Dialog</button>
  <Dialog v-show="isDialogVisible"
          @close="closeDialog">
    <template v-slot:header>
      This is a new modal header.
    </template>

    <template v-slot:body>
      This is a new modal body.
    </template>

    <template v-slot:footer></template>
  </Dialog>

  <VuenosUploadImage :type="'upload'" @getImgFileList="getImgFileList"></VuenosUploadImage>
</template>

<script lang="ts">
import Dialog from "@/components/Dialog/Dialog.vue"
import { ref } from "vue"
import VuenosUploadImage from 'vuenos-upload-image'

export default {
  components: {Dialog, VuenosUploadImage},
  setup() {
    const isDialogVisible = ref(false)
    const openDialog = () => {
      isDialogVisible.value = true
    }
    const closeDialog = () => {
      isDialogVisible.value = false
    }
    const getImgFileList = (val:any) => {
      console.log(val)
    }
    return {
      isDialogVisible,
      openDialog,
      closeDialog,
      getImgFileList
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/custom";
@import "@/assets/_button/button.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
