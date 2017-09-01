import { Component, OnInit} from '@angular/core';
import {Users} from './users';
import {HttpService} from './services/http.service';

@Component({
    selector: 'not-found',
    templateUrl: './views/json.component.html',
    styleUrls: ['./styles/app.styles.css']
})
export class JsonComponent  implements OnInit {
    /**
     * test.users.json
     */
    jsonUsers: Users[] = [];
    constructor(private httpService: HttpService) {}
    /**
     * завантаження даних в конструкторі компоненту не бажане.
     * Метод ngOnInit (), який визначений в інтерфейсі OnInit і який викликається при ініціалізації компонента
     * представляє оптимальне місце для завантаження даних.
     */
    ngOnInit(){
        //трансформація даних. оскільки ключі різні
        //Оскільки в json-файлі дані розміщені в елементі data, то в коді використовуємо вл-ть data для отримання даних:
        this.httpService.getUsers().subscribe((data)=>this.jsonUsers=data);

    }
}