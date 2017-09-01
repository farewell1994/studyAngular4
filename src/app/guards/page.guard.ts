//Файл для обмеження доступу до компонента GuardComponent
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";

/**
 * Клас PageGuard реалізує інтерфейс CanActivate, а саме його метод canActivate ().
 * Цей метод отримує два параметри - об'єкти ActivatedRouteSnapshot і RouterStateSnapshot,
 * які містять інформацію про запит. ActivatedRouteSnapshot дозволяє отримати різну інформацію з запиту,
 * в тому числі параметри маршруту і рядка запиту
 */
export class PageGuard implements CanActivate{
    /**
     * введене користувачем значення
     */
    private result: string;
    /**
     * перевірка для входу на сторінку
     * @param route
     * @param state
     * @returns {boolean}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        this.result = prompt('Хто ви?', '');
        if (this.result == "user"){
            return true;
        }
        return false;
    }
}