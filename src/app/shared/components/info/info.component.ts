// filepath: /Users/sevahun/internship/angular-fundamentals-template/src/app/shared/components/info/info.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() title!: string;
  @Input() text?: string;
}