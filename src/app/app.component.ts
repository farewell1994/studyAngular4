import { Component } from '@angular/core';
import {UsersService} from './services/users.service';
import {LogService} from './services/log.service';
import {HttpService} from './services/http.service';

@Component({
    selector: 'app',
    styleUrls: ['./styles/app.styles.css'],
    templateUrl: './views/app.component.html',
    providers: [UsersService, LogService, HttpService]
})
export class AppComponent { }