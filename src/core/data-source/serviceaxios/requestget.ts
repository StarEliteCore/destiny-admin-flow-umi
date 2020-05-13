import requsest from '@/utils/request.ts'


export default class ServicesGet{
    static AxiosGet(url:string,param={}){
        return new Promise((resolve, reject) =>{
            requsest.get(url,{params:param})
            .then(response=>{
                debugger
                if(response.status==200)
                {
                    // resolve(response.data)
                }
                /**
                 * 错误处理
                 */
                else{

                }
            })
            .catch(err=>{

            })
        })
    }
}