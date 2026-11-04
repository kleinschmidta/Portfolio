import { AfterViewInit, Directive, ElementRef, HostBinding, inject, Input, OnDestroy } from '@angular/core';

// Fades an element in when it scrolls into view and out again when it leaves. The look lives in `.reveal` in src/styles.scss.
@Directive({
  selector: '[reveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  /** Direction the element slides in from; 'fade' only changes the opacity. */
  @Input() reveal: '' | 'up' | 'left' | 'right' | 'fade' = 'up';
  /** Delay in ms, to stagger neighbouring elements. */
  @Input() revealDelay = 0;

  @HostBinding('class.reveal') readonly hidden = true;
  @HostBinding('class.in') shown = false;
  @HostBinding('attr.data-reveal') get direction() { return this.reveal || 'up'; }
  @HostBinding('style.--reveal-delay') get delay() { return this.revealDelay + 'ms'; }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.shown = true;
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      this.shown = entries[entries.length - 1].isIntersecting;
    }, { rootMargin: '0px 0px -10% 0px' });
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
