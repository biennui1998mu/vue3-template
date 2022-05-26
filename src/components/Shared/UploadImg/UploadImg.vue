<template>
  <!--upload img-->
  <div v-if="type === 'upload'" class="image-frame">
    <div class="image-item" v-for="(img, index) in imageList" :key="index">
      <div class="image-src" :style="{backgroundImage: `url(${img})`}"></div>
      <i class="bi bi-trash3 remove-overlay fa-3x" @click="removeImage(index)"></i>
    </div>
    <div class="add-img" v-if="imageList.length < 3">
      <label for="img">
        <i class="bi bi-plus-lg fa-2x"></i>
      </label>
      <input v-on:change="onFileChange" :disabled="propsDisabled" class="d-none" type="file" id="img" name="img"
             multiple
             accept=".jpg,.jpeg,.png"/>
    </div>
  </div>

  <!--show image-->
  <div v-else-if="type === 'preview'" class="image-frame">
    <div class="image-item" v-for="(path, index) in imgListPreview" :key="index"
         @click="openImgDialog(`${VUE_APP_STORAGE_URL}/${path}`)">
      <div class="image-src" :style="{backgroundImage: urlBackground(path)}"></div>
      <div class="img-hover-cover">
        <el-icon>
          <zoom-in/>
        </el-icon>
      </div>
    </div>
    <el-dialog v-model="imgDialog"
               width="30%"
               center
               append-to-body>
      <img class="width100" :src="imgDialogSource" alt="">
    </el-dialog>
  </div>
</template>
<script>
import {
  ZoomIn
} from '@element-plus/icons-vue'
import {computed, ref} from "vue";

export default {
  emits: ['getImgFileList'],
  props: ['imgListPreview', 'type', 'disabled'],
  components: {ZoomIn},
  setup(props, {emit}) {

    const VUE_APP_STORAGE_URL = process.env.VUE_APP_STORAGE_URL
    const propsDisabled = computed(() => {
      return props.disabled || false
    })

    const urlBackground = (path) => {
      const url = 'url(' + VUE_APP_STORAGE_URL + path.replace('(', '%28').replace(')', '%29').replace(' ', '%20') + ')'
      return url
    }

    /**
     * Upload image
     */
    const imgFileList = ref([])
    const imageList = ref([])

    const createImage = (file) => {
      let image = new Image();
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        image = e.target.result;
        imageList.value.push(image)
      };
    }

    const removeImage = (index) => {
      if (propsDisabled.value === true) return;
      imageList.value.splice(index, 1)
      imgFileList.value.splice(index, 1)
    }

    const onFileChange = (e) => {
      // đẩy dữ liệu vào array
      let files = []
      files.push(...e.target.files || e.dataTransfer.files);

      // check length dữ liệu (bs: tối đa 3 ảnh)
      if (!files.length || files.length > 3 || imageList.value.length > 3 || (files.length + imageList.value.length) > 3) return;

      // filter loại ảnh
      files = files.filter(file => {
        return file.type === "image/jpg" ||
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.size <= 8000000 // check dung lượng ảnh (bs: tối đa mỗi ảnh 8mb)
      });

      // hiển thị ảnh
      for (let i = 0; i < files.length; i++) {
        createImage(files[i])
        imgFileList.value.push(files[i])
      }

      emit('getImgFileList', imgFileList.value)
    }


    /**
     * Show image
     */
    const imgDialog = ref(false)
    const imgDialogSource = ref(null)

    const openImgDialog = async (url) => {
      imgDialog.value = true
      imgDialogSource.value = url
    }

    return {
      VUE_APP_STORAGE_URL,
      imageList,
      imgDialog,
      imgDialogSource,
      propsDisabled,
      removeImage,
      onFileChange,
      openImgDialog,
      urlBackground
    }
  }
}
</script>
<style lang="scss">
.image-frame {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  width: 100%;

  .image-item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: 1px solid #A1A5B7;
    border-radius: 4px;
    padding: 1px;
    cursor: pointer;
    height: 70px;

    &:hover {
      .remove-overlay {
        opacity: 1;
      }

      .image-src {
        opacity: 0.2;
      }

      .img-hover-cover {
        opacity: 1;

        .el-icon, svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }

    .image-src {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .img-hover-cover {
      position: absolute;
      z-index: 1;
      opacity: 0;
    }

    .remove-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: .3s ease;
      cursor: pointer;
    }
  }

  .add-img {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 75px;
    border: 1px dashed #A1A5B7;
    border-radius: 4px;
    transition: all 0.15s linear;

    i {
      cursor: pointer;
    }

    &:hover {
      border: 1px dashed rgb(64, 158, 255);

      i {
        color: rgb(64, 158, 255);
      }
    }

    label {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;

      cursor: pointer;
    }
  }

  img {
    max-width: 100%;
    transition: .3s ease;
  }
}
</style>