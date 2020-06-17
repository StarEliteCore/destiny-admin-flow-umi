import { AddRole, DeleteRole, EditRole, GetRolePage } from '../services';
import { useCallback, useState } from 'react';

import { TreeModel } from '@/typings/model';

const useRoleListModel = () => {
  const [itemList, setItemList] = useState<Array<Types.RoleTable>>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

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

  const [treeMenu, setTreeMenu] = useState<Types.TreeMenu[]>([]);
  const [menuList, setMenuList] = useState<Types.TreeMenu[]>([]);
  const getMenuTreeToList = (allNodes: Array<Types.TreeMenu>): Array<Types.TreeMenu> => {
    let nodes: Types.TreeMenu[] = [];
    let rev = (data: Array<Types.TreeMenu>) => {
      for (var i = 0, length = data.length; i < length; i++) {
        let node = data[i];
        let newNode: Types.TreeMenu = {
          id: node.id,
          parentId: node.parentId,
          name: node.name,
          children: [],
          title: node.name,
          key: node.id
        };
        nodes.push(newNode);

        if (node.children.length > 0) {
          rev(node.children);
        }
      }
      return nodes;
    };
    nodes = rev(allNodes);

    return nodes;
  };
  const getTreeSelectMenu = useCallback(
    async () =>
      await new Promise<Types.TreeMenu[]>((resolve, reject) => {
        GetTreeSelect()
          .then((response: TreeModel<Types.TreeMenu>) => {
            let data = response.itemList;
            setTreeMenu(data);
            setMenuList(getMenuTreeToList(data));
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => setLoading(false));
      }),
    []
  );

  return { itemList, loading, total, current, pageSize, getRoleTable, addRole, updateRole, deleteRole, getTreeSelectMenu, treeMenu, menuList };
};

export default useRoleListModel;
