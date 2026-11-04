import { I18nService } from '../i18n/i18n.service';
import { TranslatePipe } from '../i18n/translate.pipe';
import { Component, effect, inject, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [TranslatePipe],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnDestroy {
  private i18n = inject(I18nService);
  typedLength = 0;

  private typingTimer?: ReturnType<typeof setInterval>;

  get subtitle(): string {
    return this.i18n.t('hero.subtitle');
  }

  get typedText(): string {
    return this.subtitle.slice(0, this.typedLength);
  }

  get remainingText(): string {
    return this.subtitle.slice(this.typedLength);
  }

  get typingDone(): boolean {
    return this.typedLength === this.subtitle.length;
  }

  constructor() {
    // type the subtitle once on load and again whenever the language changes
    effect(() => {
      this.i18n.lang();
      this.startTyping();
    });
  }

  private startTyping() {
    clearInterval(this.typingTimer);
    this.typedLength = 0;
    this.typingTimer = setInterval(() => {
      this.typedLength++;
      if (this.typingDone) {
        clearInterval(this.typingTimer);
      }
    }, 150);
  }

  ngOnDestroy(): void {
    clearInterval(this.typingTimer);
  }
}
