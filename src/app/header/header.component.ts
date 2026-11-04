import { TranslatePipe } from '../i18n/translate.pipe';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, AfterViewInit } from '@angular/core';

type Theme = 'green' | 'blue' | 'purple';

// Section order on the page; the colour is the header border / nav underline colour while it is in view
const SECTIONS: { id: string; theme: Theme }[] = [
  { id: 'home', theme: 'green' },
  { id: 'about-me', theme: 'green' },
  { id: 'skills', theme: 'blue' },
  { id: 'portfolio', theme: 'purple' },
  { id: 'contact', theme: 'green' }
];

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslatePipe, LanguageSwitchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  menuOpen = false;
  theme: Theme = 'green';
  /** id of the nav link that is underlined, null while the hero is in view */
  active: string | null = null;

  // after a click the target is shown right away and the scroll spy waits until the smooth scroll has stopped
  private lockedTo: string | null = null;
  private idleTimer?: ReturnType<typeof setTimeout>;
  private frame = 0;

  ngAfterViewInit() {
    setTimeout(() => this.update());
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.toggleBodyScroll();
  }

  closeMenu() {
    this.menuOpen = false;
    this.toggleBodyScroll();
  }

  select(id: string) {
    this.closeMenu();
    this.show(id);
    this.lockedTo = id;
    this.releaseWhenIdle();
  }

  toggleBodyScroll() {
    if (this.menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.lockedTo) {
      this.releaseWhenIdle();
    } else if (!this.frame) {
      this.frame = requestAnimationFrame(() => {
        this.frame = 0;
        this.update();
      });
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.menuOpen && window.innerWidth > 1024) {
      this.closeMenu();
    }
    this.update();
  }

  private releaseWhenIdle() {
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      this.lockedTo = null;
      this.update();
    }, 200);
  }

  /** The current section is the last one whose top has reached the line just below the header. */
  private update() {
    const header = document.querySelector('header');
    const probe = (header?.offsetHeight ?? 0) + 10;
    let current = SECTIONS[0].id;
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= probe) current = id;
    }
    // contact is the last section and may never reach the top of the page
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      current = 'contact';
    }
    this.show(current);
  }

  private show(id: string) {
    this.active = id === 'home' ? null : id;
    this.theme = SECTIONS.find(s => s.id === id)?.theme ?? 'green';
  }

  ngOnDestroy(): void {
    clearTimeout(this.idleTimer);
    cancelAnimationFrame(this.frame);
    document.body.classList.remove('menu-open');
  }
}
