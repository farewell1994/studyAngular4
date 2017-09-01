//input декоратор для взаємодії між компонентами.
// input для взаємодії батьківського з дочірнім, output навпаки
//eventemitter
import { Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
    selector: 'two',
    template: `
    <!--
    buttonName - ця вл-ть визначена в батьківському компоненті
    -->
    <h4>Дочірній компонент</h4>
    <button class="test" (click)="test($event)"><b>{{ buttonName }}</b></button>
    <hr>
    <button class="counter" (click)="change(true)"><b>Counter 1 ++</b></button>
    <br><br>
    <!--
    Для відстеження зміни моделі цього поля за допомогою атрибута (ngModelChange) прив'язуємо метод,
     який спрацьовує при зміні значення. Тобто ngModelChange - це фактично подія зміни введеного значення, 
     тому тут діє прив'язка до події.
    -->
    <input [ngModel]="userName" (ngModelChange)="onNameChange($event)" />
    <br>
    <p>Counter 2 (шаблонні змінні): {{ counter }}</p>
    `,
    styles: [`
        .test{
        background-color: black;
        border: 2px solid lightseagreen;
        height: 30px;
        border-radius: 5%;
        color: white;
        }
        .counter{
        background-color: black;
        border: 2px solid lightseagreen;
        height: 30px;
        border-radius: 5%;
        color: white;
        }
    `]
})
/**
 У цьому компоненті у кнопки використовується подія, що викликає метод change, передаючи йому значення true.
 Тут же в дочірньому компоненті ми можемо і обробити події. Але якщо ми повинні передавати його батьківському компоненту,
 то для цього нам треба використовувати властивість типу EventEmitter, якою тут є властивість onChanged.
 Оскільки ми будемо передавати значення типу true, то ця властивість Типізується типом boolean.
 При цьому властивість onChanged має бути вихідною, тому вона позначається за допомогою декоратора @Output.
 Фактично властивість onChanged буде являти собою подію, яка викликається в методі change() при натисканні на кнопку
 і передається головному компоненту.
 */
export class SecondComponent {
    /**
     * * лічильник кнопки Counter 1
     * * @type {number}
     * */
    public counter: number = 0;
    /**
     * вл-ть, що передається в батьківський компонент, щоб обробити там подію
     * @type {EventEmitter<boolean>}
     */
    @Output() onChanged = new EventEmitter<boolean>();
    /**
     * властивість, двосторонньо зв*язана з батьківським компонентом, та значенням input у шаблоні дочірнього елемента
     */
    /**
     * двосторонньо зв*язана вл-ть з батьківським компонентом
     */
    @Input() userName: string;
    /**
     * В методі onNameChange отримуємо введене значення і змінюємо властивість userName і генеруємо подію userNameChange, 
     * яка визначено як вихідний параметр, оскільки в цьому випадку прив*язка одностороння.
     * @type {EventEmitter<string>}
     */
    @Output() userNameChange = new EventEmitter<string>();

    /**
     * назва кнопки, визначена в батьківському компоненті TEST EVENT
     */
    @Input() public buttonName: string;

    /**
     * функція, яка вл-ті onChanged (типу EvenEmitter), яка передасться батьківському компоненту, присвоює подію сhange
     * @param increased
     */
    change(increased) {
        this.onChanged.emit(increased);
    }

    /**
     * 
     * @param model
     */
    onNameChange(model: string) {
        this.userName = model;
        this.userNameChange.emit(model);
    }

    /**
     * функція кнопки, яка була добавлена для демонстрування прив*язки вл-ті дочірнього компонента до вл-ть бат. комп.  
     * @param event
     */
    test(event: any): void {
        console.log(event);
    }

    /**
     * збільшує лічильник counter 1 
     */
    increment() { 
        this.counter++; 
    }
}