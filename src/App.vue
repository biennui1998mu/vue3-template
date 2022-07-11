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

  <VuenosInputMoney ref="InputMoneyRef"
                    @getValue="getMoneyVal"
                    @blur="blurInput"
                    :placeholder="'Số tiền'"
                    :suffix="'VNĐ'"
                    :maxLength="14"
                    :disabled="false"
                    :error="false"
                    :showText="true">
  </VuenosInputMoney>
  <VuenosUploadImage :type="'upload'" @getImgFileList="getImgFileList"></VuenosUploadImage>

</template>

<script lang="ts">
import Dialog from "@/share/components/Dialog/Dialog.vue"
import { ref } from "vue"
import VuenosUploadImage from 'vuenos-upload-image'
import VuenosInputMoney from 'vuenos-input-money'

export default {
  components: {Dialog, VuenosUploadImage, VuenosInputMoney},
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
    const getMoneyVal = (val:any) => {
      console.log(val);
    }
    const blurInput = async () => {
      //do something
    }
    return {
      isDialogVisible,
      openDialog,
      closeDialog,
      getImgFileList,
      getMoneyVal,
      blurInput
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
