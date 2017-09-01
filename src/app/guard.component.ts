import { Component} from '@angular/core';
import {ComponentCanDeactivate} from './guards/exit.page.guard';
import {Observable} from "rxjs/Rx";
//Angular підтримує програмну навігацію. Тобто програмним чином з будь-якого місця додатку ми можемо перейти
//до будь-якого ресурсу. Для цього застосовується сервіс Router, який передається в компоненти через механізм dependency injection
import {Router} from '@angular/router';

@Component({
    selector: 'page',
    styleUrls: ['./styles/app.styles.css'],
    templateUrl: './views/guard.component.html'
})
export class GuardComponent implements ComponentCanDeactivate {
    constructor(private router: Router){}
    saved: boolean = false;
    save() {
        this.saved = true;
    }

    canDeactivate() : boolean | Observable<boolean>{

        if (!this.saved) {
            return confirm("Покинути цю сторінку?");
        } else{
            return true;
        }
    }

    /**
     * в обробнику кнопки викликаємо його метод navigate (). У цей метод передається шлях переходу.
     */
    goHome() {
        this.router.navigate(['']);
    }
}