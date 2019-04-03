import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})
export class RandomColorDirective {
  colorArray = ['bg-maroon', 'bg-purple', 'bg-navy', 'bg-orange', 'bg-olive'];

  constructor(renderer: Renderer, el: ElementRef) {
    renderer.setElementClass(
      el.nativeElement,
      this.colorArray[Math.floor(Math.random() * 6)],
      true
    );
  }
}
