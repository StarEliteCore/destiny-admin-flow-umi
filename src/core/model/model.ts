export enum Sex {

    Man,
    Female

}

export class SexEntry {
   Display: string;
    constructor(sex: Sex) { 
        switch (sex) { 
            case Sex.Man:
                this.Display = "男";
                break;
            case Sex.Female:
                this.Display = "女";
                break;

        }

    }
}