import { AddUser, DeleteUser, EditUser, GetPage } from '../services';
import { useCallback, useState } from 'react';

export interface UserListModelProps {
  itemList: Types.UserTable[];
  loading: boolean;
  total: number;
  getUserTable: (param: any) => Promise<Types.UserTable[]>;
  addUser: (param: any) => Promise<boolean>;
  editUser: (param: any) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
}

const useUserListModel = (): UserListModelProps => {
  const [itemList, setItemList] = useState<Array<Types.UserTable>>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

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
            resolve(data);
          })
          .catch((error) => reject(error))
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

  return { itemList, loading, total, getUserTable, addUser, editUser, deleteUser };
};

export default useUserListModel;
