import { Component, OnDestroy} from '@angular/core';
//Для отримання параметрів маршруту нам необхідний спеціальний сервіс ActivatedRoute.
// Він містить інформацію про маршрут, зокрема, параметри маршруту, параметри рядка запиту та інше.
// Він впроваджується в додаток через механізм dependency injection, тому в конструкторі ми можемо отримати його.
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'par',
    template: `
               <h3 align="center">Сторінка для демонстрації передачі параметрів у строці запроса</h3><hr>
               <p>Параметр {{id}}</p>
               <p>user = {{ user }}</p>
             `
})
export class ParametrComponent implements OnDestroy {
//Метод subscribe () дозволяє встановити підписку на зміну параметра маршруту.
// В цьому випадку компонент буде отримувати нове значення, і проблем з навігацією по посиланнях з різними параметрами
// не виникне.При цьому треба враховувати, що підписка у вигляді об'єкта Subscription не видаляється
// автоматично з пам'яті при видаленні компонента. Тому в даному випадку компонент реалізує метод
// ngOnDestroy інтерфейсу OnDestroy, в якому видаляється підписка.

    /**
     * змінна для отриманого параметру id
     */
    private id: number;
    /**
     * змінна для зберігання отриманого параметру user, like GET
     */
    private user: string;


    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private route: ActivatedRoute){

        this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
        /**
         * Отримання параметрів з рядка запиту аналогічно отриманню даних з маршруту,
         * тільки в даному випадку застосовується властивість queryParams класу ActivatedRoute.
         * @type {Subscription}
         */
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.user = queryParam['user'];
            }
        );
    }
    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
        this.querySubscription.unsubscribe();
    }
}