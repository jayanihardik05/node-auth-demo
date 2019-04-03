import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEightDecimalDigitsOnly]'
})
export class EightDecimalDigitDirective {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,8}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Delete', 'Home', 'ArrowLeft', 'ArrowRight', '-'];
  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
