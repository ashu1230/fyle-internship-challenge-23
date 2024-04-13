import { Component, Output, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  userName: string = '';

  @Output() searchUserEvent = new EventEmitter<string>();

  searchUser() {
    this.searchUserEvent.emit(this.userName);
  }

  @HostListener('window:keydown', ['$event'])
  listenForEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchUser();
    }
  }
}
