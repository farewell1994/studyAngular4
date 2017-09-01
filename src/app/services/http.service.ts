//Для відправки запитів сервіс отримує об'єкт Http (який повинен бути імпортований в головному модулі програми AppModule, як показано нижче).
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {JsonUsers} from '../jsonUsers';
import {Observable} from 'rxjs/Observable';
//Методи об'єкта Http після виконання запиту повертають об'єкт Observable, який визначений в бібліотеці RxJS ("Reactive Extensions").
import 'rxjs/add/operator/map';

//Оскільки сервіс приймає в конструкторі параметр через механізм dependency injection,
// то до класу застосовується декоратор @Injectable.
@Injectable()
export class HttpService{

    constructor(private http: Http){ }

    /**
     * Для виконання get-запиту у об'єкта Http викликається метод get (),
     * в який передається адреса запиту - в нашому випадку json-файл з даними.
     * @returns {Observable<Response>}
     */
    /**
     * Сам метод http.get() повертає об'єкт Observable <Response>, де об'єкт Response інкапсулює отримані дані в форматі json.
     * За допомогою методу map класу Observable можна перетворити дані з одного формату в інший.
     * У метод map передається об'єкт Response з даними відповіді, з якого формується масив об'єктів User.
     * У підсумку весь метод http.get () повертає об'єкт Observable <User []>.
     * @returns {any}
     */
    getUsers() : Observable<JsonUsers[]>{
        return this.http.get('src/app/json/test.users.json')
            .map((resp:Response)=>{
                let usersList = resp.json().data;
                let users :JsonUsers[] = [];
                for(let index in usersList){
                    let user = usersList[index];
                    users.push({name: user.userName});
                }
                return users;
            })
    }

    /**
     * звертається GET запросом до скрипта, який обчислює і виводить результат
     * @param num
     * @returns {any}
     */
    getFactorial(num: number){
        return this.http.get('http://test.loc/factorial.php?number=' + num)
            .map((resp:Response) => resp.json());
    }

    /**
     * звертається POST запросом до скрипта
     * Для відправки застосовується метод http.post (). Тільки рядок може бути відправлений в post-запиті,
     * тому перед відправкою переданий об'єкт серіалізуются в json. Крім того, за допомогою заголовків
     * {'Content-Type': 'application / json; charset = utf-8'} вказуємо, що саме об'єкт json передається в запиті.
     * @param obj
     * @returns {Promise<R>|any|Maybe<T>}
     */
    getFactorialPost(numb: number){
        //Відправка параметрів - не обов'язково серіалізувати дані в формат json перед відправкою.
        // Ми можемо також відправити дані як параметри форм з заголовком "application/x-www-form-urlencoded".
        // Для цього імпортуємо URLSearchParams та використовуємо закоментований нижче код.
        const body = JSON.stringify(numb);//закоментовуємо у випадку відправки параметрів
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        /*var params = new URLSearchParams();
        params.set('name', numb);
        return this.http.post('http://test.loc/factorialParams.php', params.toString(), { headers: headers })
        .map(res => res.json())*/
        return this.http.post('http://test.loc/factorialPOST.php', numb, { headers: headers })
            .map((resp:Response)=>resp.json());
    }
}

//скрипт ДЛЯ GET
/*
 <?php
//Незалежно від обраної технології слід враховувати обмеження на кроссдоменні запити. Зокрема, якщо наш додаток на Angular запускається в одному домені,
//а  сервер, що обробляє запити, запущений на іншому домені, то на сервері нам треба включити технологію CORS.
//У  PHP для цього можна додати заголовки в скрипт:

 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
 header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

 if (isset($_GET['number'])) {
 $num = $_GET['number'];
 $result = 1;
 for($i = 1; $i <= $num; $i ++){

 $result *= $i;
 }
 echo $result;
 } else {
 echo "введені некоректні дані";
 }
 */

/* скрипт для POST
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

$num = json_decode(file_get_contents('php://input'), true);
if (isset($num)) {
    $result = 1;
    for($i = 1; $i <= $num; $i ++){

        $result *= $i;
    }
    echo json_encode($result);
} else {
    echo "введені некоректні дані";
}
*/

/* скрипт для POST у випадку відправки параметрів
 <?php
 header('Access-Control-Allow-Origin: *');
 header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
 header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

 if (isset($_POST[numb])) {
 //код....
 echo json_encode($user);
 } else {
 echo "введені невірні дані";
 }
 */