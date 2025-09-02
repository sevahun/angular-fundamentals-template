import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder = 'Search...';
  @Output() search = new EventEmitter<string>();
  term = '';

  onInput(event: Event) {
    this.term = (event.target as HTMLInputElement).value;
  }

  onSearch() {
    this.search.emit(this.term);
  }
}