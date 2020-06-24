import { useCallback, useState } from 'react';

import { GetSelectFunc } from '@/services/function';

export interface FunctionModelProps {
  functions: Types.FunctionSelect[] | undefined;
  loading: boolean;
  getFunctions: () => Promise<Types.FunctionSelect[]>;
}

const useRoleModel = (): FunctionModelProps => {
  const [functions, setFuncs] = useState<Array<Types.FunctionSelect>>();
  const [loading, setLoading] = useState(false);

  const getFunctions = useCallback(
    async () =>
      await new Promise<Array<Types.FunctionSelect>>((resolve, reject) => {
        setLoading(true);
        GetSelectFunc()
          .then((response: Types.AjaxResult) => {
            let data: Types.FunctionSelect[] = response.data;
            setFuncs(data);
            resolve(data);
          })
          .catch((error) => reject(error))
          .finally(() => setLoading(false));
      }),
    []
  );

  return { functions, loading, getFunctions };
};

export default useRoleModel;
