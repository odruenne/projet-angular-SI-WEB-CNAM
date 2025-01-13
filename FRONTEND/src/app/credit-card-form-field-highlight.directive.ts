import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormControlStatus, NgControl, Validators } from '@angular/forms';

@Directive({
  selector: '[appFormFieldHighlight]',
  standalone: true
})
export class CreditCardFormFieldHighlightDirective implements OnInit {

  constructor(private ngControl : NgControl, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.ngControl.control?.statusChanges.subscribe( (status) => {
        this.updateFieldState(status);
    })
  }

  private updateFieldState(status: FormControlStatus): void {
    if (this.ngControl.untouched && this.ngControl.pristine) {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
    } else if (status === "INVALID") {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
    } else if (status === "VALID") {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid green');
    }
  }  
}