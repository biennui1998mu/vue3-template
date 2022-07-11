<template>
  <transition name="dialog-fade">
    <div>
      <div class="backdrop" @click="clickBackdrop"></div>
      <div class="dialog"
           role="dialog"
           aria-labelledby="dialogTitle"
           aria-describedby="dialogDescription">
        <button type="button"
                class="btn-close"
                @click="closeDialog"
                aria-label="Close dialog">
          x
        </button>
        <header class="dialog-header"
                id="dialogTitle">
          <slot name="header"></slot>
        </header>

        <section class="dialog-body"
                 id="dialogDescription">
          <slot name="body"></slot>
        </section>

        <footer class="dialog-footer">
          <slot name="footer"></slot>
          <div class="dialog-footer-group-btn">
            <button type="button"
                    class="btn btn-secondary"
                    @click="closeDialog"
                    aria-label="Close dialog">
              Close
            </button>
            <button type="button"
                    class="btn btn-primary"
                    @click=""
                    aria-label="ok">
              Okay!
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
export default {
  name: 'Dialog',
  props: [],
  emits: [],
  setup(props: any, {emit}: any) {
    const closeDialog = () => {
      emit('close')
    }
    const clickBackdrop = () => {
      closeDialog()
    }

    return {
      closeDialog,
      clickBackdrop
    }
  }
}
</script>
<style lang="scss" scoped>
// Style backdrop
.backdrop {
  position: fixed;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

// Style dialog
.dialog {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow-x: auto;
  z-index: 1;

  // Style dialog
  padding: 1rem;
  border-radius: 4px;
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;

  .dialog-header,
  .dialog-footer {
    padding: 15px;
    display: flex;
  }

  .dialog-header {
    position: relative;
    color: #4AAE9B;
  }

  .dialog-body {
    position: relative;
    padding: 20px 10px;
  }

  .dialog-footer {
    flex-direction: column;
    justify-content: flex-end;

    .dialog-footer-group-btn {
      display: flex;
      align-content: center;
      justify-content: center;
      width: 100%;
      gap: 1rem;
    }
  }

  .btn-close {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
    z-index: 3;
  }
}

// Transition Dialog
.dialog-fade-enter,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity .5s ease;
}
</style>