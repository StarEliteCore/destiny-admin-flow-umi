import { useCallback, useState } from 'react';

import { GetPage } from '../services';

export default function useMenuModel() {
  const [itemList, setItemList] = useState<Array<MenuDto.MenuTable>>([]);

  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getMenuTable = useCallback(
    async (param: any) =>
      await new Promise<Array<MenuDto.MenuTable>>((resolve, reject) => {
        setLoading(true);
        GetPage(param)
          .then((response: any) => {
            let data: MenuDto.MenuTable[] = response.itemList;
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
  return { itemList, loading, total, current, getMenuTable };
}
