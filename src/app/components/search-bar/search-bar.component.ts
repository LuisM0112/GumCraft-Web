import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  @Output() filterTextEvent = new EventEmitter();

  inputText = "";

  sendInputText() {
    const searchText = this.inputText.toLowerCase();
  
    this.filterTextEvent.emit({ filter: searchText });
  }

}
