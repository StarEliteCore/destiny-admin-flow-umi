import { useCallback, useState } from 'react';

import { GetSelectRole } from '@/services/role';

export interface RoleModelProps {
  roles: Types.Role[] | undefined;
  loading: boolean;
  getRoles: () => Promise<Types.Role[]>;
}

const useRoleModel = (): RoleModelProps => {
  const [roles, setRoles] = useState<Array<Types.Role>>();
  const [loading, setLoading] = useState(false);

  const getRoles = useCallback(
    async () =>
      await new Promise<Array<Types.Role>>((resolve, reject) => {
        setLoading(true);
        GetSelectRole()
          .then((response: Types.AjaxResult) => {
            let data: Types.Role[] = response.data;
            setRoles(data);
            resolve(data);
          })
          .catch(error => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  return { roles, loading, getRoles };
};

export default useRoleModel;
