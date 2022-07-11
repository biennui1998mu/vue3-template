import {App} from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

interface cancelTokenModel {
    url: string,
    cancelToken: any
}

let cancelToken: cancelTokenModel
let cancelTokenArray: cancelTokenModel[] = []

class ApiCenter {
    public static vueInstance: App;

    public static init(app: App<Element>) {
        ApiCenter.vueInstance = app;
        ApiCenter.vueInstance.use(VueAxios, axios);
        ApiCenter.vueInstance.axios.defaults.baseURL = 'https://url.com.vn';

        axios.interceptors.request.use((config) => {
                const token = 'token';
                // config.headers["Authorization"] = "Bearer " + token

                // cancel Token if exist in Array
                if (cancelTokenArray.length > 0) {
                    const urlToken = cancelTokenArray.find((item, index) => {
                        if (item.url === config.url) {
                            cancelTokenArray.splice(index, 1)
                            return item
                        }
                    })
                    urlToken?.cancelToken.cancel()
                }

                // Create cancelToken and add to Request API
                cancelToken = {
                    url: config.url as string,
                    cancelToken: axios.CancelToken.source()
                }
                cancelTokenArray.push(cancelToken)

                return {
                    ...config,
                    cancelToken: cancelToken.cancelToken.token
                }
            },
            (error) => {
                return Promise.reject(error)
            }
        );

        axios.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                if (error.response && error.response.data) {
                    const code = error.response.status
                    const msg = error.response.data.message

                    if (code === 401) {
                        // Todo autho
                    }
                    console.log(`[Axios Error]`, error.response, code, msg)
                } else {
                    if (axios.isCancel(error)) {
                        //Todo
                    } else {
                        console.log({
                            title: 'Error when call Api',
                            text: error,
                        })
                    }
                }
                return Promise.reject(error)
            }
        )
    }

    public static setHeader(acceptData = ""): void {
        // ApiCenter.vueInstance.axios.defaults.headers.common[
        //     "Authorization"
        //     ] = `Token ${JwtService.getToken()}`;
        // if (acceptData == undefined || acceptData.length == 0) {
        //     ApiCenter.vueInstance.axios.defaults.headers.common["Accept"] =
        //         "application/json";
        // } else {
        //     ApiCenter.vueInstance.axios.defaults.headers.common["Accept"] =
        //         acceptData;
        // }
    }

    public static setContentHeader(type: any, data: any): void {
        ApiCenter.vueInstance.axios.defaults.headers.common[type] = data;
    }

    public static get(resource: any) {
        return ApiCenter.vueInstance.axios.get(`${resource}`).catch((error: any) => {
                throw new Error(`APICenter call Error: ${error}`);
            });
    }


    public static post(resource: any, params: any) {
        return ApiCenter.vueInstance.axios.post(`${resource}`, params).catch((error: any) => {
            throw new Error(`APICenter call Error: ${error}`);
        });;
    }
}

export default ApiCenter;
