//компонент керує відображенням представлення на екрані
//Для створення компонента потрібно імпортувати функцію декоратора @Component з бібліотеки @angular/core.
//Декоратор @Component дозволяє ідентифікувати клас як компонент.
//Для загрузки даних реалізується метод ngOnInit() інтерфейса OnInit, який викликається після конструктора.
// Метод ngOnInit() застосовується для комплексної ініціалізації компонента, тут можна робити загрузку даних з сервера або з іншого сховища.

import {Component, OnInit} from '@angular/core';
import {UsersService} from './services/users.service';
import {Users} from './users';

//Декоратор @Component в якості параметра приймає об*єкт з конфігурацією, яка вказує фреймворку, як працювати з компонентом і його представленням.
@Component({
    /**
     * селектор у html шаблоні для цього компонента
     */
    selector: 'home',
    /**
     * * шлях до шаблону предствлення
     * */
    templateUrl: './views/home.component.html',
    /**
     * * шлях до стилів шаблону
     * */
    styleUrls: ['./styles/app.styles.css']
    //Всі використовувані сервіси повинні бути визначені в колекції providers.
    // І після цього ми зможемо задіяти вбудований в Angular механізм dependency injection і отримати об*єкт сервіса в
    // конструкторі компонента і згодом використати по необхідності:
   
})
//клас компонента. Для того щоб клас міг використовуватись в інших модулях, він визначається з ключовим словом export.
export class HomeComponent implements OnInit {

    /**
     * Масив з юзерами
     * @type {Array}
     */
    users: Users[] = [];

    /**
     * юзер, що редагується (двосторонньо зв*язаний)
     */
    public currentUser: any;
    /**
     * властивість, що відповідає за видимість блоку з юзерами/форми редагування
     * @type {boolean}
     */
    public seeForm: boolean = false;
    /**
     * індекс юзера, що редагується
     */
    public index: number;
    /**
     * значення у формі для добавлення нового юзера. Двосторонньо зв*язане.
     * @type {string}
     */
    public fieldNewUserValue: string = '';
    /**
     * Так як сервіси HttpService був визначений в колекції провайдерів, то ми можемо отримати цей сервіс в конструкторі.
     * @param usersService
     */
    constructor(private usersService: UsersService){
    }
    ngOnInit() {
        this.users = this.usersService.getData();
    }
    /**
     * викликає метод сервіса для добавлення юзера
     * @param name
     */
    addName(name: string){
        this.usersService.addData(name);
        this.fieldNewUserValue ='';
        this.seeForm = false;
    }

    /**
     * викликає метод сервісу для видалення юзера
     * @param name
     */
    deleteName(name: any) {
        this.usersService.deleteData(name);
    }

    /**
     * викликає метод сервіса для видалення усіх юзерів
     */
    deleteAllNames() {
        this.usersService.deleteAllData();
    }

    /**
     * викликає метод сервіса для зміни значення ім*я юзера та "ховає" форму редагування
     * @param name
     */
    editName(name: any) {
        this.usersService.editData(name, this.index);
        this.seeForm = !this.seeForm;
    }

    /**
     * "ховає" блок з списком та показує форму редагування, зберігає індекс юзера, що редагується
     * @param user
     * @param i
     */
    public showForm(user: string, i: number){
        this.index = i;
        this.currentUser = user;
        this.seeForm = !this.seeForm;
    }

    /**
     *заміняє введене в форму значення
     */
    public changeNewUser() {
        if(this.fieldNewUserValue == "admin") {
            this.fieldNewUserValue = "Liar";
        }
    }
}
