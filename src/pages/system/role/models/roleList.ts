import { AddRole, DeleteRole, EditRole, GetRolePage } from '../services';
import { useCallback, useState } from 'react';

import { GetMenuTreeList } from '../../menu/services';

const treeData = [];

const useRoleListModel = () => {
  const [itemList, setItemList] = useState<Array<Types.RoleTable>>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuTree, setMenuTreeForm] = useState<Array<MenuDto.MenuTreeOutDto>>([]);
  const getRoleTable = useCallback(
    async (param: any) =>
      await new Promise<Array<Types.RoleTable>>((resolve, reject) => {
        setLoading(true);
        GetRolePage(param)
          .then((response: any) => {
            let data: Types.RoleTable[] = response.itemList;
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

  const addRole = useCallback(
    async (param: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        AddRole(param)
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  const updateRole = useCallback(
    async (param: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        EditRole(param)
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  const deleteRole = useCallback(
    async (id: string) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);

        DeleteRole({ id })
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );
  /**
   *获取角色分配权限树形
   */
  const getMenuTree = useCallback(
    async ({ payload, callback }: { payload: { roleId: any }; callback?: (result: any) => void }) =>
      await GetMenuTreeList(payload)
        .then((response: any) => {
          let treat = response.data.itemList as MenuDto.MenuTreeOutDto[];
          setMenuTreeForm(treat);
          console.log(response);
          if (callback) callback({ success: response.success, message: response.message, data: treat, selected: response.data.selected });
        })
        .catch((error) => {
          if (callback) callback({ state: false, msg: error });
          else console.log(error);
        }),
    []
  );
  return { itemList, loading, total, current, pageSize, getRoleTable, addRole, updateRole, deleteRole, menuTree, getMenuTree };
};

export default useRoleListModel;
