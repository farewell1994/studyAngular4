import { Component} from '@angular/core';

@Component({
    selector: 'other',
    templateUrl: './views/other.component.html',
    styleUrls: ['./styles/app.styles.css']
})
export class OtherComponent {
    /**
     * в залежності від значення цієї властивості, кнопці colour прив*язується клас delete або counter
     */
    public see: boolean = true;
    
    /**
     * функція змінює значення властивості see
     */
    public toggle() {
        this.see = !this.see;
    }
}