//HostListener дозволяє зв*язати DOM події з методами директиви
//HostBind дозволяє зв*язати звичайні властивості нашого  класу з властивістю елементу,
//для якого застосовується директива

import {Directive, ElementRef, Renderer2, HostListener} from '@angular/core';

//декоратор нашої атрибутивної директиви
@Directive({
    /**
     селектор, з яким буде асоційована директива
     */
    selector: '[test]',
    /**
     Замість застосування декораторів HostListener і HostBinding для реагування директиви на дії користувача
     ми можемо визначити обробники подій в декораторі Directive за допомогою його властивості host.
     В такому випадку просто описуємо методи

    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }*/
})
export class TestDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer2)
    {
        /**
         встановлюєм сss властивість
         */
        this.renderer.setStyle(this.elementRef.nativeElement, "font-size", "20px");
    }

    /**
     методи для зміни шрифту при наведенні миші
     */
    @HostListener("mouseenter") onMouseEnter() {
        this.setFontWeight("bold");
    }

    @HostListener("mouseleave") onMouseLeave() {
        this.setFontWeight("normal");
    }

    private setFontWeight(val) {
        this.renderer.setStyle(this.elementRef.nativeElement, "font-weight", val);
    }
}