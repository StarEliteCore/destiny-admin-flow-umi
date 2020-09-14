import { AddDataDictionary, DelDataDictionary, GetDataDictionary, GetDataDictionaryLoad, UpdateDataDictionary } from '../services/index';
import { useCallback, useState } from 'react';

const useDataDictionaryModel = () => {
  const [itemList, setItemList] = useState<Array<DataDictionaryDto.DataDictionaryTable>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getDataDictionary = useCallback(
    async () =>
      await new Promise<Array<DataDictionaryDto.DataDictionaryTable>>((resolve, reject) => {
        setLoading(true);
        GetDataDictionary()
          .then((response: any) => {
            let data: DataDictionaryDto.DataDictionaryTable[] = response.itemList;
            setItemList(data);
            resolve(data);
          })
          .catch(error => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );
  const getDataDictionaryLoad = useCallback(
    async ({ payload, callback }: { payload: { id: any }; callback?: (result: any) => void }) =>
      await GetDataDictionaryLoad(payload)
        .then((response: any) => {
          let dictionaryData = response.data as DataDictionaryDto.DataOutputLoadDto;
          if (callback) callback({ state: true, msg: response.msg, data: dictionaryData });
        })
        .catch(error => {
          if (callback) callback({ state: false, msg: error });
        }),
    []
  );
  const editDataDictonary = useCallback(
    async (param: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        UpdateDataDictionary(param)
          .then(() => resolve(true))
          .catch(error => reject(error));
      }),
    []
  );
  /**
   * t添加数据字典
   */
  const addDataDictionary = useCallback(
    async (param: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        AddDataDictionary(param)
          .then(() => resolve(true))
          .catch(error => reject(error))
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
  );
  return {
    loading,
    itemList,
    getDataDictionary,
    getDataDictionaryLoad,
    addDataDictionary,
    editDataDictonary,
    delDataDictionary
  };
};
export default useDataDictionaryModel;
