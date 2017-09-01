//клас для підтвердження виходу зі сторінки, якщо є незбережені дані
import {CanDeactivate} from "@angular/router";
import {Observable} from "rxjs/Rx";

export interface ComponentCanDeactivate{
    canDeactivate: () => boolean | Observable<boolean>;
}

/**
 * ExitAboutGuard повинен реалізувати метод canDeactivate() інтерфейсу CanDeactivate.
 * Цей метод власне і керує виходом з компонента і переходом на інший компонент.
 * Для управління навігацією в цей метод передається компонент, з якого здійснюється перехід.
 * Завдяки цьому ми можемо враховувати стан компонента при переході.
 * Але переданий параметр повинен реалізувати певний інтерфейс - в даному випадку ComponentCanDeactivate.
 * Назва інтерфейсу не настільки важлива, головне, щоб він визначав метод canDeactivate (),
 * який повертає об'єкт boolean | Observable <boolean>. Якщо не можна здійснити перехід, то повертається значення false,
 * інакше повертається значення true. Це може бути просто логічне значення, або ж логічне значення, огорнуте в об'єкт Observable.
 */
export class ExitPageGuard implements CanDeactivate<ComponentCanDeactivate>{

    canDeactivate(component: ComponentCanDeactivate) : Observable<boolean> | boolean{

        return component.canDeactivate ? component.canDeactivate() : true;
    }
}