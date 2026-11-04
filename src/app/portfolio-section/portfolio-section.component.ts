import { I18nService } from '../i18n/i18n.service';
import { TranslatePipe } from '../i18n/translate.pipe';
import { RevealDirective } from '../reveal/reveal.directive';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-portfolio-section',
  imports: [CommonModule, RevealDirective, TranslatePipe],
  templateUrl: './portfolio-section.component.html',
  styleUrl: './portfolio-section.component.scss'
})
export class PortfolioSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardsContainer', { static: false }) cardsContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren('projectItem') projectItems!: QueryList<ElementRef<HTMLElement>>;

  i18n = inject(I18nService);

  private lineObserver?: IntersectionObserver;

  selectedProject: any = null;
  showInfoModal = false;
  currentIndex = 0;
  isDragging = false;

  private touchStartX = 0;
  private touchStartY = 0;
  private touchDx = 0;
  private touchAxis: 'x' | 'y' | null = null;


  projects = [
    {
      name: 'join',
      languages: ['HTML', 'CSS', 'Firebase'],
      img: 'join',
      github: 'https://github.com/kleinschmidta/JOIN',
      live: 'https://join.akleinschmidt.net/'
    },
    {
      name: 'el pollo loco',
      languages: ['HTML', 'CSS', 'JavaScript'],
      img: 'elpolloloco',
      github: 'https://github.com/kleinschmidta/ElPolloLoco',
      live: 'https://el-pollo-loco.akleinschmidt.net/'
    },
    {
      name: 'dabubble',
      languages: ['HTML', 'CSS', 'Firebase', 'TypeScript'],
      img: 'dabubble',
      github: 'https://github.com/kleinschmidta/DABubble',
      live: 'https://dabubble.akleinschmidt.net/'
    }
  ];

  /** Texts live in the translation files (portfolio.reviews). */
  get reviews(): { text: string; author: string; role: string }[] {
    return this.i18n.tr('portfolio.reviews') ?? [];
  }

  ngAfterViewInit() {
    // Observe the (hidden-safe, full-size) item instead of its zero-width line, so the
    // detection does not depend on how a browser treats zero-area targets.
    this.lineObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelector('.line-separator')?.classList.add('animate-line');
        this.lineObserver?.unobserve(entry.target);
      });
    }, { threshold: 0.5, rootMargin: '-10% 0px' });
    this.projectItems.forEach(item => this.lineObserver?.observe(item.nativeElement));
    this.updateSlider();
  }

  ngOnDestroy() {
    this.lineObserver?.disconnect();
    document.body.style.overflow = '';
  }

  openInfoModal(project: any) {
    this.selectedProject = project;
    this.showInfoModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeInfoModal() {
    this.showInfoModal = false;
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  get totalCards(): number {
    return this.reviews.length;
  }

  scrollLeft() {
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateSlider();
  }

  scrollRight() {
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateSlider();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateSlider();
  }

  /** Distance between two card origins: card width plus the flex gap. */
  private get step(): number {
    const container = this.cardsContainer?.nativeElement;
    const card = container?.querySelector<HTMLElement>('.review-card');
    if (!container || !card) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(container).columnGap) || 0);
  }

  private updateSlider(dragOffset = 0) {
    if (this.cardsContainer) {
      const translateX = -(this.currentIndex * this.step) + dragOffset;
      this.cardsContainer.nativeElement.style.transform = `translateX(${translateX}px)`;
    }
  }

  onTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.touchDx = 0;
    this.touchAxis = null;
  }

  onTouchMove(event: TouchEvent) {
    const touch = event.touches[0];
    const dx = touch.clientX - this.touchStartX;
    const dy = touch.clientY - this.touchStartY;
    if (!this.touchAxis && Math.max(Math.abs(dx), Math.abs(dy)) > 8) {
      this.touchAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    if (this.touchAxis !== 'x') return;
    const atStart = this.currentIndex === 0 && dx > 0;
    const atEnd = this.currentIndex === this.totalCards - 1 && dx < 0;
    this.touchDx = atStart || atEnd ? dx * 0.3 : dx;
    this.isDragging = true;
    this.updateSlider(this.touchDx);
  }

  onTouchEnd() {
    if (this.touchAxis === 'x') {
      const threshold = Math.min(80, this.step * 0.2);
      if (this.touchDx < -threshold && this.currentIndex < this.totalCards - 1) this.currentIndex++;
      else if (this.touchDx > threshold && this.currentIndex > 0) this.currentIndex--;
    }
    this.isDragging = false;
    this.touchAxis = null;
    this.touchDx = 0;
    this.updateSlider();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateSlider();
    // the modal is only used above 1024px, below that the cards are shown inline
    if (this.showInfoModal && window.innerWidth <= 1024) this.closeInfoModal();
  }
}
