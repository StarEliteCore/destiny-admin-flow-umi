import { AddMenu, DeleteMenu, GetLoadMenu, GetMenuFunctionList, GetPage, UpdateMenu } from '../services';
import { useCallback, useState } from 'react';

export default function useMenuModel() {
  const [loadMenuForm, setLoadMenuForm] = useState<MenuDto.MenuOutputLoadDto>();
  const [itemList, setItemList] = useState<Array<MenuDto.MenuTable>>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [menuFunctionItemList, setMenuFunctionItemList] = useState<Array<MenuDto.MenuFunctionTable>>([]);
  const [menuFunctionLoading, setMnuFunctionLoading] = useState<boolean>(false);
  const getMenuTable = useCallback(
    async () =>
      await new Promise<Array<MenuDto.MenuTable>>((resolve, reject) => {
        setLoading(true);
        GetPage()
          .then((response: any) => {
            let data: MenuDto.MenuTable[] = response.itemList;
            setItemList(data);
            resolve(data);
          })
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );
  const addMenu = useCallback(
    async (param: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        AddMenu(param)
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );
  const delMenu = useCallback(
    async (id: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        DeleteMenu({ id })
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );
  /**
   * 加载一个菜单
   */
  const getLoadMenu = useCallback(
    async (id: any) =>
      await new Promise<MenuDto.MenuOutputLoadDto>((resolve, reject) => {
        setLoading(true);
        GetLoadMenu({ id })
          .then((response: any) => {
            let menuData = response.data as MenuDto.MenuOutputLoadDto;
            setLoadMenuForm(menuData);
            resolve(menuData);
          })
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  const editMenu = useCallback(
    async (param: any) =>
      await new Promise<boolean>((resolve, reject) => {
        setLoading(true);
        UpdateMenu(param)
          .then(() => resolve(true))
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  const getMenuFunctionTable = useCallback(
    async (id: any) =>
      await new Promise<Array<MenuDto.MenuFunctionTable>>((resolve, reject) => {
        setMnuFunctionLoading(true);
        GetMenuFunctionList({ id })
          .then((response: any) => {
            let data: MenuDto.MenuFunctionTable[] = response.itemList;
            setMenuFunctionItemList(data);
            resolve(data);
          })
          .catch((error) => reject(error))
          .finally(() => setMnuFunctionLoading(false));
      }),
    []
  );
  return { itemList, loading, getMenuTable, addMenu, delMenu, editMenu, getLoadMenu, loadMenuForm, getMenuFunctionTable, menuFunctionItemList, menuFunctionLoading };
}
