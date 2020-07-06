import { useCallback, useState } from 'react';
import { GetDataDictionary } from '../srevices/index';

const useDataDictionaryModel = () => {
    const [itemList, setItemList] = useState<Array<DataDictionaryDto.DataDictionaryTable>>([]);
    const [loading, setLoading] = useState<boolean>(false);
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
    return {
        loading,
        itemList,
        getDataDictionary
    }
}
export default useDataDictionaryModel;