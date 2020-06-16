import { useCallback, useState } from 'react';

import { GetPermissionList } from '../services';

const usePermissionListModel = () => {
  const [permissionList, setList] = useState<Array<Types.PermissionTable>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getPermissionList = useCallback(
    async () =>
      await new Promise<Array<Types.PermissionTable>>((resolve, reject) => {
        setLoading(true);
        GetPermissionList()
          .then((response: any) => {
            let data: Types.PermissionTable[] = response.data;
            setList(data);

            resolve(data);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => setLoading(false));
      }),
    []
  );
  return { permissionList, loading, getPermissionList };
};
export default usePermissionListModel;
