//Щоб використовувати всі визначені в проекті компоненти, вони повинні бути вказані в головному модулі додатку.
//Для рроботи модуля йому необхідні бібліотеки, які підключаються на початку файла.
//Назва кожної бібліотеки починається з префікса @angular.

//Модуль необхідний для роботи з браузером
import { BrowserModule } from '@angular/platform-browser';
//NgModule: функціональність декоратора NgModule, без якої ми не зможемо створити модуль
import { NgModule } from '@angular/core';
//модуль, необхідний для роботы з формами html і, зокрема, з елементами input.
import { FormsModule }   from '@angular/forms';
//Для взаємодії з сервером і взагалі для роботи з протоколом http
import { HttpModule }   from '@angular/http';
// функціональність кореневого компонента приложения
import { AppComponent } from './app.component';
//інші компоненти
import { HomeComponent } from './home.component';
import { SecondComponent } from './second.component';
import { JsonComponent } from './json.component';
import { OtherComponent } from './other.component';
import { NotFoundComponent }   from './not-found.component';
import { GuardComponent }   from './guard.component';
import { ParentComponent } from './parent.component'
import { FactorialComponent } from './factorial.component';
import { ParametrComponent }   from './parametr-page.component';
//директива
import { TestDirective } from './directives/test.directive';
//для форм Data-Drive підходу
import { ReactiveFormsModule }   from '@angular/forms';
//Тут імпортуються модуль маршрутизації RouterModule і клас Routes, який представляє колекцію маршрутів:
import {Routes, RouterModule} from '@angular/router';
//guard
import { PageGuard } from './guards/page.guard';
import {ExitPageGuard} from './guards/exit.page.guard';
//pipe
import { FactorialPipe} from './pipes/factorial.pipe';
/**
 * визначим масив маршрутів. Для вказівки маршруту застосовується параметр path.
 * Метод RouterModule.forRoot () повертає модуль, який містить конфігурований сервіс Router.
 * Коли додаток завантажується, Router виконує початкову навігацію по поточному URL,
 * який стоїть в адресному рядку браузера.
 * @type {{path: string, component: AppComponent}|{path: string, component: PageComponent}|{path: string, component: NotFoundComponent}[]}
 */
const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  /**
   * Щоб обмежити доступ за маршрутом, у визначенні цього маршруту прописується параметр canActivate: [...Guard].
   * Крім того, AboutGuard повинен бути зазначений в списку провайдерів модуля:
   */
  { path: 'guard', component: GuardComponent, canActivate: [PageGuard], canDeactivate: [ExitPageGuard]},
  { path: 'other/:id', component: ParametrComponent},
  //Для переадресації вказуємо параметр redirectTo. Його значення представляє шлях переадресації.
  { path: 'admin', redirectTo: '/page'},
  { path: 'factorial', component: FactorialComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'json', component: JsonComponent },
  { path: 'other', component: OtherComponent },
  { path: '**', component: NotFoundComponent }
];

//Кожний модуль повинен визначатись з декоратором @NgModule.
//NgModule представляє функцію-декоратор, яка приймає об*єкт, властивості якого описують метаданні модуля.
@NgModule({
  //declarations: класи представлень (view classes), які належать модулю.
  // Angular має три типи класів представлень: компоненти (components), директиви (directives), канали (pipes)
  declarations: [
    HomeComponent,
    AppComponent,
    SecondComponent,
    TestDirective,
    GuardComponent,
    NotFoundComponent,
    ParametrComponent,
    FactorialPipe,
    FactorialComponent,
    ParentComponent,
    JsonComponent,
    OtherComponent
  ],
  providers: [
    PageGuard, ExitPageGuard
  ],
  //exports: набір класів представлень, які повинні використовуватись в шаблонах компонентів з інших модулів
  //imports: інші модулі, класи яких необхідні для шаблонів компонентів з поточного модуля
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    //Щоб застосувати маршрути, вони передаються в метод RouterModule.forRoot (appRoutes):
    RouterModule.forRoot(appRoutes)
  ],  
  //providers: класи, що створюють сервіси, які використовуються модулем
  //bootstrap: кореневий компонент, який викликається по дефолту підчас загрузки додатка
  //значення bootstrap: [ AppComponent ] вказує, що модуль для загрузки в якості основного компонента буде використовувати клас AppComponent.
  bootstrap: [AppComponent]
})

//Безпосередньо сам модуль представлений класом AppModule
export class AppModule { }
