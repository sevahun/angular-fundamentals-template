import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() editable = false; // isAdmin

  @Output() show = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  onShow() {
    this.show.emit(this.id);
  }

  onEdit() {
    this.edit.emit(this.id);
  }

  onRemove() {
    this.remove.emit(this.id);
  }
}