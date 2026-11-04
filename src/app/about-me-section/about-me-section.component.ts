import { TranslatePipe } from '../i18n/translate.pipe';
import { RevealDirective } from '../reveal/reveal.directive';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me-section',
  imports: [RevealDirective, TranslatePipe],
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.scss'
})
export class AboutMeSectionComponent {

}
