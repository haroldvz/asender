import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform{
    /**
     * 
     * @param value
     * @param args 
     */
    transform(value: any, args: string) {//args is a query string for search
        if (!value){
            return;
        }
        if (!args){
            return value;
        }
        args = args.toLowerCase();
        return value.filter((item) =>{
            return JSON.stringify(item).toLowerCase().includes(args);
        });
    }

}