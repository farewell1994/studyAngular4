import { Component} from '@angular/core';
//клас FormBuilder представляє альтернативний підхід до створення форм
//необхідні для реалізації форми підходом Data-Drive
import {FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {HttpService} from './services/http.service';

@Component({
    selector: 'factorial',
    templateUrl: './views/factorial.component.html',
    styleUrls: ['./styles/app.styles.css']
})
export class FactorialComponent {
    /**
     * об*єкт форми myForm (Data-Drive)
     */
    myForm: FormGroup;
    /**
     * об*єкт форми myGetForm
     */
    myGetForm: FormGroup;
    /**
     * відповідає за видимість блоку з результатом getFactorial
     * @type {boolean}
     */
    public done: boolean = false;
    /**
     * результат метода getFactorial
     */
    public factorial: number;
    /**
     * результат метода getFactorialPOST
     */
    public factorialPOST: number;

    /**
     * Так як сервіс HttpService  був визначений в колекції провайдерів, то ми можемо отримати цей сервіс в конструкторі.
     * При підході Data-Driven для форми створюється набір об'єктів FormGroup і FormControl.
     * Сама форма і її підсекції представляють клас FormGroup, а окремі елементи введення - клас FormControl.
     * @param httpService
     * @param formBuilder
     */
    constructor( private httpService: HttpService, private formBuilder: FormBuilder){
        //в якості першого параметра можна передавати значення за замовчуванням для елемента,
        //а в якості другого параметра - набір валідаторів:
        this.myForm = new FormGroup({
            "factorialPost": new FormControl("", [
                Validators.required,
                Validators.pattern("^[0-9]{0,2}")
            ])
        });
        //FormBuilder передається в якості сервісу в конструктор. За допомогою методу group () створюється об'єкт FormGroup.
        //Кожен елемент передається в форму у вигляді звичайного масиву значень
        this.myGetForm = formBuilder.group({
            "factorialGet": ["", [Validators.required, Validators.pattern("^[0-9]{0,2}")]],
        });
    }

    /**вертає факторіал num
     * @param num
     */
    getFactorial(){
        console.log();
        this.httpService.getFactorial(this.myGetForm.value['factorialGet'])
            .subscribe((data) => {this.factorial=data; this.done=true;});
    }

    /**
     *
     * @param num
     */
    getFactorialPOST(){
        this.httpService.getFactorialPost(this.myForm.value['factorialPost']).subscribe((data) => {this.factorialPOST=data; this.done=true;});
    }
}