import ApiControlCenter from "@/shared/services/ApiControlCenter";

const API_URL = process.env['url'];

const urlPrefix = "/subUrl";

const urls = {
    create: "/Create",
};

Object.keys(urls).map((url) => {
    // urls[url] = API_URL + urlPrefix + urls[url];
    return url;
});

class ExampleService {
    async getPages(payload: string) {
        return await ApiControlCenter.get(urls.create);
    }
    async getById(payload: string) {
        return await ApiControlCenter.post(urls.create, payload);
    }
    async createObj(payload: string) {
        return await ApiControlCenter.post(urls.create, payload);
    }
    async updateObj(payload: string) {
        return await ApiControlCenter.post(urls.create, payload);
    }
    async deleteObj(payload: string) {
        return await ApiControlCenter.post(urls.create, payload);
    }
}
export default new ExampleService();
