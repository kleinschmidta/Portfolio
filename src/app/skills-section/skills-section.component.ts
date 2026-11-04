import { TranslatePipe } from '../i18n/translate.pipe';
import { RevealDirective } from '../reveal/reveal.directive';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills-section',
  imports: [RevealDirective, TranslatePipe],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss'
})
export class SkillsSectionComponent {

  skills = [{
    icon: "html",
    name: "HTML"
  }, {
    icon: "css",
    name: "CSS"
  }, {
    icon: "javascript",
    name: "JavaScript"
  }, {
    icon: "typescript",
    name: "TypeScript"
  }, {
    icon: "angular",
    name: "Angular"
  }, {
    icon: "firebase",
    name: "Firebase"
  }, {
    icon: "git",
    name: "Git"
  }, {
    icon: "restapi",
    name: "REST API"
  }, {
    icon: "scrum",
    name: "Scrum"
  }, {
    icon: "material",
    name: "Material Design"
  }, {
    icon: "learn",
    name: "Continually learning"
  }];


}
