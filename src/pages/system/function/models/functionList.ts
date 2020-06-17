import { AddFunction, GetFunctionPage } from '../services';
import { useCallback, useState } from 'react';

const useFunctionListModel = () => {
  const [itemList, setItemList] = useState<Array<Types.FunctionTable>>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  const getFunctionTable = useCallback(
    async (param: any) =>
      await new Promise<Array<Types.FunctionTable>>((resolve, reject) => {
        setLoading(true);
        GetFunctionPage(param)
          .then((response: any) => {
            let data: Types.FunctionTable[] = response.itemList;
            let total: number = response.total ?? 0;
            setItemList(data);
            setTotal(total);
            setCurrent(param.pageIndex);
            setPageSize(param.pageSize);
            resolve(data);
          })
          .catch((error) => {
            setItemList([]);
            setTotal(0);
            setCurrent(1);
            setPageSize(10);
            reject(error);
          })
          .finally(() => setLoading(false));
      }),
    []
  );

  const addFunction = useCallback(
    async (param: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        AddFunction(param)
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );
  return { itemList, loading, total, current, pageSize, getFunctionTable, addFunction };
};

export default useFunctionListModel;
