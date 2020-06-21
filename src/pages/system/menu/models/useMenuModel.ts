import { AddMenu, DeleteMenu, GetPage, UpdateMenu } from '../services';
import { useCallback, useState } from 'react';

export default function useMenuModel() {
  const [itemList, setItemList] = useState<Array<MenuDto.MenuTable>>([]);

  const [loading, setLoading] = useState<boolean>(false);

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
        debugger;

        setLoading(true);
        DeleteMenu({ id })
          .then(() => resolve(true))
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
  return { itemList, loading, getMenuTable, addMenu, delMenu, editMenu };
}
