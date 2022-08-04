import ExampleService from "@/shared/services/ExampleService";
import { ref } from "vue"
import {ExampleModel} from "@/shared/model/ExampleModel";

export default function useExample() {
    const errors = ref("");

    const get = async () => {
        return new Promise<ExampleModel>(resolve => {
            ExampleService.get().then(
                (response: any) => {
                    resolve(response.data)
                },
                (err: Error) => {
                    errors.value = err.message;
                }
            );
        });
    }

    return {
        errors,
        get,
    }
}
