import {createStore} from 'vuex'
import { config } from "vuex-module-decorators";
import ExampleModule from '@/store/ExampleModule'

config.rawError = true

const store =  createStore({
  modules: {
    ExampleModule
  }
})

export default store
