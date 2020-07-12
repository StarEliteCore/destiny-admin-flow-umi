import { useCallback, useState } from 'react';
import { GetDataDictionary, GetDataDictionaryLoad, AddDataDictionary, UpdateDataDictionary, DelDataDictionary } from '../srevices/index';

const useDataDictionaryModel = () => {
    const [loadDictionaryForm, setLoadDictionaryForm] = useState<DataDictionaryDto.DataOutputLoadDto>();
    const [itemList, setItemList] = useState<Array<DataDictionaryDto.DataDictionaryTable>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataDictionaryLoading, setDataDictionaryLoading] = useState<boolean>(false);
    const [dataDictionaryItemList, setDataDictionaryItemList] = useState<Array<DataDictionaryDto.DataDictionaryTable>>([]);
    const getDataDictionary = useCallback(
        async () =>
            await new Promise<Array<DataDictionaryDto.DataDictionaryTable>>((resolve, reject) => {
                debugger
                setLoading(true);
                GetDataDictionary()
                    .then((response: any) => {
                        debugger
                        let data: DataDictionaryDto.DataDictionaryTable[] = response.itemList;
                        setItemList(data);
                        resolve(data);
                    })
                    .catch((error) => reject(error))
                    .finally(() => setLoading(false));
            }),
        []
    );
    const getDataDictionaryLoad = useCallback(

        async ({ payload, callback }: { payload: { id: any }; callback?: (result: any) => void }) =>

            await GetDataDictionaryLoad(payload)
                .then((response: any) => {
                    let dictionaryData = response.data as DataDictionaryDto.DataOutputLoadDto;
                    setLoadDictionaryForm(dictionaryData);
                    if (callback) callback({ state: true, msg: response.msg, data: dictionaryData });
                })
                .catch((error) => {
                    if (callback) callback({ state: false, msg: error });
                }),
        []


    );
    const editDataDictonary = useCallback(
        async (param: any) =>
            await new Promise<boolean>((resolve, reject) => {
                debugger
                setLoading(true);
                UpdateDataDictionary(param)
                    .then(() => resolve(true))
                    .catch((error) => reject(error))
                    .finally(() => setDataDictionaryLoading(false));
            }),
        []
    )
    /**
     * t添加数据字典
     */
    const addDataDictionary = useCallback(
        async (param: any) =>
            await new Promise<boolean>((resolve, reject) => {
                setLoading(true);
                AddDataDictionary(param)
                    .then(() => resolve(true))
                    .catch((error) => reject(error))
                    .finally(() => setLoading(false));
            }),
        []
    );

    const delDataDictionary = useCallback(
        async (id: any) =>
            await new Promise<boolean>((resolve, reject) => {
                setLoading(true);
                DelDataDictionary({ id })
                    .then(() => resolve(true))
                    .catch((error: any) => reject(error))
                    .finally(() => setLoading(false));
            }),
        []
    )
    return {
        loading,
        itemList,
        getDataDictionary,
        getDataDictionaryLoad,
        addDataDictionary,
        editDataDictonary,
        delDataDictionary
    }
}
export default useDataDictionaryModel;