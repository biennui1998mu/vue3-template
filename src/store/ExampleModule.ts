import {Module, Action, Mutation, VuexModule} from "vuex-module-decorators";

@Module
export default class ExampleModule extends VuexModule {
    ex: any = null

    get currentExample() {
        return this.ex;
    }

    @Mutation
    setExample(a: any) {
        this.ex = a;
    }

    @Action({commit: 'setExample'})
    setCurrentExample(b: any) {
        return b
    }
}
