import {Users} from '../users';
//для декоратора injectable
import {Injectable} from '@angular/core';
import {LogService} from './log.service';


//Щоб вказати, що сервіс сам може використовувати інші сервіси, до класу сервіса застосовується декоратор Injectable.
// Якщо клас не буде мати цього декоратора, то вбудований механізм  DI не зможе створити об*єкт цього класу і видасть помилку.
@Injectable()
export class UsersService {

    /**
     * масив юзерів
     * @type {Array}
     */
    private data: Users[] = [];

    /**
     *
     * @param logService
     */
    constructor(private logService: LogService){}
    /**
     * повертає масив
     * @returns {Users[]}
     */
    getData(): Users[] {
        this.logService.write("отримання даних");
        return this.data;
    }

    /**
     * добавляє нового юзера.
     * @param user
     */
    addData(name: string){
        this.logService.write("додавання юзера");
        this.data.push(new Users(name));
    }

    /**
     * видаляє юзера
     * @param name
     */
    deleteData(name: Users) {
        this.logService.write("видалення юзера");
        let index = this.data.indexOf(name);
        if (index > -1) {
            this.data.splice(index, 1);
        }
    }

    /**
     * очищає масив юзерів після підтвердження
     */
    deleteAllData() {
        let result = confirm('Are you ready?');
        if (result) {
            this.logService.write("видалення юзерів");
            this.data.length = 0;
        }

    }

    /**
     * змінює дані в масиві юзерів
     * @param name
     * @param i
     */
    editData(name: Users, i: number) {
        this.logService.write("редагування юзера");
        this.data[i] = name;
    }
}