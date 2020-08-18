import {useCallback,useState} from 'react';
import {GetOrfanization} from '../services/index'

const useOrganization = () => {
    const [loadOrganization,setLoadOrganization] = useState<OrganizationDto.OrganizationTable>();
    const [itemList, setItemList] = useState<Array<OrganizationDto.OrganizationTable>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const getOrganization = useCallback(
        async () => 
            await new Promise<Array<OrganizationDto.OrganizationTable>>((resolve,reject) => {
                setLoading(true);
                GetOrfanization()
                    .then((response:any) => {
                        let data:OrganizationDto.OrganizationTable[] = response.itemList;
                        setItemList(data);
                        resolve(data);
                    })
                    .catch((error) => reject(error))
                    .finally(() => setLoading(false));
            }),
        []
    );
    return {
        loading,
        itemList,
        getOrganization,
    }        

}
export default useOrganization;