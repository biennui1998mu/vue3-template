import ExampleService from "@/components/services/ExampleService";
import { ExampleModel } from "@/components/model/ExampleModel";
import { ref } from "vue"
import { TablePaginationModel } from "@/components/model/TablePaginationModel";

export default function useTransCaIn() {
    const NumberRecordUpdate = ref(0);
    const LstRecords = ref<ExampleModel[]>([]);
    const CurrentRecord = ref<ExampleModel>();
    const tablePaginateInfo = ref<TablePaginationModel>({});
    const TotalCount = ref(0);
    const errors = ref("");
    const isLoadingQuery = ref(false);

    const getPages = async (payload) => {
        isLoadingQuery.value = true;
        return new Promise(resolve => {
            ExampleService.getPages(payload).then(
                response => {
                    LstRecords.value = response.data.Data.DataSource;
                    TotalCount.value = response.data.Data.TotalCount;
                    resolve(response.data);
                    isLoadingQuery.value = false;

                    if (response.data.Data) {
                        tablePaginateInfo.value.TotalPage = response.data.Data.TotalPages || 0;
                        tablePaginateInfo.value.TotalRecord = response.data.Data.TotalCount || 0;
                        tablePaginateInfo.value.PageSize = response.data.Data.PageSize || 0;
                        tablePaginateInfo.value.PageIndex = response.data.Data.PageIndex || 0;
                    }

                },
                err => {
                    errors.value = err.message;
                    isLoadingQuery.value = false;
                }
            );
        });
    }

    const createObj = async (payload) => {
        return new Promise(resolve => {
            ExampleService.createObj(payload).then(
                response => {
                    NumberRecordUpdate.value = response.data.Data;
                    resolve(response.data);
                },
                err => {
                    errors.value = err.message;
                }
            );
        });
    }

    const updateObj = async (payload) => {
        return new Promise(resolve => {
            ExampleService.updateObj(payload).then(
                response => {
                    NumberRecordUpdate.value = response.data.Data;
                    resolve(response.data);
                },
                err => {
                    errors.value = err.message;
                }
            );
        });
    }

    const deleteObj = async (payload) => {
        return new Promise(resolve => {
            ExampleService.deleteObj(payload).then(
                response => {
                    NumberRecordUpdate.value = response.data.Data;
                    resolve(response.data);
                },
                err => {
                    errors.value = err.message;
                }
            );
        });
    }
    
    const getById = async (payload) => {
        return new Promise(resolve => {
            ExampleService.getById(payload).then(
                response => {
                    CurrentRecord.value = response.data.Data as ExampleModel;
                    resolve(response.data);
                },
                err => {
                    errors.value = err.message;
                }
            );
        });
    }


    return {
        errors,
        LstRecords,
        getById,
        getPages,
        createObj,
        updateObj,
        deleteObj,
        CurrentRecord,
        NumberRecordUpdate,
        TotalCount,
        isLoadingQuery,
        tablePaginateInfo,
    }
}
