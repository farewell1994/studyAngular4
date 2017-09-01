//ViewChild - декоратор, який дає можливість звертатися до методів дочірніх компонентів
import {Component, ViewChild} from '@angular/core';
import {SecondComponent} from './second.component';

@Component({
    selector: 'parent',
    templateUrl: './views/parent.component.html',
    styleUrls: ['./styles/app.styles.css']
})
export class ParentComponent {
    /**
     * вл-ть для демонстрації двосторонньої зв*язки батьківського і дочірнього компонента
     */
    public name: string = "example: ";
    /**
     * назва кнопки у дочірньому компоненті.
     * @type {string}
     */
    public buttonName: string = "TEST EVENT";
    /**
     За допомогою застосування декоратора ViewChild до властивості counterComponent ми встановлюємо,
     що ця властивість буде містити об'єкт дочірнього компонента, який впроваджується через елемент <two><two>.
     І в цьому випадку ми вже можемо не використовувати шаблонні змінні в шаблоні.
     */
    @ViewChild(SecondComponent)
    private counterComponent: SecondComponent;
    increment() {
        this.counterComponent.increment();
    }
    /**
     За допомогою виразу (onChanged) = "onChanged ($ event)" прив'язуємо метод onChanged до події onChanged (),
     що викликається в дочірньому компоненті. Параметр $event інкапсулює всі дані, які передаються з дочірнього компонента.
     В результаті при натисканні на кнопки в дочірньому компоненті подія натискання транслюватиметься головному копоненту,
     який буде збільшувати лічильник.
     */
    public clicks: number = 0;
    onChanged(increased){
        this.clicks++
    }
}