import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonLoading]',
  standalone: true,
})
export class ButtonLoadingDirective {
  private originalContent: string | null = null;
  @Input() set appButtonLoading(isLoading: boolean) {
    if (isLoading) {
      if (this.originalContent === null) {
        this.originalContent = this.el.nativeElement.innerHTML;
      }
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', `<i class='pi pi-spin pi-spinner'></i>`);
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    } else {
      if (this.originalContent !== null) {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.originalContent);
      }
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }
}
