import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

  projects = [
    {
      image: 'elpolloloco',
      name: 'El Pollo Loco',
      descriptionKey: 'portfolio.projects.elpollo.description',
      tech: ['JavaScript', 'HTML5', 'OOP'],
      github: 'https://github.com/Plepponium/ElPolloLoco',
      live: 'https://el-pollo-loco.akleinschmidt.net/'
    },
    {
      image: 'join',
      name: 'Join',
      descriptionKey: 'portfolio.projects.join.description',
      tech: ['JavaScript', 'CSS', 'HTML'],
      github: 'https://github.com/Plepponium/JOIN',
      live: 'https://join.akleinschmidt.net/'
    },
    {
      image: 'dabubble',
      name: 'DABubble',
      descriptionKey: 'portfolio.projects.dabubble.description',
      tech: ['HTML', 'CSS', 'Firebase', 'TypeScript'],
      github: 'https://github.com/Plepponium/DABubble',
      live: 'https://dabubble.akleinschmidt.net/'
    }
  ];

  references = [
    {
      text: 'Adrian ist eine verlässliche Person, mit der ich sehr gerne am Projekt gearbeitet habe. Auch in stressigen Phasen behält er einen kühlen Kopf und hat immer ein offenes Ohr, wenn es mal hakt. Vielen Dank für die angenehme Zusammenarbeit!',
      name: 'Andreas',
      title: 'Team Partner'
    },
    {
      text: 'Zuverlässig und fachlich interessiert. Arbeitet sich selbstständig in Themen ein. Ist aber auch bei der Teamarbeit eine Bereicherung.',
      name: 'Carla',
      title: 'Team Partner'
    }
  ]

}
