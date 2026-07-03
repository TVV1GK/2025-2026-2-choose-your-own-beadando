// Based on @jariahdev/ngx-markjs

import { Directive, ElementRef, inject, input, AfterViewChecked } from '@angular/core';
import Mark from 'mark.js';

@Directive({
  selector: '[appHighlightExp]',
  standalone: false,
})
export class HighlightExpDirective implements AfterViewChecked {

  contentElementRef = inject(ElementRef);
  
  hLexpression = input.required<string>();
  hLconfig = input<Mark.MarkOptions | undefined>(undefined);

  markInstance: Mark | null = null;

  ngAfterViewChecked() {
    if (!this.markInstance) {
      this.markInstance = new Mark(this.contentElementRef.nativeElement);
      if (!this.markInstance) {
        console.error('Mark.js instance creation failed!');
        return;
      }
    }
    this.hightlightText();
  }

  hightlightText() {    
    const markjsHighlight = this.hLexpression() || '';
    if (!markjsHighlight || markjsHighlight.length < 1) {
      this.markInstance!.unmark();
      return;
    } else {
      this.markInstance!.unmark({
        done: () => {
          this.markInstance!.mark((markjsHighlight || ''), this.hLconfig());
        }
      });
    }
  }
}
