import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { AboutMeSectionComponent } from '../about-me-section/about-me-section.component';
import { SkillsSectionComponent } from '../skills-section/skills-section.component';
import { PortfolioSectionComponent } from '../portfolio-section/portfolio-section.component';
import { ContactSectionComponent } from '../contact-section/contact-section.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  imports: [HeaderComponent, HeroSectionComponent, AboutMeSectionComponent, SkillsSectionComponent, PortfolioSectionComponent, ContactSectionComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
