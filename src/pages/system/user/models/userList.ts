import { AddUser, DeleteUser, EditUser, GetPage, LoadUser } from '../services';
import { useCallback, useState } from 'react';

const useUserListModel = () => {
  const [itemList, setItemList] = useState<Array<Types.UserTable>>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadUserForm, setLoadUserForm] = useState<Types.UserOutputDto>();

  const getUserTable = useCallback(
    async (param: any) =>
      await new Promise<Array<Types.UserTable>>((resolve, reject) => {
        setLoading(true);
        GetPage(param)
          .then((response: any) => {
            let data: Types.UserTable[] = response.itemList;
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

  const addUser = useCallback(
    async (param: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        AddUser(param)
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  const editUser = useCallback(
    async (param: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        EditUser(param)
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  const deleteUser = useCallback(
    async (id: string) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        DeleteUser({ id })
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  const getUserForm = useCallback(
    async ({ payload, callback }: { payload: { id: any }; callback?: (result: any) => void }) =>
      await new Promise<Types.UserOutputDto>((resolve, reject) => {
        setLoading(true);
        LoadUser(payload)
          .then((response: any) => {
            let userData = response.data as Types.UserOutputDto;
            setLoadUserForm(userData);
            if (callback) callback({ state: true, msg: response.msg, data: userData });
          })
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  return { itemList, loading, total, current, pageSize, getUserTable, addUser, editUser, deleteUser, getUserForm, loadUserForm };
};

export default useUserListModel;
