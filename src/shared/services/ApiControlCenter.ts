import axios from "axios";

interface cancelTokenModel {
    url: string,
    cancelToken: any
}

let cancelToken: cancelTokenModel
let cancelTokenArray: cancelTokenModel[] = []

const axiosClient = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

const token = localStorage.getItem('accessToken')
if (token) {
    axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

axiosClient.interceptors.request.use((config) => {
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

axiosClient.interceptors.response.use(
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

export default axiosClient;
