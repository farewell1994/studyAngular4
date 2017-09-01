import { Pipe, PipeTransform } from '@angular/core';

//До кастомних pipe повинен застосовуватися декоратор Pipe. Цей декоратор визначає метадані, зокрема,
// назва pipe, за яким він буде використовуватися:
@Pipe({
    name: 'factorial'
})

export class FactorialPipe implements PipeTransform {
    /**
     * Клас реалізує метод transform () інтерфейсу PipeTransform. Цей метод в якості параметра приймає значення,
     * до якого застосовується pipe, а також опціональний набір параметрів. А на виході повертається відформатоване значення.
     * @param value
     * @param args
     * @returns {number}
     */
    transform(value: number, args?: any): number {

        if(value<=0) return 0;

        let result = 1;
        for(let i=1; i<=value; i++){
            result = result * i;
        }
        return result;
    }
}