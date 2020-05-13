import { Message } from 'view-design';



export default class Util {
    static Message: any = Message;
    static getSingleSeletedRow(selection: [], callback: any, key?: string): void {




        if (selection == null || selection == undefined || selection.length === 0) {
            this.Message.info('请选择一行数据!!');
            return;
        }

        if (selection.length > 1) {
            this.Message.info(`已选${selection.length},条选数据，请选择一条数据！！`);
            return;
        }
        let newSelection: Array<any> = selection as [];

        let obj = newSelection.filter(o => o == key)[0];
        let fun = function () {

            if (callback) {

                if (typeof (key) == "undefined" || undefined || null) {
                    key = "Id";

                }
                callback(newSelection[0][key], newSelection[0]);
            }

        };

        fun();

    }

}


